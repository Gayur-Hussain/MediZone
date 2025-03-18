import Image from "next/image";
import React from "react";

const Hero = () => {
	return (
		<div className="flex flex-col mt-24 sm:mt-0 lg:flex-row md:w-full lg:min-h-screen gap-10 items-center justify-between">
			{/* Left Content */}
			<div className="text-center md:text-left md:mt-24 lg:mt-0">
				<h1 className="text-3xl md:text-3xl lg:text-5xl font-extrabold leading-tight lg:max-w-[80%]">
					Your Trusted Source for Quality Medicines in{" "}
					<span className="text-primary">Bilaspur</span>
				</h1>
				<h2 className="mt-4 text-lg md:text-xl">
					Order High-Quality Medicines at Competitive Prices
				</h2>
				<p className="mt-2 text-sm md:text-base ">
					Experience Fast Delivery and Exceptional Customer Service
					for All Your Pharmaceutical Needs.
				</p>
			</div>

			{/* Right Image */}
			<div className="w-full flex justify-center md:justify-end">
				<Image
					src={"/Medi-Zone-Hero.svg"}
					width={400}
					height={500}
					alt="Medi-Zone"
					className="max-w-full h-auto md:max-w-[400px] lg:max-w-[500px]"
					priority
				/>
			</div>
		</div>
	);
};

export default Hero;
