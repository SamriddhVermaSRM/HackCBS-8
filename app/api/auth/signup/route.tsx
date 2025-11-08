import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: Request) {
	try {
		const { email, password, name, role } = await req.json();

		// Validate input
		if (!email || !password || !name || !role) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		// Check if user already exists
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return NextResponse.json(
				{ error: "User already exists" },
				{ status: 400 }
			);
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create user based on role
		let user;
		if (role === "counselor") {
			user = await prisma.counselor.create({
				data: {
					email,
					password: hashedPassword,
					name,
					role,
				},
			});
		} else {
			user = await prisma.user.create({
				data: {
					email,
					password: hashedPassword,
					name,
					role,
				},
			});
		}

		// Generate JWT token
		const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
			expiresIn: "24h",
		});

		return NextResponse.json({ token, user: { ...user, password: undefined } });
	} catch (error) {
		console.error("Signup error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
