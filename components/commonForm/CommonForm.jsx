"use client";

import { UploadButton } from "@/utils/uploadthing";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "motion/react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { useContext, useState } from "react";
import Image from "next/image";
import { removeImageAction } from "@/actions/imageRemove";
import { createNewProductAction, updateProductAction } from "@/actions/admin";
import { initialNewProductFormControlsData } from "@/utils";
import { ProductContext } from "@/context";

const CommonForm = ({
	refetchProducts,
	imageKey,
	setImageKey,
	setImageUrl,
	imageUrl,
	btnText,
	setOpenDialog,
	isBtnDisabled,
	btnType,
	formControls,
	formData,
	setFormData,
}) => {
	const { currentEditedId, setCurrentEditedId } = useContext(ProductContext);
	const { toast } = useToast();

	const [isRemoveLoading, setIsRemoveLoading] = useState(false);
	const [isSubmitLoading, setIsSubmitLoading] = useState(false);

	//Function for image delete from the uploadthing
	async function deleteImage() {
		setIsRemoveLoading(true);
		const res = await removeImageAction(imageKey);
		if (!res.success)
			toast({
				title: "Error during image delete!",
				variant: "destructive",
			});
		setImageUrl("");
		setImageKey("");
		setFormData({
			...formData,
			imageKey: "",
			imageUrl: "",
		});
		setIsRemoveLoading(false);
		toast({
			title: "Image Deleted Successfully!",
		});
	}

	//Handel form submission

	async function handleSubmitForm(e) {
		e.preventDefault();
		setIsSubmitLoading(true);

		if (currentEditedId !== null) {
			const res = await updateProductAction(
				currentEditedId,
				formData,
				"/dashboard/products"
			);
			if (!res.success) {
				toast({
					title: res.message,
					variant: "destructive",
				});
				setIsSubmitLoading(false);
				return;
			}

			toast({ title: res.message });
		} else {
			const res = await createNewProductAction(
				formData,
				"/dashboard/products"
			);
			if (!res.success) {
				toast({
					title: res.message,
					variant: "destructive",
				});
				setIsSubmitLoading(false);
				return;
			}

			toast({ title: res.message });
		}

		// Reset form and refresh the product list
		setFormData(initialNewProductFormControlsData);
		setImageKey("");
		setImageUrl("");
		setOpenDialog(false);
		setIsSubmitLoading(false);
		setCurrentEditedId(null);

		refetchProducts(); // Refresh to update the product list
	}

	// Function to render inputs based on component type
	function renderInputByComponentType(getCurrentControl) {
		let content = null;

		switch (getCurrentControl.componentType) {
			case "input":
				content = (
					<div key={getCurrentControl.name}>
						<Label>{getCurrentControl.label}</Label>
						<Input
							type="text"
							disabled={getCurrentControl.disabled}
							placeholder={getCurrentControl.placeholder}
							name={getCurrentControl.name}
							id={getCurrentControl.name}
							value={formData[getCurrentControl.name] || ""}
							onChange={(event) =>
								setFormData({
									...formData,
									[event.target.name]: event.target.value,
								})
							}
						/>
					</div>
				);
				break;

			case "number":
				content = (
					<div key={getCurrentControl.name}>
						<Label>{getCurrentControl.label}</Label>
						<Input
							type="number"
							disabled={getCurrentControl.disabled}
							placeholder={getCurrentControl.placeholder}
							name={getCurrentControl.name}
							id={getCurrentControl.name}
							value={formData[getCurrentControl.name] || ""}
							onChange={(event) =>
								setFormData({
									...formData,
									[event.target.name]: event.target.value,
								})
							}
						/>
					</div>
				);
				break;

			case "file":
				content = (
					<div key={getCurrentControl.name} className="lg:col-span-2">
						<Label
							key={getCurrentControl.name}
							htmlFor={getCurrentControl.name}
						>
							{getCurrentControl.label}
						</Label>
						{imageUrl ? (
							<div className="">
								<Image
									src={imageUrl}
									alt="Image Uploaded"
									height={200}
									width={200}
									className="object-fit lg:h-52 w-auto h-52"
								/>
								<Button
									type="button"
									className="mt-2"
									onClick={() => deleteImage()}
								>
									{isRemoveLoading ? (
										<motion.ul
											animate={{ rotate: 360 }}
											transition={{
												repeat: Infinity,
												duration: 1.5,
												ease: "linear",
											}}
											className="w-5 h-5 border-4 border-dashed rounded-full "
										></motion.ul>
									) : (
										"Remove Image"
									)}
								</Button>
							</div>
						) : (
							<div className=" border-rose-600 border rounded-lg p-2">
								<UploadButton
									endpoint="imageUploader"
									onClientUploadComplete={(res) => {
										if (res && res.length > 0) {
											// Assuming res[0].fileUrl contains the uploaded image URL
											const uploadedImage = res[0];

											// Update formData with the uploaded image URL
											setFormData({
												...formData,
												imageKey: uploadedImage.key,
												imageUrl: uploadedImage.ufsUrl,
											});

											setImageUrl(res[0].ufsUrl);
											setImageKey(res[0].key);

											toast({
												title: "Image Uploaded Successfully!",
											});
										}
									}}
									onUploadError={(error) => {
										toast({
											title: `ERROR! ${error.message}`,
											variant: "destructive",
										});
									}}
								/>
							</div>
						)}
					</div>
				);
				break;

			case "select":
				content = (
					<div key={getCurrentControl.name}>
						<Label>{getCurrentControl.label}</Label>
						<Select
							onValueChange={(value) =>
								setFormData({
									...formData,
									[getCurrentControl.name]: value,
								})
							}
							value={formData[getCurrentControl.name] || ""}
						>
							<SelectTrigger>
								<SelectValue
									placeholder={getCurrentControl.placeholder}
								/>
							</SelectTrigger>
							<SelectContent>
								{getCurrentControl.options.map(
									(option, index) => (
										<SelectItem key={index} value={option}>
											{option}
										</SelectItem>
									)
								)}
							</SelectContent>
						</Select>
					</div>
				);
				break;

			default:
				content = (
					<div key={getCurrentControl.name}>
						<Input
							type="text"
							disabled={getCurrentControl.disabled}
							placeholder={getCurrentControl.placeholder}
							name={getCurrentControl.name}
							id={getCurrentControl.name}
							value={formData[getCurrentControl.name] || ""}
							onChange={(event) =>
								setFormData({
									...formData,
									[event.target.name]: event.target.value,
								})
							}
						/>
					</div>
				);
				break;
		}
		return content;
	}

	return (
		<form
			className="grid md:grid-cols-2  gap-5"
			onSubmit={(e) => handleSubmitForm(e)}
		>
			{formControls.map((control) => renderInputByComponentType(control))}

			<div className="mt-6">
				<Button type={btnType || "submit"} disabled={isBtnDisabled}>
					{isSubmitLoading ? (
						<motion.ul
							animate={{ rotate: 360 }}
							transition={{
								repeat: Infinity,
								duration: 1.5,
								ease: "linear",
							}}
							className="w-5 h-5 border-4 border-dashed rounded-full "
						></motion.ul>
					) : (
						btnText
					)}
				</Button>
			</div>
		</form>
	);
};

export default CommonForm;
