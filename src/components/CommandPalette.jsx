import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaStar, FaHistory, FaKeyboard, FaTerminal } from "react-icons/fa";
import { ALL_TOOLS } from "../config/tools.jsx";

export const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [recents, setRecents] = useState([]);
  const inputRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  // Load favorites and recents on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);

      const savedFavs = JSON.parse(localStorage.getItem("favoriteTools") || "[]");
      const savedRecents = JSON.parse(localStorage.getItem("recentTools") || "[]");
      setFavorites(savedFavs);
      setRecents(savedRecents);
    }
  }, [isOpen]);

  // Handle outside clicks and keyboard
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Track page navigation (add to recents)
  const trackRecent = (toolId) => {
    let savedRecents = JSON.parse(localStorage.getItem("recentTools") || "[]");
    // Filter out current, put it first, limit to 5
    savedRecents = [toolId, ...savedRecents.filter(id => id !== toolId)].slice(0, 5);
    localStorage.setItem("recentTools", JSON.stringify(savedRecents));
  };

  // Select tool
  const selectTool = (tool) => {
    trackRecent(tool.id);
    navigate(tool.path);
    onClose();
  };

  // Process and filter tools list
  const getFilteredTools = () => {
    const cleanQuery = query.toLowerCase().trim();
    if (!cleanQuery) {
      // Default: Favorites first, Recents next, then all tools
      const list = [];
      
      if (favorites.length > 0) {
        favorites.forEach(id => {
          const t = ALL_TOOLS.find(x => x.id === id);
          if (t) list.push({ ...t, listType: "Favorite" });
        });
      }
      
      if (recents.length > 0) {
        recents.forEach(id => {
          // Avoid double display if in favorites already
          if (!favorites.includes(id)) {
            const t = ALL_TOOLS.find(x => x.id === id);
            if (t) list.push({ ...t, listType: "Recent" });
          }
        });
      }

      // Fill in remaining tools
      ALL_TOOLS.forEach(t => {
        if (!favorites.includes(t.id) && !recents.includes(t.id)) {
          list.push({ ...t, listType: t.category });
        }
      });

      return list;
    }

    // Filter by query
    return ALL_TOOLS.filter(t => 
      t.title.toLowerCase().includes(cleanQuery) || 
      t.desc.toLowerCase().includes(cleanQuery) || 
      t.category.toLowerCase().includes(cleanQuery)
    ).map(t => ({ ...t, listType: t.category }));
  };

  const filteredTools = getFilteredTools();

  // Keyboard navigation through search list
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredTools.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredTools.length) % filteredTools.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredTools[activeIndex]) {
        selectTool(filteredTools[activeIndex]);
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector("[data-active='true']");
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [activeIndex]);

  if (!isOpen) return null;

  // Group items by their listType for visual separation
  const groupedTools = filteredTools.reduce((acc, tool) => {
    if (!acc[tool.listType]) acc[tool.listType] = [];
    acc[tool.listType].push(tool);
    return acc;
  }, {});

  // Order of categories display
  const groupOrder = ["Favorite", "Recent", "Data Tools", "Code Generators", "UI/Frontend Tools"];

  // Calculate absolute index positions in the grouped rendering to match flat activeIndex
  let itemCounter = 0;

  return (
    <div 
      className="fixed inset-0 bg-neutral-900/20 backdrop-blur-xs flex items-start justify-center pt-[15vh] z-50 transition-opacity duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white border border-neutral-200 rounded-xl shadow-2xl max-w-xl w-full mx-4 overflow-hidden flex flex-col font-sans max-h-[500px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-neutral-200 px-4">
          <FaSearch className="text-neutral-400 mr-3 w-4 h-4" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a tool name, category, or description..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="w-full text-neutral-900 bg-transparent placeholder-neutral-450 py-4 outline-none text-sm border-0 focus:ring-0 focus:outline-none"
          />
          <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 bg-neutral-50 px-2 py-1 rounded border border-neutral-200 font-mono">
            <span>ESC</span>
          </div>
        </div>

        {/* Tools List Box */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto p-2 custom-scrollbar"
        >
          {filteredTools.length === 0 ? (
            <div className="py-8 px-4 text-center text-neutral-550">
              <FaTerminal className="mx-auto w-8 h-8 text-neutral-400 mb-3" />
              <p className="text-sm font-semibold">No tools found matching "{query}"</p>
              <p className="text-xs text-neutral-500 mt-1">Try searching another keyword or clear the query</p>
            </div>
          ) : (
            groupOrder.map(group => {
              const items = groupedTools[group];
              if (!items || items.length === 0) return null;

              return (
                <div key={group} className="mb-2">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-450 px-3 py-1 flex items-center gap-1.5 font-brand">
                    {group === "Favorite" && <FaStar className="text-yellow-500 w-2.5 h-2.5" />}
                    {group === "Recent" && <FaHistory className="text-neutral-500 w-2.5 h-2.5" />}
                    {group === "Favorite" ? "Starred Favorites" : group === "Recent" ? "Recently Used" : group}
                  </div>
                  <div className="space-y-0.5 mt-1">
                    {items.map((tool) => {
                      const currentFlatIndex = itemCounter;
                      const isActive = activeIndex === currentFlatIndex;
                      itemCounter++;

                      return (
                        <div
                          key={tool.id}
                          data-active={isActive}
                          onClick={() => selectTool(tool)}
                          onMouseEnter={() => setActiveIndex(currentFlatIndex)}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-150 ${
                            isActive 
                              ? "bg-neutral-100 text-neutral-900 font-medium" 
                              : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                          }`}
                        >
                          <div className="flex-1 min-w-0 pr-4">
                            <div className="text-xs font-semibold flex items-center gap-2">
                              {tool.title}
                              {group === "Favorite" && <span className="text-[8px] bg-yellow-50 text-yellow-800 border border-yellow-200 px-1 rounded">Favorite</span>}
                            </div>
                            <div className="text-[10px] text-neutral-500 truncate mt-0.5">{tool.desc}</div>
                          </div>
                          
                          {isActive && (
                            <div className="flex items-center gap-1 text-[9px] text-neutral-500 bg-white px-1.5 py-0.5 rounded border border-neutral-200 font-mono">
                              <FaKeyboard className="w-2.5 h-2.5" />
                              <span>↵ Enter</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="border-t border-neutral-200 px-4 py-2.5 bg-neutral-50 flex justify-between items-center text-[10px] text-neutral-500 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>
          <div>
            <span>DevToolsBox Palette v1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};
