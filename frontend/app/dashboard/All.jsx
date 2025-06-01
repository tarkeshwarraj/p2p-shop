// app/dashboard/All.jsx
"use client";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import ProductCard from "@/components/ProductCard";

const boxIcon =
  "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

export default function All() {
  const { axios, product, setProduct } = useAppContext();

  return (
    <div className="min-h-[calc(100vh-300px)] flex justify-center p-4 md:p-10">
      <div className="space-y-4 w-full max-w-4xl">
        <h2 className="text-lg font-semibold text-gray-700 text-center">
          All Products
        </h2>

        {product.length === 0 ? (
          <p className="text-gray-500 text-center">No products found.</p>
        ) : (
          product.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
