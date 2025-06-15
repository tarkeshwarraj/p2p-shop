"use client";

import React, { useState, useEffect, use } from "react";
import { ChevronDown, ChevronUp, Send } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { assets, image } from "@/lib/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import OrderProgress from "@/components/OrderProgress";

const FulfilledPage = ({ params }) => {

  const { axios, fetchProductById, setSelectedProductId, selectedProductId  } = useAppContext();
  const [singleProduct, setSingleProduct] = useState(null);
  const { id } = use(params); // unwrap params
  const [showDetails, setShowDetails] = useState(false);
  const [message, setMessage] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [chat, setChat] = useState([
    { from: "user", text: "Hello, is this product available?" },
    { from: "seller", text: "Yes, it's available!" },
  ]);
  const router = useRouter();

  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProductById(id);
      setSingleProduct(data.product);
      if (data.product.images?.length) {
        setThumbnail(data.product.images[0]);
      } else {
        setThumbnail(assets.noImage);
      }
    };
    getProduct();
  }, [id, fetchProductById]);

  const handleBuyNow = () => {
    setSelectedProductId(singleProduct._id);
    router.push("/order/confirmation");
  }

  const handleSend = () => {
    if (message.trim()) {
      setChat((prev) => [...prev, { from: "user", text: message.trim() }]);
      setMessage("");
      // Simulate seller reply (optional)
      setTimeout(() => {
        setChat((prev) => [
          ...prev,
          { from: "seller", text: "Thanks for your message!" },
        ]);
      }, 1000);
    }
  };

  return (
    <div>
        <OrderProgress status='Product Delivered'/>
        
    <div className="p-4 bg-gray-50">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Product Details Section */}
        <div className="w-full md:w-2/3 h-full overflow-hidden">
          {/* Mobile toggle */}
          <div className="md:hidden flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md mb-2 shadow-sm">
            <h2 className="text-lg font-semibold">Product Details</h2>
            <button onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? (
                  <ChevronUp size={20} />
                ) : (
                    <ChevronDown size={20} />
                )}
            </button>
          </div>

          {/* Product Card */}
          <div
            className={`${
                showDetails ? "block" : "hidden"
            } md:block bg-white p-6 rounded-md shadow-md h-[calc(80vh-160px)] overflow-y-auto`}
            >
            {singleProduct ? (
                <div className="max-w-6xl w-full px-6 mx-auto">
                <p>
                  <span>Home</span> /<span> Products</span> /
                  <span> {singleProduct.category}</span> /
                  <span className="text-indigo-500"> {singleProduct.name}</span>
                </p>

                <div className="flex flex-col md:flex-row gap-16 mt-4">
                  <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                      {(singleProduct.images.length > 0
                        ? singleProduct.images
                        : image
                    ) // default image from assets
                    .map((img, index) => (
                        <div
                        key={index}
                        onClick={() => setThumbnail(img)}
                        className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                        >
                            <img
                              src={img}
                              alt={`Product ${index}`}
                              className="w-full h-auto"
                              />
                          </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                      <img src={thumbnail} alt="Selected product" />
                      {/* <Image
                                className="h-9 w-auto"
                                src={thumbnail}
                                alt="Logo"
                                width={1500} height={1500} 
                                /> */}
                    </div>
                  </div>

                  <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">
                      {singleProduct.name}
                    </h1>

                    <div className="flex items-center gap-0.5 mt-1">
                      {Array(5)
                        .fill("")
                        .map((_, i) =>
                            singleProduct.userId.rating > i ? (
                                <svg
                                key={i}
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="text-yellow-400 drop-shadow-md"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L10.589 15.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L5.78 12.99a1 1 0 0 0-.363-1.118L2.028 9.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69L9.049 2.927z" />
                            </svg>
                          ) : (
                              <svg
                              key={i}
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="text-gray-300"
                              xmlns="http://www.w3.org/2000/svg"
                              >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L10.589 15.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L5.78 12.99a1 1 0 0 0-.363-1.118L2.028 9.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69L9.049 2.927z" />
                            </svg>
                          )
                        )}
                    </div>

                    <div className="mt-6">
                      <p className="text-gray-500/70 ">
                        MRP: ${singleProduct.price}
                      </p>
                      <span className="text-gray-500/70">
                        (inclusive of all taxes)
                      </span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                      <li>{singleProduct.description}</li>
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base">
                      <button onClick={handleBuyNow} className="w-full py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition">
                        Buy now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
                <p>Loading product details...</p>
            )}
          </div>
        </div>

        {/* Chat Section */}
        <div className="w-full md:w-1/3 bg-white rounded-md shadow-md h-[calc(80vh-160px)] flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              Chat with Seller
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2 text-sm">
            {chat.map((msg, idx) => (
                <p
                key={idx}
                className={`${
                    msg.from === "user" ? "text-gray-700" : "text-blue-600"
                }`}
                >
                {msg.from === "user" ? "You" : "Seller"}: {msg.text}
              </p>
            ))}
          </div>
          <div className="border-t p-3 flex items-center gap-2">
            <input
              type="text"
              className="flex-1  rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
              onClick={handleSend}
              >
              {/* <Send size={18} /> */}
            </button>
          </div>
        </div>
      </div>
                </div>
    </div>
  );
};

export default FulfilledPage;
