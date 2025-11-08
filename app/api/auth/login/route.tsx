import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: Request) {
	try {
		const { email, password, role } = await req.json();

		// Validate input
		if (!email || !password || !role) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		// Find user based on role
		let user;
		if (role === "counselor") {
			user = await prisma.counselor.findUnique({
				where: { email },
			});
		} else {
			user = await prisma.user.findUnique({
				where: { email },
			});
		}

		if (!user) {
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 401 }
			);
		}

		// Verify password
		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword) {
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 401 }
			);
		}

		// Generate JWT token
		const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
			expiresIn: "24h",
		});

		return NextResponse.json({ token, user: { ...user, password: undefined } });
	} catch (error) {
		console.error("Login error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
