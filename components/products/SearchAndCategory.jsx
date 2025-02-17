"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";

const SearchAndCategory = ({ setSearch, setCategory }) => {
	return (
		<div className="flex items-center justify-between gap-4 w-full">
			{/* Search Input */}
			<Input
				placeholder="Search Products"
				className="max-w-72"
				onChange={(e) => {
					setSearch(e.target.value);
				}} // Update the search term
			/>

			{/* Category Dropdown */}
			<Select
				onValueChange={(value) => {
					// Convert "all" to a value recognized by your filtering logic (e.g., null or undefined)
					setCategory(value === "all" ? "" : value);
				}}
			>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Categories" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Category</SelectLabel>
						<SelectItem value="all">All</SelectItem>{" "}
						{/* Use "all" instead of empty string */}
						<SelectItem value="capsule">Capsule</SelectItem>
						<SelectItem value="injection">Injection</SelectItem>
						<SelectItem value="syrup">Syrup</SelectItem>
						<SelectItem value="cream">Cream</SelectItem>
						<SelectItem value="tablet">Tablet</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};

export default SearchAndCategory;
