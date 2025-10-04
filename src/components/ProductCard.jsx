import React from "react";
import {
  FaShoppingCart,
  FaStar,
  FaRegEye,
  FaRegHeart,
  FaTruck,
  FaTag,
} from "react-icons/fa";

export const ProductCard = ({
  image,
  title,
  price,
  discount,
  rating,
  reviews,
  fastDelivery,
  bestPrice,
}) => {
  return (
    <div className="bg-[#222831] text-white rounded-lg shadow-md overflow-hidden w-72 hover:scale-105 transition-transform">
      {/* Image */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-contain bg-gray-800"
        />
        {/* Discount Tag */}
        {discount && (
          <span className="absolute top-2 left-2 bg-blue-600 text-xs font-medium px-2 py-1 rounded">
            Up to {discount}% off
          </span>
        )}
        {/* Icons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button className="p-1 bg-gray-700 rounded-full hover:bg-gray-600">
            <FaRegEye className="text-white w-4 h-4" />
          </button>
          <button className="p-1 bg-gray-700 rounded-full hover:bg-gray-600">
            <FaRegHeart className="text-white w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-sm font-medium mb-2">{title}</h2>

        {/* Rating */}
        <div className="flex items-center text-yellow-400 text-sm mb-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar key={index} className="w-4 h-4" />
          ))}
          <span className="ml-2 text-gray-300 text-xs">
            {rating.toFixed(1)} ({reviews})
          </span>
        </div>

        {/* Badges */}
        <div className="flex items-center text-gray-400 text-xs gap-4 mb-3">
          {fastDelivery && (
            <span className="flex items-center gap-1">
              <FaTruck /> Fast Delivery
            </span>
          )}
          {bestPrice && (
            <span className="flex items-center gap-1">
              <FaTag /> Best Price
            </span>
          )}
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold">${price}</p>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium rounded-md">
            <FaShoppingCart /> Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
