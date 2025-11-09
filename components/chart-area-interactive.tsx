"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export const description = "An interactive area chart (voice & expression)";

const rawChartData = [
	{ date: "2024-04-01", voice: 222, expression: 150 },
	{ date: "2024-04-02", voice: 97, expression: 180 },
	{ date: "2024-04-03", voice: 167, expression: 120 },
	{ date: "2024-04-04", voice: 242, expression: 260 },
	{ date: "2024-04-05", voice: 373, expression: 290 },
	{ date: "2024-04-06", voice: 301, expression: 340 },
	{ date: "2024-04-07", voice: 245, expression: 180 },
	{ date: "2024-04-08", voice: 409, expression: 320 },
	{ date: "2024-04-09", voice: 59, expression: 110 },
	{ date: "2024-04-10", voice: 261, expression: 190 },
	{ date: "2024-04-11", voice: 327, expression: 350 },
	{ date: "2024-04-12", voice: 292, expression: 210 },
	{ date: "2024-04-13", voice: 342, expression: 380 },
	{ date: "2024-04-14", voice: 137, expression: 220 },
	{ date: "2024-04-15", voice: 120, expression: 170 },
	{ date: "2024-04-16", voice: 138, expression: 190 },
	{ date: "2024-04-17", voice: 446, expression: 360 },
	{ date: "2024-04-18", voice: 364, expression: 410 },
	{ date: "2024-04-19", voice: 243, expression: 180 },
	{ date: "2024-04-20", voice: 89, expression: 150 },
	{ date: "2024-04-21", voice: 137, expression: 200 },
	{ date: "2024-04-22", voice: 224, expression: 170 },
	{ date: "2024-04-23", voice: 138, expression: 230 },
	{ date: "2024-04-24", voice: 387, expression: 290 },
	{ date: "2024-04-25", voice: 215, expression: 250 },
	{ date: "2024-04-26", voice: 75, expression: 130 },
	{ date: "2024-04-27", voice: 383, expression: 420 },
	{ date: "2024-04-28", voice: 122, expression: 180 },
	{ date: "2024-04-29", voice: 315, expression: 240 },
	{ date: "2024-04-30", voice: 454, expression: 380 },
	{ date: "2024-05-01", voice: 165, expression: 220 },
	{ date: "2024-05-02", voice: 293, expression: 310 },
	{ date: "2024-05-03", voice: 247, expression: 190 },
	{ date: "2024-05-04", voice: 385, expression: 420 },
	{ date: "2024-05-05", voice: 481, expression: 390 },
	{ date: "2024-05-06", voice: 498, expression: 520 },
	{ date: "2024-05-07", voice: 388, expression: 300 },
	{ date: "2024-05-08", voice: 149, expression: 210 },
	{ date: "2024-05-09", voice: 227, expression: 180 },
	{ date: "2024-05-10", voice: 293, expression: 330 },
	{ date: "2024-05-11", voice: 335, expression: 270 },
	{ date: "2024-05-12", voice: 197, expression: 240 },
	{ date: "2024-05-13", voice: 197, expression: 160 },
	{ date: "2024-05-14", voice: 448, expression: 490 },
	{ date: "2024-05-15", voice: 473, expression: 380 },
	{ date: "2024-05-16", voice: 338, expression: 400 },
	{ date: "2024-05-17", voice: 499, expression: 420 },
	{ date: "2024-05-18", voice: 315, expression: 350 },
	{ date: "2024-05-19", voice: 235, expression: 180 },
	{ date: "2024-05-20", voice: 177, expression: 230 },
	{ date: "2024-05-21", voice: 82, expression: 140 },
	{ date: "2024-05-22", voice: 81, expression: 120 },
	{ date: "2024-05-23", voice: 252, expression: 290 },
	{ date: "2024-05-24", voice: 294, expression: 220 },
	{ date: "2024-05-25", voice: 201, expression: 250 },
	{ date: "2024-05-26", voice: 213, expression: 170 },
	{ date: "2024-05-27", voice: 420, expression: 460 },
	{ date: "2024-05-28", voice: 233, expression: 190 },
	{ date: "2024-05-29", voice: 78, expression: 130 },
	{ date: "2024-05-30", voice: 340, expression: 280 },
	{ date: "2024-05-31", voice: 178, expression: 230 },
	{ date: "2024-06-01", voice: 178, expression: 200 },
	{ date: "2024-06-02", voice: 470, expression: 410 },
	{ date: "2024-06-03", voice: 103, expression: 160 },
	{ date: "2024-06-04", voice: 439, expression: 380 },
	{ date: "2024-06-05", voice: 88, expression: 140 },
	{ date: "2024-06-06", voice: 294, expression: 250 },
	{ date: "2024-06-07", voice: 323, expression: 370 },
	{ date: "2024-06-08", voice: 385, expression: 320 },
	{ date: "2024-06-09", voice: 438, expression: 480 },
	{ date: "2024-06-10", voice: 155, expression: 200 },
	{ date: "2024-06-11", voice: 92, expression: 150 },
	{ date: "2024-06-12", voice: 492, expression: 420 },
	{ date: "2024-06-13", voice: 81, expression: 130 },
	{ date: "2024-06-14", voice: 426, expression: 380 },
	{ date: "2024-06-15", voice: 307, expression: 350 },
	{ date: "2024-06-16", voice: 371, expression: 310 },
	{ date: "2024-06-17", voice: 475, expression: 520 },
	{ date: "2024-06-18", voice: 107, expression: 170 },
];

// Normalize values to a 0-10 range for Voice and Expression while keeping
// the original shape. We use a fixed divisor so the highest original value
// maps to roughly 10. This keeps the chart readable for the product.
const chartData = rawChartData.map((d) => ({
	date: d.date,
	voice: Math.round((d as any).voice / 52),
	expression: Math.round((d as any).expression / 52),
}));

const chartConfig = {
	visitors: {
		label: "Visitors",
	},
	voice: {
		label: "Voice",
		color: "var(--chart-1)",
	},
	expression: {
		label: "Expression",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig;

export function ChartAreaInteractive() {
	const [timeRange, setTimeRange] = React.useState("90d");

	const filteredData = chartData.filter((item) => {
		const date = new Date(item.date);
		const referenceDate = new Date("2024-06-30");
		let daysToSubtract = 90;
		if (timeRange === "30d") {
			daysToSubtract = 30;
		} else if (timeRange === "7d") {
			daysToSubtract = 7;
		}
		const startDate = new Date(referenceDate);
		startDate.setDate(startDate.getDate() - daysToSubtract);
		return date >= startDate;
	});

	return (
		<Card className="pt-0">
			<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
				<div className="grid flex-1 gap-1">
					<CardTitle>Area Chart - Interactive</CardTitle>
					<CardDescription>
						Showing total visitors for the last 3 months
					</CardDescription>
				</div>
				<Select value={timeRange} onValueChange={setTimeRange}>
					<SelectTrigger
						className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
						aria-label="Select a value"
					>
						<SelectValue placeholder="Last 3 months" />
					</SelectTrigger>
					<SelectContent className="rounded-xl">
						<SelectItem value="90d" className="rounded-lg">
							Last 3 months
						</SelectItem>
						<SelectItem value="30d" className="rounded-lg">
							Last 30 days
						</SelectItem>
						<SelectItem value="7d" className="rounded-lg">
							Last 7 days
						</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[250px] w-full"
				>
					<AreaChart data={filteredData}>
						<defs>
								<linearGradient id="fillVoice" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="var(--color-voice)" stopOpacity={0.8} />
									<stop offset="95%" stopColor="var(--color-voice)" stopOpacity={0.1} />
								</linearGradient>
								<linearGradient id="fillExpression" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="var(--color-expression)" stopOpacity={0.8} />
									<stop offset="95%" stopColor="var(--color-expression)" stopOpacity={0.1} />
								</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const date = new Date(value);
								return date.toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
								});
							}}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									labelFormatter={(value) => {
										return new Date(value).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
										});
									}}
									indicator="dot"
								/>
							}
						/>
						<Area dataKey="expression" type="natural" fill="url(#fillExpression)" stroke="var(--color-expression)" stackId="a" />
						<Area dataKey="voice" type="natural" fill="url(#fillVoice)" stroke="var(--color-voice)" stackId="a" />
						<ChartLegend content={<ChartLegendContent />} />
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
