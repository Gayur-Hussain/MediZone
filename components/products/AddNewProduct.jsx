"use client";

import { Button } from "../ui/button";
import React, { useContext, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import CommonForm from "../commonForm/CommonForm";
import {
	addNewProductFormControls,
	initialNewProductFormControlsData,
} from "@/utils";
import { ProductContext } from "@/context";

const AddNewProduct = ({ refetchProducts }) => {
	const {
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
	} = useContext(ProductContext);
	// Validate form before submission
	function checkBtnValid() {
		return Object.keys(formData).every((key) => {
			const value = formData[key];
			if (typeof value === "string") {
				return value.trim() !== ""; // For strings, check if they are not empty
			} else if (typeof value === "number") {
				return !isNaN(value) && value > 0; // For numbers, check if they are valid and greater than 0
			}
			return false; // For other types, return false
		});
	}

	console.log(formData);

	return (
		<Dialog
			open={openDialog}
			onOpenChange={(isOpen) => {
				setOpenDialog(isOpen);
				if (!isOpen) {
					setFormData({
						...initialNewProductFormControlsData,
						name: "",
						description: "",
						price: "",
						stock: "",
						category: "",
						companyName: "",
						imageUrl: "",
						imageKey: "",
					});
					setImageUrl("");
					setImageKey("");
					setCurrentEditedId(null);
				}
			}}
		>
			<DialogTrigger asChild>
				<Button onClick={() => setOpenDialog(true)}>Add New</Button>
			</DialogTrigger>

			<DialogContent className="sm:min-w-[70%] sm:min-h-[70%] overflow-y-scroll lg:overflow-y-hidden w-full h-full sm:h-auto sm:w-auto">
				<DialogHeader>
					<DialogTitle>
						{currentEditedId !== null
							? "Edit Product Details"
							: "Add New Product"}
					</DialogTitle>
				</DialogHeader>
				<CommonForm
					formData={formData}
					setFormData={setFormData}
					formControls={addNewProductFormControls}
					isBtnDisabled={!checkBtnValid()}
					setOpenDialog={setOpenDialog}
					btnText={currentEditedId !== null ? "Update" : "Add"}
					imageKey={imageKey}
					setImageKey={setImageKey}
					imageUrl={imageUrl}
					setImageUrl={setImageUrl}
					refetchProducts={refetchProducts}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default AddNewProduct;
