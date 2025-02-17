"use client";

import ProductState from "@/context";

export default function CommonLayout({ children }) {
	return <ProductState>{children}</ProductState>;
}
