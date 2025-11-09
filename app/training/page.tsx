"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Module = {
	module_id: string;
	name: string;
	description: string;
};

export default function TrainingPage() {
	const router = useRouter();
	const [modules, setModules] = useState<Module[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchData = async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await axios.get<Module[]>("/api/module");
			// defensive: ensure we get an array
			console.log(res.data);

			if (Array.isArray(res.data)) setModules(res.data);
			else setModules([]);
		} catch (err) {
			console.error("Failed to load modules", err);
			setError("Failed to load modules. Please try again later.");
			setModules([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		window.cookieStore.get("jwt").then((cookie) => {
			if (cookie === null) {
				router.replace("/");
			}
		});
		fetchData();
	}, []);
	return (
		<>
			<main className="min-h-screen flex items-start justify-center py-12 px-4">
				<section className="w-full max-w-5xl px-2 md:px-0">
					<header className="mb-10">
						<h1 className="text-2xl md:text-3xl font-bold">Training Modules</h1>
						<p className="text-sm mt-1">
							Short lessons to help build social and emotional skills.
						</p>
					</header>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{loading ? (
							// simple loading placeholders (match card proportions)
							Array.from({ length: 4 }).map((_, i) => (
								<div
									key={i}
									className="animate-pulse bg-card border border-border rounded-lg p-4 h-44 md:h-48"
								/>
							))
						) : error ? (
							<div className="col-span-1 md:col-span-2 p-4 bg-destructive/10 text-destructive rounded">
								{error}
							</div>
						) : modules.length === 0 ? (
							<div className="col-span-1 md:col-span-2 p-6 text-muted">
								No modules available.
							</div>
						) : (
							modules.map((module, idx) => (
								<article
									key={module.module_id}
									className="bg-card text-card-foreground border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow transform-gpu hover:scale-[1.01] flex flex-col h-full"
									aria-labelledby={`${module.module_id}-title`}
								>
									{/* Image - responsive heights for breakpoints, cover & fallback */}
									<img
										src={`/images/script${idx}.png`}
										alt={module.name}
										className="w-full h-40 md:h-48 lg:h-56 object-cover"
										onError={(e: any) =>
											(e.currentTarget.src = "/images/placeholder.png")
										}
									/>
									{/* Content */}
									<div className="p-4 flex-1 flex flex-col gap-3">
										<div className="flex items-start justify-between">
											<h2
												id={`${module.module_id}-title`}
												className="font-semibold text-lg mb-2"
											>
												{module.name}
											</h2>
											<span className="text-xs text-muted ml-3">
												{module.module_id}
											</span>
										</div>
										<p className="text-sm leading-relaxed flex-1 mt-1">
											{module.description}
										</p>
										<div className="mt-4">
											<button
												onClick={() =>
													router.push(
														`/training/${encodeURIComponent(module.module_id)}`
													)
												}
												className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
												aria-label={`Start ${module.name}`}
											>
												Start
											</button>
										</div>
									</div>
								</article>
							))
						)}
					</div>
				</section>
			</main>
		</>
	);
}
