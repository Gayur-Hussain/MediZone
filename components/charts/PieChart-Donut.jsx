"use client";

import * as React from "react";

import { Pie, PieChart, Label } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChartSkeleton } from "./skeletons/PieChartSkeleton";

const chartConfig = {
	visitors: { label: "Visitors" },
	chrome: { label: "Chrome", color: "hsl(var(--chart-1))" },
	safari: { label: "Safari", color: "hsl(var(--chart-2))" },
	firefox: { label: "Firefox", color: "hsl(var(--chart-3))" },
	edge: { label: "Edge", color: "hsl(var(--chart-4))" },
	other: { label: "Other", color: "hsl(var(--chart-5))" },
};

export function PieChartComponent() {
	const [chartData, setChartData] = React.useState([]);

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch("/api/analytics/products/top-selling");
				const data = await res.json();

				const colors = [
					"var(--color-chrome)",
					"var(--color-safari)",
					"var(--color-firefox)",
					"var(--color-edge)",
					"var(--color-other)",
				];

				const formatted = data.map((item, index) => ({
					browser: item.name,
					visitors: item.totalSold,
					fill: colors[index % colors.length],
				}));

				setChartData(formatted);
			} catch (err) {
				console.error("Failed to fetch chart data:", err);
			}
		};

		fetchData();
	}, []);

	const totalVisitors = React.useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
	}, [chartData]);

	if (chartData.length === 0) return <PieChartSkeleton />;

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Top Selling Products</CardTitle>
				<CardDescription>Five products</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px]"
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>

						<Pie
							data={chartData}
							dataKey="visitors"
							nameKey="browser"
							innerRadius={60}
							strokeWidth={5}
						>
							<Label
								content={({ viewBox }) => {
									if (
										viewBox &&
										"cx" in viewBox &&
										"cy" in viewBox
									) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle"
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-foreground text-3xl font-bold"
												>
													{totalVisitors.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className="fill-muted-foreground"
												>
													Products Sold
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
