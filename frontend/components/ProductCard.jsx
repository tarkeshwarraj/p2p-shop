import Link from "next/link";
import React from "react";

const boxIcon =
  "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

const ProductCard = ({ product, showActions, onEdit, onDelete }) => {
  const rating = product.userId?.rating || 0;
  const sellerName = product.userId?.name || "N/A";

  const productUrl =
    product.status === "sold"
      ? `/order/fulfilled/${product._id}`
      : `/products/${product._id}`;

  return (
    <div className="relative group">
      {" "}
      {/* ✅ Add relative + group */}
      <Link href={productUrl} className="space-y-4 block">
        <div
          key={product._id}
          className={`flex flex-col md:grid ${
            showActions
              ? "md:grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr]"
              : "md:grid-cols-[2fr_1fr_1fr_1fr_1fr]"
          } md:items-center gap-5 p-5 max-w-4xl rounded-md bg-white shadow-sm`}
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

          <p className="font-medium text-base my-auto text-black/70">
            {product.status}
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
              <span className="ml-1 text-xs text-gray-500">
                ({rating.toFixed(1)})
              </span>
            </p>
          </div>

          {showActions && (
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (product.status !== "sold") onEdit?.(product._id);
                }}
                disabled={product.status === "sold"}
                className={`text-xs px-2 py-1 rounded transition ${
                  product.status === "sold"
                    ? "bg-gray-300 text-gray-500 line-through cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (product.status !== "sold") onDelete?.(product._id);
                }}
                disabled={product.status === "sold"}
                className={`text-xs px-2 py-1 rounded transition ${
                  product.status === "sold"
                    ? "bg-gray-300 text-gray-500 line-through cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
