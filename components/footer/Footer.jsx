"use client";
import React from "react";
import { Card, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter } from "lucide-react";

const Footer = () => {
	return (
		<footer className="border-2 rounded-lg py-16 px-6 sm:px-16">
			<div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
				{/* Column 1: About Us */}
				<div>
					<Card className="p-6 rounded-lg shadow-lg">
						<CardHeader>
							<CardTitle className="text-2xl font-bold">
								About Us
							</CardTitle>
						</CardHeader>
						<CardFooter>
							<p className="text-sm">
								We are a company committed to providing
								high-quality products with exceptional customer
								service.
							</p>
						</CardFooter>
					</Card>
				</div>

				{/* Column 2: Services */}
				<div>
					<Card className=" p-6 rounded-lg shadow-lg">
						<CardHeader>
							<CardTitle className="text-2xl font-bold">
								Services
							</CardTitle>
						</CardHeader>
						<CardFooter>
							<ul className="space-y-2">
								<li>
									<p className="text-sm">Product Delivery</p>
								</li>
								<li>
									<p className="text-sm">Customer Support</p>
								</li>
								<li>
									<p className="text-sm">Consultation</p>
								</li>
							</ul>
						</CardFooter>
					</Card>
				</div>

				{/* Column 3: Social Media */}
				<div>
					<Card className="p-6 rounded-lg shadow-lg">
						<CardHeader>
							<CardTitle className="text-2xl font-bold">
								Follow Us
							</CardTitle>
						</CardHeader>
						<CardFooter>
							<div className="flex space-x-6">
								<Button
									variant="link"
									size="icon"
									href="https://twitter.com"
									target="_blank"
								>
									<Twitter className="w-6 h-6" />
								</Button>
								<Button
									variant="link"
									size="icon"
									href="https://linkedin.com"
									target="_blank"
								>
									<Linkedin className="w-6 h-6" />
								</Button>
							</div>
						</CardFooter>
					</Card>
				</div>
			</div>

			{/* Bottom Section */}
			<div className="mt-16 text-center text-sm ">
				<p>
					&copy; {new Date().getFullYear()} Medi-Zone. All rights
					reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
