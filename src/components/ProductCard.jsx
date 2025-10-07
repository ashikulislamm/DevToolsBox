import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaRegHeart, FaArrowRight } from "react-icons/fa";
import P1 from "../assets/Format.png";

export const ProductCard = ({ image, title, link, category }) => {
  return (
    <div className="bg-[var(--primary-color)] text-white rounded-lg shadow-md overflow-hidden w-72 hover:scale-105 transition-transform p-4">
      {/* Image */}
      <div className="relative">
        <img src={P1} alt={title} className="w-full h-30 object-contain" />
        {/* Icons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button className="p-1 bg-gray-700 rounded-full hover:bg-gray-600">
            <FaRegHeart className="text-white w-4 h-4" />
          </button>
        </div>
        {/* Category Badge */}
        {category && (
          <div className="absolute top-2 left-2">
            <span className="bg-[var(--accent-color)] text-white text-xs px-2 py-1 rounded-full">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-sm font-medium mb-2">{title}</h2>

        {/* Price & Button */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <Link
            to={link}
            className="flex items-center gap-2 bg-[var(--accent-color)] hover:bg-[var(--accent-color)]/80 text-white px-4 py-2 text-sm font-medium rounded-md transition-colors group"
          >
            Try Now
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};
