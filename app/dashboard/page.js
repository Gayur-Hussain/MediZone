import ProductBarChart from "@/components/charts/BarChart";
import { LineChartComponent } from "@/components/charts/LineChart";
import { PieChartComponent } from "@/components/charts/PieChart-Donut";
import React from "react";

const Dashboard = async () => {
	return (
		<div className="lg:ml-[240px]">
			<div className="grid lg:grid-cols-2 gap-5 mt-10 lg:mt-3 ">
				<ProductBarChart />
				<PieChartComponent />
			</div>
			<div className="mt-4">
				<LineChartComponent />
			</div>
		</div>
	);
};

export default Dashboard;
