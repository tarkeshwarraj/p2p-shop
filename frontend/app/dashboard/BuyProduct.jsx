'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function BuyProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchasedProducts = async () => {
      try {
        const res = await axios.get('/api/products/purchased', {
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
    return <p className="text-center py-6">Loading your purchased products...</p>;
  }

  // if (products.length === 0) {
  //   return;
  // }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.length > 0 ?(
        products.map(product => (
        <div key={product._id} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
          {product.images?.[0] && (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
          )}
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-700">₹{product.price}</p>
          <p className="text-sm text-gray-400">Product ID: {product.productId}</p>
        </div>
      ))
      ):(
        <p className="text-center text-gray-500 py-6">You haven’t purchased any products yet.</p>
      )}

    </div>
  );
}
