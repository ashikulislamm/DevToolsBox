import React, { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { ALL_TOOLS, getToolIcon } from "../config/tools.jsx";

export const WorkspaceLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    return saved ? JSON.parse(saved) : false;
  });
  const [favorites, setFavorites] = useState([]);
  const location = useLocation();

  // Load favorites
  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem("favoriteTools") || "[]");
    setFavorites(savedFavs);
  }, [location]);

  // Track location changes and add to "Recently Used"
  useEffect(() => {
    const currentTool = ALL_TOOLS.find(t => location.pathname === t.path);
    if (currentTool) {
      let savedRecents = JSON.parse(localStorage.getItem("recentTools") || "[]");
      savedRecents = [currentTool.id, ...savedRecents.filter(id => id !== currentTool.id)].slice(0, 5);
      localStorage.setItem("recentTools", JSON.stringify(savedRecents));
    }
  }, [location]);

  // Save collapse state
  const handleToggleCollapse = () => {
    setIsCollapsed(prev => {
      const newVal = !prev;
      localStorage.setItem("sidebarCollapsed", JSON.stringify(newVal));
      return newVal;
    });
  };

  // Group tools by category
  const categories = ALL_TOOLS.reduce((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = [];
    acc[tool.category].push(tool);
    return acc;
  }, {});

  return (
    <div className="flex flex-1 relative overflow-hidden h-[calc(100vh-4rem)]">
      {/* Sidebar Navigation */}
      <aside 
        className={`bg-[#0F172A] border-r border-slate-800 flex flex-col transition-all duration-300 relative z-30 ${
          isCollapsed ? "w-14" : "w-64"
        } shrink-0 hidden md:flex`}
      >
        {/* Toggle Collapse Button */}
        <button 
          onClick={handleToggleCollapse}
          className="absolute -right-3 top-5 w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer z-40 shadow-sm"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <FaChevronRight className="w-2.5 h-2.5" /> : <FaChevronLeft className="w-2.5 h-2.5" />}
        </button>

        {/* Sidebar Tools List */}
        <div className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar space-y-6 select-none">
          {Object.entries(categories).map(([categoryName, tools]) => (
            <div key={categoryName} className="space-y-1">
              {!isCollapsed ? (
                <h4 className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 py-1 font-brand">
                  {categoryName}
                </h4>
              ) : (
                <div className="border-t border-slate-800/60 my-2 mx-1" />
              )}
              
              <div className="space-y-0.5">
                {tools.map((tool) => {
                  const isActive = location.pathname === tool.path;
                  const isFav = favorites.includes(tool.id);

                  return (
                    <Link
                      key={tool.id}
                      to={tool.path}
                      className={`flex items-center rounded-lg transition-colors group relative ${
                        isCollapsed ? "justify-center p-2.5" : "px-3 py-2.5 gap-3"
                      } ${
                        isActive 
                          ? "bg-slate-800 text-white font-medium shadow-sm" 
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                      }`}
                      title={isCollapsed ? tool.title : undefined}
                    >
                      <div className={`transition-colors ${isActive ? "text-[var(--accent-color)]" : "text-slate-500 group-hover:text-slate-300"}`}>
                        {getToolIcon(tool.id)}
                      </div>

                      {!isCollapsed && (
                        <span className="text-xs truncate flex-1">{tool.title}</span>
                      )}

                      {!isCollapsed && isFav && (
                        <FaStar className="w-2.5 h-2.5 text-yellow-500 shrink-0" />
                      )}

                      {/* Tooltip for collapsed view */}
                      {isCollapsed && (
                        <div className="absolute left-14 bg-slate-900 border border-slate-800 text-white text-[10px] px-2.5 py-1.5 rounded-md shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 whitespace-nowrap z-50">
                          <div className="font-semibold flex items-center gap-1.5">
                            {tool.title}
                            {isFav && <FaStar className="w-2.5 h-2.5 text-yellow-500" />}
                          </div>
                          <div className="text-slate-400 text-[9px] mt-0.5">{tool.desc}</div>
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <main className="flex-1 overflow-y-auto bg-slate-950 flex flex-col relative custom-scrollbar">
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
