import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaStar, FaRegStar } from "react-icons/fa";

export const ProductCard = ({ title, link, category, icon: IconComponent, desc, isFavInitially, onToggleFav }) => {
  const toolId = link.split("/").pop();
  const [isFavorite, setIsFavorite] = useState(isFavInitially);

  useEffect(() => {
    setIsFavorite(isFavInitially);
  }, [isFavInitially]);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const savedFavs = JSON.parse(localStorage.getItem("favoriteTools") || "[]");
    let newFavs;
    if (savedFavs.includes(toolId)) {
      newFavs = savedFavs.filter(id => id !== toolId);
    } else {
      newFavs = [...savedFavs, toolId];
    }
    localStorage.setItem("favoriteTools", JSON.stringify(newFavs));
    setIsFavorite(!isFavorite);
    
    if (onToggleFav) {
      onToggleFav(toolId, !isFavorite);
    }
  };

  // Dynamically compute styling based on category
  const getCategoryStyles = (cat) => {
    switch (cat) {
      case "Data Tools":
        return {
          icon: "text-blue-400",
          badge: "bg-blue-500/10 text-blue-400 border-blue-500/20"
        };
      case "Code Generators":
        return {
          icon: "text-indigo-400",
          badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
        };
      case "UI/Frontend Tools":
        return {
          icon: "text-emerald-400",
          badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        };
      default:
        return {
          icon: "text-[var(--accent-color)]",
          badge: "bg-[var(--accent-color)]/10 text-[var(--accent-color)] border-[var(--accent-color)]/20"
        };
    }
  };

  const styles = getCategoryStyles(category);

  return (
    <div className="bg-[#0F172A] border border-slate-800 rounded-xl overflow-hidden w-full max-w-[280px] sm:max-w-none transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-xl hover:shadow-[#847cfa]/5 group relative flex flex-col h-64">
      {/* Icon Wrapper */}
      <div className="w-full h-32 flex items-center justify-center relative bg-slate-950/40 border-b border-slate-900">
        {IconComponent && (
          <IconComponent className={`w-12 h-12 transition-transform duration-300 group-hover:scale-110 ${styles.icon}`} />
        )}
        
        {/* Favorite Star Button */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <button 
            onClick={handleFavoriteClick}
            className="p-1.5 bg-slate-900/80 hover:bg-slate-800 rounded-md border border-slate-800 hover:border-slate-700 transition-all text-xs cursor-pointer shadow-sm"
            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            {isFavorite ? (
              <FaStar className="text-yellow-400 w-3.5 h-3.5" />
            ) : (
              <FaRegStar className="text-slate-400 hover:text-white w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Category Badge */}
        {category && (
          <div className="absolute top-3.5 left-3.5">
            <span className={`text-[10px] font-semibold px-2 py-0.75 rounded border font-brand tracking-wide ${styles.badge}`}>
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h2 className="text-sm font-semibold text-slate-100 group-hover:text-white transition-colors line-clamp-1 font-brand">
            {title}
          </h2>
          
          <p className="text-[11px] text-slate-400 line-clamp-2 mt-1.5 leading-normal">
            {desc || "A useful developer utility."}
          </p>
        </div>

        {/* Button */}
        <div className="flex items-center justify-end mt-4">
          <Link
            to={link}
            className="flex items-center gap-1.5 bg-[var(--accent-color)] hover:bg-[#9790f9] text-white px-3.5 py-1.75 text-xs font-semibold rounded-lg transition-colors shadow-sm select-none"
          >
            <span>Launch</span>
            <FaArrowRight className="w-2.5 h-2.5 transition-transform duration-300 group-hover:translate-x-0.75" />
          </Link>
        </div>
      </div>
    </div>
  );
};
