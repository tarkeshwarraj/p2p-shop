"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";

export default function BuyProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchasedProducts = async () => {
      try {
        const res = await axios.get("/api/products/purchased", {
          withCredentials: true, // send token cookie
        });
        console.log(res.data);
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching purchased products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedProducts();
  }, []);

  if (loading) {
    return (
      <p className="text-center py-6">Loading your purchased products...</p>
    );
  }

  // if (products.length === 0) {
  //   return;
  // }

  return (
      <div className="min-h-[calc(100vh-300px)] flex justify-center p-4 md:p-10">
        <div className="space-y-4 w-full max-w-4xl">
          <h2 className="text-lg font-semibold text-gray-700 text-center">
            My Purchased Products
          </h2>

          {products.length === 0 ? (
            <p className="text-gray-500 text-center">
              You haven’t purchased any products yet.
            </p>
          ) : (
            products.map((product) => (
              <ProductCard key={product._id} product={product.productId} />
            ))
          )}
        </div>
      </div>
  );
}
