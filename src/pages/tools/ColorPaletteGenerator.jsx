import React, { useState, useEffect } from "react";
import {
  FaCopy,
  FaRandom,
  FaDownload,
  FaPlus,
  FaMinus,
  FaLock,
  FaUnlock,
  FaEyeDropper,
} from "react-icons/fa";

const ColorPaletteGenerator = () => {
  const [colors, setColors] = useState([
    { hex: "#3B82F6", locked: false },
    { hex: "#8B5CF6", locked: false },
    { hex: "#EF4444", locked: false },
    { hex: "#10B981", locked: false },
    { hex: "#F59E0B", locked: false },
  ]);
  const [harmony, setHarmony] = useState("complementary");
  const [baseColor, setBaseColor] = useState("#3B82F6");
  const [notifications, setNotifications] = useState([]);
  const [showGuide, setShowGuide] = useState(false);
  const [exportFormat, setExportFormat] = useState("hex");

  // Color harmony algorithms
  const colorHarmonies = {
    monochromatic: "Monochromatic",
    analogous: "Analogous",
    complementary: "Complementary",
    triadic: "Triadic",
    tetradic: "Tetradic",
    splitComplementary: "Split Complementary",
  };

  const exportFormats = ["hex", "rgb", "hsl", "css-variables"];

  // Predefined color palettes
  const presetPalettes = [
    {
      name: "Ocean Breeze",
      colors: ["#0EA5E9", "#06B6D4", "#10B981", "#22D3EE", "#3B82F6"],
    },
    {
      name: "Sunset Vibes",
      colors: ["#F97316", "#EF4444", "#EC4899", "#8B5CF6", "#F59E0B"],
    },
    {
      name: "Forest Dream",
      colors: ["#059669", "#10B981", "#34D399", "#6EE7B7", "#A7F3D0"],
    },
    {
      name: "Purple Rain",
      colors: ["#7C3AED", "#8B5CF6", "#A855F7", "#C084FC", "#DDD6FE"],
    },
    {
      name: "Autumn Leaves",
      colors: ["#DC2626", "#EA580C", "#D97706", "#CA8A04", "#65A30D"],
    },
    {
      name: "Nordic Minimal",
      colors: ["#374151", "#6B7280", "#9CA3AF", "#D1D5DB", "#F3F4F6"],
    },
    {
      name: "Tropical Paradise",
      colors: ["#06B6D4", "#10B981", "#84CC16", "#EAB308", "#F97316"],
    },
    {
      name: "Dark Mode",
      colors: ["#111827", "#1F2937", "#374151", "#4B5563", "#6B7280"],
    },
  ];

  // Notification functions
  const showNotification = (message, type = "success") => {
    const id = Date.now();
    const newNotification = { id, message, type };
    setNotifications((prev) => [...prev, newNotification]);

    setTimeout(() => {
      removeNotification(id);
    }, 3000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  // Convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  // Convert RGB to HSL
  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          h = 0;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  // Convert HSL to Hex
  const hslToHex = (h, s, l) => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  // Generate color harmonies
  const generateHarmony = (baseHex, harmonyType) => {
    const { r, g, b } = hexToRgb(baseHex);
    const { h, s, l } = rgbToHsl(r, g, b);

    let harmonies = [];

    switch (harmonyType) {
      case "monochromatic":
        harmonies = [
          hslToHex(h, s, Math.max(l - 30, 10)),
          hslToHex(h, s, Math.max(l - 15, 15)),
          baseHex,
          hslToHex(h, s, Math.min(l + 15, 85)),
          hslToHex(h, s, Math.min(l + 30, 90)),
        ];
        break;
      case "analogous":
        harmonies = [
          hslToHex((h - 60 + 360) % 360, s, l),
          hslToHex((h - 30 + 360) % 360, s, l),
          baseHex,
          hslToHex((h + 30) % 360, s, l),
          hslToHex((h + 60) % 360, s, l),
        ];
        break;
      case "complementary":
        harmonies = [
          baseHex,
          hslToHex((h + 180) % 360, s, l),
          hslToHex(h, Math.max(s - 20, 20), Math.min(l + 20, 80)),
          hslToHex((h + 180) % 360, Math.max(s - 20, 20), Math.min(l + 20, 80)),
          hslToHex(h, Math.min(s + 20, 80), Math.max(l - 20, 20)),
        ];
        break;
      case "triadic":
        harmonies = [
          baseHex,
          hslToHex((h + 120) % 360, s, l),
          hslToHex((h + 240) % 360, s, l),
          hslToHex(h, Math.max(s - 15, 15), Math.min(l + 15, 85)),
          hslToHex((h + 120) % 360, Math.max(s - 15, 15), Math.min(l + 15, 85)),
        ];
        break;
      case "tetradic":
        harmonies = [
          baseHex,
          hslToHex((h + 90) % 360, s, l),
          hslToHex((h + 180) % 360, s, l),
          hslToHex((h + 270) % 360, s, l),
          hslToHex(h, Math.max(s - 10, 10), Math.min(l + 10, 90)),
        ];
        break;
      case "splitComplementary":
        harmonies = [
          baseHex,
          hslToHex((h + 150) % 360, s, l),
          hslToHex((h + 210) % 360, s, l),
          hslToHex(h, Math.max(s - 15, 15), Math.min(l + 15, 85)),
          hslToHex((h + 180) % 360, Math.max(s - 30, 30), Math.min(l + 20, 80)),
        ];
        break;
      default:
        harmonies = [baseHex, baseHex, baseHex, baseHex, baseHex];
    }

    return harmonies;
  };

  // Generate random color
  const generateRandomColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
    );
  };

  // Generate new palette
  const generateNewPalette = () => {
    if (harmony === "random") {
      const newColors = colors.map((color) =>
        color.locked ? color : { ...color, hex: generateRandomColor() }
      );
      setColors(newColors);
    } else {
      // Generate a random base color each time for more variety
      const randomBaseColor = generateRandomColor();
      const harmonies = generateHarmony(randomBaseColor, harmony);
      const newColors = colors.map((color, index) =>
        color.locked
          ? color
          : { ...color, hex: harmonies[index] || generateRandomColor() }
      );
      setColors(newColors);
      // Update the base color input to show what was used
      setBaseColor(randomBaseColor);
    }
    showNotification("New palette generated! 🎨", "success");
  };

  // Apply preset palette
  const applyPreset = (preset) => {
    const newColors = preset.colors.map((hex, index) => ({
      hex,
      locked: colors[index]?.locked || false,
    }));

    // Fill remaining slots if needed
    while (newColors.length < colors.length) {
      newColors.push({ hex: generateRandomColor(), locked: false });
    }

    setColors(newColors.slice(0, colors.length));
    showNotification(`Applied ${preset.name} palette! 🎨`, "success");
  };

  // Update color
  const updateColor = (index, newHex) => {
    const newColors = [...colors];
    newColors[index].hex = newHex;
    setColors(newColors);
  };

  // Toggle lock
  const toggleLock = (index) => {
    const newColors = [...colors];
    newColors[index].locked = !newColors[index].locked;
    setColors(newColors);
  };

  // Add color
  const addColor = () => {
    if (colors.length < 10) {
      setColors([...colors, { hex: generateRandomColor(), locked: false }]);
    }
  };

  // Remove color
  const removeColor = (index) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index));
    }
  };

  // Export functions
  const formatColor = (hex, format) => {
    const { r, g, b } = hexToRgb(hex);
    const { h, s, l } = rgbToHsl(r, g, b);

    switch (format) {
      case "rgb":
        return `rgb(${r}, ${g}, ${b})`;
      case "hsl":
        return `hsl(${h}, ${s}%, ${l}%)`;
      case "css-variables":
        return `--color-${colors.findIndex((c) => c.hex === hex) + 1}: ${hex};`;
      default:
        return hex;
    }
  };

  const copyPalette = async () => {
    const paletteString = colors
      .map((color) => formatColor(color.hex, exportFormat))
      .join("\n");
    try {
      await navigator.clipboard.writeText(paletteString);
      showNotification(
        `Palette copied as ${exportFormat.toUpperCase()}! 📋`,
        "success"
      );
    } catch (err) {
      showNotification("Failed to copy palette", "error");
    }
  };

  const downloadPalette = () => {
    const paletteData = {
      colors: colors.map((c) => c.hex),
      format: exportFormat,
      harmony,
      baseColor,
      generated: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(paletteData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `color-palette-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification("Palette downloaded! 💾", "success");
  };

  // Toast Notification Component
  const ToastNotification = ({ notification, onRemove }) => {
    const { id, message, type } = notification;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      setTimeout(() => setIsVisible(true), 10);
    }, []);

    const getIcon = () => {
      switch (type) {
        case "success":
          return (
            <svg
              className="w-5 h-5 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          );
        case "error":
          return (
            <svg
              className="w-5 h-5 text-red-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          );
        default:
          return (
            <svg
              className="w-5 h-5 text-blue-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          );
      }
    };

    const getBgColor = () => {
      switch (type) {
        case "success":
          return "bg-green-50 border-green-200";
        case "error":
          return "bg-red-50 border-red-200";
        default:
          return "bg-blue-50 border-blue-200";
      }
    };

    const getTextColor = () => {
      switch (type) {
        case "success":
          return "text-green-800";
        case "error":
          return "text-red-800";
        default:
          return "text-blue-800";
      }
    };

    return (
      <div
        className={`flex items-start p-4 mb-3 rounded-lg border ${getBgColor()} ${getTextColor()} transform transition-all duration-300 ease-in-out shadow-lg`}
        style={{
          transform: isVisible ? "translateX(0)" : "translateX(100%)",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
        <div className="ml-3 text-sm font-medium flex-1 min-w-0">{message}</div>
        <button
          onClick={() => onRemove(id)}
          className={`ml-3 flex-shrink-0 rounded-lg p-1 inline-flex items-center justify-center h-6 w-6 ${getTextColor()} hover:bg-white hover:bg-opacity-30 focus:ring-2 focus:ring-gray-300 focus:outline-none transition-colors`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-8 mb-8 rounded-lg px-4 shadow-lg">
      {/* Toast Notifications Container */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
          {notifications.map((notification) => (
            <ToastNotification
              key={notification.id}
              notification={notification}
              onRemove={removeNotification}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h1 className="md:text-2xl font-bold text-white">
            🎨 Color Palette Generator
          </h1>
          <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700"
            >
              {showGuide ? "Hide Guide" : "Show Guide"}
            </button>
            <button
              onClick={copyPalette}
              className="px-3 py-1.5 rounded-lg text-sm font-medium"
              style={{ backgroundColor: "var(--accent-color)" }}
            >
              Copy Palette
            </button>
            <button
              onClick={downloadPalette}
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-green-600 hover:bg-green-700"
            >
              Download
            </button>
          </div>
        </div>

        {/* Usage Guide */}
        {showGuide && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
            <h3 className="font-semibold mb-3 text-blue-300 flex items-center">
              📚 How to Use Color Palette Generator
            </h3>
            <div className="space-y-4 text-sm text-gray-300">
              <div>
                <h4 className="font-medium text-white mb-1">
                  1. Choose Color Harmony
                </h4>
                <p>
                  • <strong>Monochromatic</strong>: Different shades of the same
                  color
                </p>
                <p>
                  • <strong>Analogous</strong>: Colors next to each other on
                  color wheel
                </p>
                <p>
                  • <strong>Complementary</strong>: Opposite colors for high
                  contrast
                </p>
                <p>
                  • <strong>Triadic</strong>: Three evenly spaced colors
                </p>
                <p>
                  • <strong>Tetradic</strong>: Four colors forming a rectangle
                </p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">
                  2. Customize Your Palette
                </h4>
                <p>• Click on any color to edit it manually</p>
                <p>
                  • Lock colors you want to keep when generating new palettes
                </p>
                <p>• Add or remove colors (2-10 colors supported)</p>
                <p>• Use presets for quick inspiration</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">
                  3. Export Your Palette
                </h4>
                <p>• Copy in different formats: HEX, RGB, HSL, CSS Variables</p>
                <p>• Download as JSON file for later use</p>
                <p>• Use in your design projects and websites</p>
              </div>
              <div className="p-3 bg-blue-900/30 border border-blue-700 rounded">
                <h4 className="font-medium text-blue-300 mb-1">💡 Pro Tips:</h4>
                <p>
                  • Lock your brand colors and generate harmonies around them
                </p>
                <p>
                  • Use complementary colors for buttons and call-to-actions
                </p>
                <p>
                  • Monochromatic palettes work great for minimalist designs
                </p>
                <p>
                  • Test your palette with different contrast ratios for
                  accessibility
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <div className="xl:col-span-2 space-y-6">
            {/* Color Palette Display */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4 md:flex-row flex-col gap-3">
                <h3 className="text-xl font-bold text-purple-400">
                  Color Palette
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={addColor}
                    disabled={colors.length >= 10}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center gap-2"
                  >
                    <FaPlus />
                    Add
                  </button>
                  <button
                    onClick={generateNewPalette}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center gap-2"
                  >
                    <FaRandom />
                    Generate
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {colors.map((color, index) => (
                  <div key={index} className="relative group">
                    <div
                      className="w-full h-24 rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-105 border-2 border-gray-600"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => {
                        const input = document.createElement("input");
                        input.type = "color";
                        input.value = color.hex;
                        input.onchange = (e) =>
                          updateColor(index, e.target.value);
                        input.click();
                      }}
                    />
                    <div className="mt-2 text-center">
                      <div className="text-xs font-mono text-gray-300">
                        {color.hex.toUpperCase()}
                      </div>
                      <div className="flex justify-center items-center gap-2 mt-1">
                        <button
                          onClick={() => toggleLock(index)}
                          className={`text-xs px-2 py-1 rounded transition-colors ${
                            color.locked
                              ? "bg-yellow-600 text-white"
                              : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                          }`}
                        >
                          {color.locked ? <FaLock /> : <FaUnlock />}
                        </button>
                        {colors.length > 2 && (
                          <button
                            onClick={() => removeColor(index)}
                            className="text-xs px-2 py-1 rounded bg-red-600 hover:bg-red-700 text-white transition-colors"
                          >
                            <FaMinus />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Generation Settings */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-blue-400">
                Generation Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Color Harmony
                  </label>
                  <select
                    value={harmony}
                    onChange={(e) => setHarmony(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  >
                    {Object.entries(colorHarmonies).map(([key, name]) => (
                      <option key={key} value={key}>
                        {name}
                      </option>
                    ))}
                    <option value="random">Random</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Base Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={baseColor}
                      onChange={(e) => setBaseColor(e.target.value)}
                      className="w-12 h-10 rounded border border-gray-600 bg-gray-700"
                    />
                    <input
                      type="text"
                      value={baseColor}
                      onChange={(e) => setBaseColor(e.target.value)}
                      className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:border-blue-500 focus:outline-none font-mono text-sm"
                      placeholder="#3B82F6"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Export Format
                  </label>
                  <select
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="hex">HEX (#3B82F6)</option>
                    <option value="rgb">RGB (59, 130, 246)</option>
                    <option value="hsl">HSL (217, 91%, 60%)</option>
                    <option value="css-variables">
                      CSS Variables (--color-1)
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Presets Panel */}
          <div className="space-y-6">
            {/* Color Presets */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-orange-400">
                Preset Palettes
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                {presetPalettes.map((preset, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer"
                    onClick={() => applyPreset(preset)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                        {preset.name}
                      </span>
                    </div>
                    <div className="flex gap-1 rounded overflow-hidden">
                      {preset.colors.map((color, colorIndex) => (
                        <div
                          key={colorIndex}
                          className="flex-1 h-8 transition-transform group-hover:scale-105"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Preview */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4 md:flex-row flex-col gap-3">
                <h3 className="text-xl font-bold text-green-400">
                  Export Preview
                </h3>
                <button
                  onClick={copyPalette}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center gap-2"
                >
                  <FaCopy />
                  Copy
                </button>
              </div>

              <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto text-green-400 border border-gray-600 custom-scrollbar text-left">
                <code className="text-left whitespace-pre">
                  {colors
                    .map((color) => formatColor(color.hex, exportFormat))
                    .join("\n")}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPaletteGenerator;
