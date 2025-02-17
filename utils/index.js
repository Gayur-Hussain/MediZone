export const addNewProductFormControls = [
	{
		label: "Image",
		name: "imageUrl",
		componentType: "file",
	},
	{
		label: "Name",
		name: "name",
		placeholder: "Enter product name",
		componentType: "input",
	},
	{
		label: "Description",
		name: "description",
		placeholder: "Enter product description",
		componentType: "input",
	},
	{
		label: "Price",
		name: "price",
		placeholder: "price",
		componentType: "number",
	},
	{
		label: "Stock",
		name: "stock",
		placeholder: "Stock",
		componentType: "number",
	},

	{
		label: "Category",
		name: "category",
		placeholder: "Categories",
		componentType: "select",
		options: ["Injection", "Syrup", "Tablet", "Cream", "Capsule"],
	},
	{
		label: "Company Name",
		name: "companyName",
		placeholder: "Enter company name",
		componentType: "input",
	},
];

export const initialNewProductFormControlsData = {
	imageUrl: "",
	name: "",
	description: "",
	price: "",
	stock: "",
	category: "",
	companyName: "",
};
