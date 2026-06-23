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
          badge: "bg-blue-50 dark:bg-blue-950/30 text-blue-750 dark:text-blue-400 border-blue-150 dark:border-blue-900/30"
        };
      case "Code Generators":
        return {
          badge: "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-750 dark:text-indigo-400 border-indigo-150 dark:border-indigo-900/30"
        };
      case "UI/Frontend Tools":
        return {
          badge: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-750 dark:text-emerald-400 border-emerald-150 dark:border-emerald-900/30"
        };
      default:
        return {
          badge: "bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 border-neutral-200/80 dark:border-neutral-800"
        };
    }
  };

  // Dynamically compute tool-specific icon colors
  const getToolIconColor = (id) => {
    switch (id) {
      // Data Tools
      case "json-formatter":
        return "text-amber-500";
      case "base64":
        return "text-blue-500";
      case "uuid":
        return "text-yellow-500";
      case "regex":
        return "text-purple-500";
      case "jwt":
        return "text-rose-500";
      case "cron-tester":
        return "text-teal-500";
      // Code Generators
      case "snippet-generator":
        return "text-orange-500";
      case "dockerfile":
        return "text-sky-500"; // Docker brand blue
      case "gitignore":
        return "text-orange-600"; // Git brand orange-red
      // UI/Frontend Tools
      case "css-gradient":
        return "text-fuchsia-500";
      case "css-animation":
        return "text-blue-600"; // CSS3 brand blue
      case "tailwind-visualizer":
        return "text-cyan-500"; // Tailwind brand cyan
      case "color-palette":
        return "text-violet-500";
      case "markdown-html":
        return "text-indigo-600";
      case "responsive-design-tester":
        return "text-emerald-500";
      default:
        return "text-neutral-600";
    }
  };

  const styles = getCategoryStyles(category);

  return (
    <div className="bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 rounded-xl overflow-hidden w-full max-w-[280px] sm:max-w-none transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 dark:hover:border-slate-700 hover:shadow-md dark:hover:shadow-neutral-900/10 group relative flex flex-col h-64">
      {/* Icon Wrapper */}
      <div className="w-full h-32 flex items-center justify-center relative bg-neutral-50/40 dark:bg-slate-950/40 border-b border-neutral-100 dark:border-slate-800">
        {IconComponent && (
          <IconComponent className={`w-12 h-12 transition-transform duration-300 group-hover:scale-110 ${getToolIconColor(toolId)}`} />
        )}
        
        {/* Favorite Star Button */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <button 
            onClick={handleFavoriteClick}
            className="p-1.5 bg-white dark:bg-slate-950 hover:bg-neutral-50 dark:hover:bg-slate-905 rounded-md border border-neutral-200 dark:border-slate-800 hover:border-neutral-300 dark:hover:border-slate-700 transition-all text-xs cursor-pointer shadow-xs"
            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            {isFavorite ? (
              <FaStar className="text-yellow-500 w-3.5 h-3.5" />
            ) : (
              <FaRegStar className="text-neutral-400 dark:text-neutral-505 hover:text-neutral-800 dark:hover:text-neutral-300 w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Category Badge */}
        {category && (
          <div className="absolute top-3.5 left-3.5">
            <span className={`text-[10px] font-semibold px-2 py-0.75 rounded font-brand tracking-wide ${styles.badge}`}>
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-black dark:group-hover:text-white transition-colors line-clamp-1 font-brand">
            {title}
          </h2>
          
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-1.5 leading-normal">
            {desc || "A useful developer utility."}
          </p>
        </div>

        {/* Button */}
        <div className="flex items-center justify-end mt-4">
          <Link
            to={link}
            className="flex items-center gap-1.5 bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 text-white dark:text-neutral-900 px-3.5 py-1.75 text-xs font-semibold rounded-lg transition-colors shadow-xs select-none"
          >
            <span>Launch</span>
            <FaArrowRight className="w-2.5 h-2.5 transition-transform duration-300 group-hover:translate-x-0.75" />
          </Link>
        </div>
      </div>
    </div>
  );
};
