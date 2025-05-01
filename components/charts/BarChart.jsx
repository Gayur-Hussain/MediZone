"use client";

import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { getProductStats } from "@/actions/getProductStats";

// Define color configuration for the chart
const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--chart-1))", // You can replace this with any CSS color variable
	},
	mobile: {
		label: "Mobile",
		color: "hsl(var(--chart-2))", // Same as above for mobile
	},
};

// This component is now "use client" and fetches data from the server.
export default function ProductBarChart() {
	const [data, setData] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const stats = await getProductStats(); // call server action to fetch aggregated stats
			setData(stats); // set the fetched data to state
		}

		fetchData();
	}, []); // Empty dependency array ensures it runs only once when the component is mounted

	return (
		<Card>
			<CardHeader>
				<CardTitle>Top Selling Products</CardTitle>
				<CardDescription>Aggregated Sales Data</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart width={600} height={300} data={data}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="product"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
						/>
						<YAxis />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="dashed" />}
						/>
						{/* Apply color from chartConfig to the bars */}
						<Bar
							dataKey="quantity"
							fill={chartConfig.desktop.color}
							radius={4}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
