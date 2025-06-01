import Link from "next/link";
import React from "react";

const boxIcon = "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

const ProductCard = ({ product }) => {
  const rating = product.userId?.rating || 0;
  const sellerName = product.userId?.name || "N/A";

  return (
    <div>

  
    <Link href={`/products/${product._id}`} passHref className="space-y-4">
    <div
      key={product._id}
      className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md bg-white shadow-sm "
    >

      <div className="flex gap-5">
        <img
          className="w-12 h-12 object-cover opacity-60"
          src={boxIcon}
          alt="boxIcon"
        />
        <div>
          <p className="font-medium text-gray-800">{product.name}</p>
          <p className="text-gray-600 text-sm">{product.description}</p>
        </div>
      </div>

      <p className="text-sm text-gray-600">{product.category}</p>

      <p className="font-medium text-base my-auto text-black/70">
        ${product.price}
      </p>

      <div>
        <p className="text-sm text-gray-600">
          Seller: <span className="font-medium">{sellerName}</span>
        </p>
        <p className="text-sm text-gray-600 flex items-center gap-1">
          Rating:
          <span className="flex items-center text-amber-300">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i}>{i < Math.floor(rating) ? "★" : "☆"}</span>
            ))}
          </span>
          <span className="ml-1 text-xs text-gray-500">({rating.toFixed(1)})</span>
        </p>
      </div>
    </div>
    </Link>
      </div>
    
  );
};

export default ProductCard;
