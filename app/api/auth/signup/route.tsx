import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import Counselor from "@/models/counselor";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: Request) {
	try {
		await connectDB();
		const { email, password, name, role } = await req.json();

		// Validate input
		if (!email || !password || !name || !role) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		// Check if user already exists
		const Model = role === "counselor" ? Counselor : User;
		const existingUser = await Model.findOne({ email });

		if (existingUser) {
			return NextResponse.json(
				{ error: "User already exists" },
				{ status: 400 }
			);
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create user
		const user = await Model.create({
			email,
			password: hashedPassword,
			name,
			role,
		});

		// Generate JWT token
		const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
			expiresIn: "24h",
		});

		return NextResponse.json({
			token,
			user: {
				id: user._id,
				email: user.email,
				name: user.name,
				role: user.role,
			},
		});
	} catch (error) {
		console.error("Signup error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
