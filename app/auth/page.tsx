"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

export default function AuthPage() {
	const router = useRouter();
	const [isLogin, setIsLogin] = useState(true);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		name: "",
		role: "user",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
			const response = await fetch(endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data?.error || data?.message || "An error occurred");
			}

			// Store token in localStorage
			window.cookieStore.set("jwt", data.token);
			// localStorage.setItem("token", data.token);
			localStorage.setItem("user", JSON.stringify(data.user));

			// Redirect based on role
			if (data.user?.role === "counselor") {
				router.push("/dashboard");
			} else {
				router.push("/training");
			}
		} catch (err: any) {
			setError(err?.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
		toast("Signed up successfully");
	};

	return (
		<>
			<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
					<div>
						<h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
							{isLogin ? "Sign in to your account" : "Create a new account"}
						</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							{isLogin
								? "Access your learning journey"
								: "Start your emotional wellness journey"}
						</p>
					</div>
					<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
						<div className="space-y-4">
							{!isLogin && (
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Full Name
									</label>
									<input
										id="name"
										name="name"
										type="text"
										required
										className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
										placeholder="John Doe"
										value={formData.name}
										onChange={(e) =>
											setFormData({ ...formData, name: e.target.value })
										}
										disabled={loading}
									/>
								</div>
							)}
							<div>
								<label
									htmlFor="email-address"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Email Address
								</label>
								<input
									id="email-address"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									placeholder="you@example.com"
									value={formData.email}
									onChange={(e) =>
										setFormData({ ...formData, email: e.target.value })
									}
									disabled={loading}
								/>
							</div>
							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Password
								</label>
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									placeholder="••••••••"
									value={formData.password}
									onChange={(e) =>
										setFormData({ ...formData, password: e.target.value })
									}
									disabled={loading}
								/>
							</div>
						</div>

						{!isLogin && (
							<div>
								<label
									htmlFor="role"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Role
								</label>
								<select
									id="role"
									className="block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									value={formData.role}
									onChange={(e) =>
										setFormData({ ...formData, role: e.target.value })
									}
									disabled={loading}
								>
									<option value="user">User (Student)</option>
									<option value="counselor">Counselor</option>
								</select>
							</div>
						)}

						{error && (
							<div
								className="rounded-md bg-red-50 p-4 border border-red-200"
								role="alert"
							>
								<p className="text-sm font-medium text-red-800">{error}</p>
							</div>
						)}

						<div>
							<Button
								type="submit"
								disabled={loading}
								className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
									loading
										? "bg-indigo-400 cursor-not-allowed"
										: "bg-indigo-600 hover:bg-indigo-700"
								} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors`}
							>
								{loading ? (
									<span className="inline-flex items-center gap-2">
										<svg
											className="h-4 w-4 animate-spin text-white"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
											></path>
										</svg>
										<span>
											{isLogin ? "Signing in..." : "Creating account..."}
										</span>
									</span>
								) : isLogin ? (
									"Sign in"
								) : (
									"Sign up"
								)}
							</Button>
						</div>
					</form>

					<div className="text-center">
						<p className="text-sm text-gray-600">
							{isLogin
								? "Don't have an account? "
								: "Already have an account? "}
							<button
								type="button"
								className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
								onClick={() => setIsLogin(!isLogin)}
							>
								{isLogin ? "Sign up" : "Sign in"}
							</button>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
