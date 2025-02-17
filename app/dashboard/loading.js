import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
	return (
		<div className="h-screen w-full">
			<Skeleton />
		</div>
	);
};

export default Loading;
