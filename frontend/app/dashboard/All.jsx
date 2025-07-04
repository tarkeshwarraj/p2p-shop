"use client";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/navigation";
import axios from '@/lib/axios';

export default function All() {
  const { user, token } = useAppContext(); // ✅ token add किया गया
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const res = await axios.get(`/api/products/user`, {
          headers: {
            Authorization: `Bearer ${token}` // ✅ token header में भेजा गया
          }
        });
        setMyProducts(res.data);
      } catch (err) {
        console.error("Error fetching user products", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id && token) {
      fetchUserProducts();
    }
  }, [user, token]); // ✅ token को भी dependency में रखा

  const handleEdit = (productId) => {
    router.push(`/order/fulfilled/${productId}/edit`);
  };

  const handleDelete = async (productId) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`/api/products/delete/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}` // ✅ delete में भी भेजा गया
          }
        });
        setMyProducts((prev) => prev.filter((p) => p._id !== productId));
      } catch (err) {
        console.error("Failed to delete product", err);
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-300px)] flex justify-center p-4 md:p-10">
      <div className="space-y-4 w-full max-w-4xl">
        <h2 className="text-lg font-semibold text-gray-700 text-center">
          My Products
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : myProducts.length === 0 ? (
          <p className="text-gray-500 text-center">No products found.</p>
        ) : (
          myProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              showActions={true}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
