'use client';

import { useAppContext } from '@/context/AppContext';
import { useEffect, useState } from 'react';
import { image } from "@/lib/assets";
import Link from 'next/link';

const OrderConfirmationPage = () => {
  const { selectedProductId, fetchProductById, axios, user } = useAppContext();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      if (selectedProductId) {
        const data = await fetchProductById(selectedProductId);
        setProduct(data.product);
      }
    };
    getProduct();
    
  }, [selectedProductId]);

  const handlePlaceOrder = async () => {
    // 🚨 Check if user is logged in
  if (!user || !user._id) {
    window.location.href = "/login"; // Redirect to login page
    return;
  }
    
  try {
    const res = await axios.post("/api/payments/create-order", {
  price_amount: product.price,
  price_currency: "USD",
  pay_currency: "currency",
  order_id: product.productId,
  order_description: product.description,
  productId: product._id,
  userId: user._id
});

    const data = res.data;

    console.log(data, {mydata: "this is frontend data"});

    if (data.success) {
      window.location.href = data.invoice_url;
    } else {
      alert("Invoice creation failed!");
    }
  } catch (err) {
    console.error(err);
    alert("Error placing order.");
  }
};
  console.log(product);
  if (!product) return <div>Loading...</div>;

  return (
   <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Order Confirmation <span className="text-sm text-indigo-500">1 Item</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
          <div className="flex items-center md:gap-6 gap-3">
            <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded">
              <img className="max-w-full h-full object-cover" src={product.images.length > 0 ? product.images : image[0]} alt={product.name} />
            </div>
            <div>
              <p className="hidden md:block font-semibold">{product.name}</p>
              <div className="font-normal text-gray-500/70">
                {/* <p>Size: <span>{product.size || "N/A"}</span></p> */}
                <p>Qty: <span>{product.quantity}</span></p>
              </div>
            </div>
          </div>
          <p className="text-center">${product.price}</p>
          <button className="cursor-pointer mx-auto">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0" stroke="#FF532E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <Link href={`/products/${selectedProductId}`} className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium">
          <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1" stroke="#615fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Continue Shopping
        </Link>
      </div>

      {/* Order Summary */}
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
          <select className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span><span>${product.price}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span><span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span><span>${product.price}</span>
          </p>
        </div>

        <button onClick={handlePlaceOrder} className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
