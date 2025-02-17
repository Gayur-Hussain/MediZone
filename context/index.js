"use client";

import { initialNewProductFormControlsData } from "@/utils";

const { useState, createContext } = require("react");

export const ProductContext = createContext(null);

export default function ProductState({ children }) {
	const [imageUrl, setImageUrl] = useState("");
	const [imageKey, setImageKey] = useState("");
	const [openDialog, setOpenDialog] = useState(false);
	const [currentEditedId, setCurrentEditedId] = useState(null);

	const [formData, setFormData] = useState(initialNewProductFormControlsData);

	return (
		<ProductContext.Provider
			value={{
				currentEditedId,
				setCurrentEditedId,
				imageKey,
				setImageKey,
				setImageUrl,
				imageUrl,
				openDialog,
				setOpenDialog,
				formData,
				setFormData,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
}
