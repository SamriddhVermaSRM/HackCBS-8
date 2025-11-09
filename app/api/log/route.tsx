import connectDB from '@/lib/mongodb';
import LessonLog from '@/models/lesson_logs';
import User from '@/models/user';
import modulesData from '@/data/modules.json';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		await connectDB();

		// fetch only user from logs to minimize payload (schema uses `user` field)
		const logs = await LessonLog.find().select('user').lean();
		const uniqueUserIds = Array.from(
			new Set(logs.map((l) => l.user?.toString()).filter(Boolean))
		);

		if (uniqueUserIds.length === 0) {
			return NextResponse.json([]);
		}

		// Use $in to fetch only users present in logs. Mongoose will cast string ids to ObjectId.
		const users = await User.find({ _id: { $in: uniqueUserIds } }).select(
			'-password -__v'
		);
		return NextResponse.json(users);
	} catch (err) {
		console.error('/api/log GET error:', err);
		return NextResponse.json(
			{ error: 'Unable to fetch users' },
			{ status: 500 }
		);
	}
}

export async function POST(req: NextRequest) {
	try {
		await connectDB();

		const body = await req.json();
		const userId = body?.userId || body?.user || body?.id;

		if (!userId) {
			return NextResponse.json(
				{ error: 'userId is required in request body' },
				{ status: 400 }
			);
		}

		// fetch logs for the given user (schema field is `user`)
		const logs = await LessonLog.find({ user: userId })
			.select('user module_id lesson_id timestamp answerTime emotion')
			.lean()
			.sort({ timestamp: 1 });

		// group logs by module_id
		const grouped: Record<string, any[]> = {};
		for (const l of logs) {
			const mid = l.module_id || 'unknown';
			if (!grouped[mid]) grouped[mid] = [];
			grouped[mid].push(l);
		}

		// build response array with optional module metadata
			const response = Object.entries(grouped).map(([moduleId, logsArr]) => ({
				moduleId,
				module: (modulesData as any)[moduleId] || null,
				logs: logsArr,
			}));

		return NextResponse.json(response);
	} catch (err) {
		console.error('/api/log POST error:', err);
		return NextResponse.json({ error: 'Unable to fetch logs' }, { status: 500 });
	}
}
