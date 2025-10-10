import { useState, useEffect } from "react";

export default function CssGradientGenerator() {
  const [gradientType, setGradientType] = useState("linear");
  const [direction, setDirection] = useState("to right");
  const [angle, setAngle] = useState(90);
  const [colors, setColors] = useState([
    { color: "#FF6B6B", position: 0 },
    { color: "#4ECDC4", position: 100 },
  ]);
  const [cssCode, setCssCode] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showGuide, setShowGuide] = useState(false);

  // Predefined gradient presets
  const presets = [
    {
      name: "Sunset",
      type: "linear",
      direction: "to right",
      colors: [
        { color: "#FF512F", position: 0 },
        { color: "#F09819", position: 100 },
      ],
    },
    {
      name: "Ocean",
      type: "linear",
      direction: "to bottom",
      colors: [
        { color: "#667eea", position: 0 },
        { color: "#764ba2", position: 100 },
      ],
    },
    {
      name: "Rainbow",
      type: "linear",
      direction: "to right",
      colors: [
        { color: "#FF0000", position: 0 },
        { color: "#FF7F00", position: 16.66 },
        { color: "#FFFF00", position: 33.33 },
        { color: "#00FF00", position: 50 },
        { color: "#0000FF", position: 66.66 },
        { color: "#4B0082", position: 83.33 },
        { color: "#9400D3", position: 100 },
      ],
    },
    {
      name: "Fire",
      type: "radial",
      direction: "circle",
      colors: [
        { color: "#FFA726", position: 0 },
        { color: "#FF5722", position: 50 },
        { color: "#D32F2F", position: 100 },
      ],
    },
    {
      name: "Purple Dream",
      type: "linear",
      direction: "to bottom right",
      colors: [
        { color: "#667eea", position: 0 },
        { color: "#764ba2", position: 100 },
      ],
    },
    {
      name: "Green Mint",
      type: "linear",
      direction: "to top",
      colors: [
        { color: "#00b09b", position: 0 },
        { color: "#96c93d", position: 100 },
      ],
    },
    {
      name: "Pink Bliss",
      type: "linear",
      direction: "45deg",
      colors: [
        { color: "#ff9a9e", position: 0 },
        { color: "#fecfef", position: 50 },
        { color: "#fecfef", position: 100 },
      ],
    },
    {
      name: "Sky Blue",
      type: "linear",
      direction: "to bottom",
      colors: [
        { color: "#74b9ff", position: 0 },
        { color: "#0984e3", position: 100 },
      ],
    },
    {
      name: "Warm Flame",
      type: "linear",
      direction: "135deg",
      colors: [
        { color: "#ff9a56", position: 0 },
        { color: "#ff6b6b", position: 100 },
      ],
    },
    {
      name: "Night Fade",
      type: "linear",
      direction: "to top",
      colors: [
        { color: "#a8edea", position: 0 },
        { color: "#fed6e3", position: 100 },
      ],
    },
    {
      name: "Spring Warmth",
      type: "linear",
      direction: "to right",
      colors: [
        { color: "#fad0c4", position: 0 },
        { color: "#ffd1ff", position: 100 },
      ],
    },
    {
      name: "Deep Blue",
      type: "linear",
      direction: "to bottom left",
      colors: [
        { color: "#6a11cb", position: 0 },
        { color: "#2575fc", position: 100 },
      ],
    },
  ];

  // Notification functions
  const showNotification = (message, type = "success") => {
    const id = Date.now();
    const newNotification = { id, message, type };
    setNotifications((prev) => [...prev, newNotification]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 3000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  // Generate CSS gradient code
  const generateGradient = () => {
    const colorStops = colors
      .sort((a, b) => a.position - b.position)
      .map((c) => `${c.color} ${c.position}%`)
      .join(", ");

    let gradient = "";
    if (gradientType === "linear") {
      const dir = direction === "custom" ? `${angle}deg` : direction;
      gradient = `linear-gradient(${dir}, ${colorStops})`;
    } else if (gradientType === "radial") {
      gradient = `radial-gradient(${direction}, ${colorStops})`;
    } else if (gradientType === "conic") {
      const dir = direction === "custom" ? `from ${angle}deg` : direction;
      gradient = `conic-gradient(${dir}, ${colorStops})`;
    }

    return gradient;
  };

  // Update CSS when parameters change
  useEffect(() => {
    const gradient = generateGradient();
    const css = `background: ${gradient};`;
    setCssCode(css);
  }, [gradientType, direction, angle, colors]);

  // Copy CSS to clipboard
  const copyCss = async () => {
    if (!cssCode.trim()) {
      showNotification(
        "No CSS to copy! Please generate a gradient first.",
        "error"
      );
      return;
    }

    try {
      await navigator.clipboard.writeText(cssCode);
      showNotification(
        "🎨 CSS code copied to clipboard successfully!",
        "success"
      );
    } catch (err) {
      showNotification("❌ Failed to copy CSS to clipboard", "error");
    }
  };

  // Add new color stop
  const addColor = () => {
    const newPosition =
      colors.length > 0 ? Math.max(...colors.map((c) => c.position)) + 10 : 50;
    setColors([
      ...colors,
      { color: "#000000", position: Math.min(newPosition, 100) },
    ]);
  };

  // Remove color stop
  const removeColor = (index) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index));
    } else {
      showNotification("You need at least 2 colors for a gradient!", "error");
    }
  };

  // Update color
  const updateColor = (index, field, value) => {
    const newColors = [...colors];
    newColors[index][field] = value;
    setColors(newColors);
  };

  // Apply preset
  const applyPreset = (preset) => {
    setGradientType(preset.type);
    setDirection(preset.direction);
    setColors(preset.colors);
    showNotification(`🎨 Applied "${preset.name}" preset!`, "success");
  };

  // Clear all
  const clearAll = () => {
    setGradientType("linear");
    setDirection("to right");
    setAngle(90);
    setColors([
      { color: "#FF6B6B", position: 0 },
      { color: "#4ECDC4", position: 100 },
    ]);
    setCssCode("");
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
    <div
      className="w-full max-w-7xl mx-auto mt-8 mb-8 p-6 rounded-2xl shadow-sm border"
      style={{
        backgroundColor: "var(--primary-color)",
        color: "#fff",
        borderColor: "var(--secondary-color)",
        fontFamily: "var(--font-family)",
      }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="md:text-2xl font-bold text-white">
          🎨 CSS Gradient Generator
        </h1>
        <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700"
          >
            {showGuide ? "Hide Guide" : "Show Guide"}
          </button>
          <button
            onClick={copyCss}
            className="px-3 py-1.5 rounded-lg text-sm font-medium"
            style={{ backgroundColor: "var(--accent-color)" }}
          >
            Copy CSS
          </button>
          <button
            onClick={clearAll}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-red-600 hover:bg-red-700"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Usage Guide */}
      {showGuide && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
          <h3 className="font-semibold mb-3 text-blue-300 flex items-center">
            📚 How to Use CSS Gradient Generator
          </h3>
          <div className="space-y-4 text-sm text-gray-300">
            <div>
              <h4 className="font-medium text-white mb-1">
                1. Choose Gradient Type
              </h4>
              <p>
                • <strong>Linear</strong>: Straight line gradients (most common)
              </p>
              <p>
                • <strong>Radial</strong>: Circular/elliptical gradients from
                center
              </p>
              <p>
                • <strong>Conic</strong>: Circular gradients around a point
                (modern browsers)
              </p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">2. Set Direction</h4>
              <p>
                • <strong>Linear</strong>: to right, to bottom, 45deg, etc.
              </p>
              <p>
                • <strong>Radial</strong>: circle, ellipse, circle at center,
                etc.
              </p>
              <p>
                • <strong>Conic</strong>: from angle, at position
              </p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">
                3. Add & Customize Colors
              </h4>
              <p>• Click color swatches to change colors</p>
              <p>• Adjust position sliders to control color placement</p>
              <p>• Add more colors with "Add Color" button</p>
              <p>• Remove colors (minimum 2 required)</p>
            </div>
            <div className="p-3 bg-blue-900/30 border border-blue-700 rounded">
              <h4 className="font-medium text-blue-300 mb-1">💡 Pro Tips:</h4>
              <p>• Use 2-3 colors for clean, professional gradients</p>
              <p>• Consider color harmony and contrast</p>
              <p>• Test gradients on different background colors</p>
              <p>• Use gradients for buttons, cards, and hero sections</p>
            </div>
          </div>
        </div>
      )}

      {/* Presets */}
      <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
        <h3 className="font-semibold mb-3 text-gray-200">Quick Presets:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
          {presets.map((preset, index) => {
            const colorStops = preset.colors
              .map((c) => `${c.color} ${c.position}%`)
              .join(", ");
            let gradientStyle = "";

            if (preset.type === "linear") {
              gradientStyle = `linear-gradient(${preset.direction}, ${colorStops})`;
            } else if (preset.type === "radial") {
              gradientStyle = `radial-gradient(${preset.direction}, ${colorStops})`;
            } else if (preset.type === "conic") {
              gradientStyle = `conic-gradient(${preset.direction}, ${colorStops})`;
            }

            return (
              <button
                key={index}
                onClick={() => applyPreset(preset)}
                className="relative p-2 rounded-lg text-xs font-medium text-white hover:scale-105 transition-transform border border-gray-600 hover:border-gray-400"
                style={{ background: gradientStyle }}
              >
                <div className="bg-black bg-opacity-50 rounded px-2 py-1">
                  {preset.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Controls */}
        <div className="space-y-4">
          {/* Gradient Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Gradient Type
            </label>
            <select
              value={gradientType}
              onChange={(e) => setGradientType(e.target.value)}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-sm text-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
              <option value="conic">Conic</option>
            </select>
          </div>

          {/* Direction */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Direction
            </label>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-sm text-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
            >
              {gradientType === "linear" && (
                <>
                  <option value="to right">To Right</option>
                  <option value="to left">To Left</option>
                  <option value="to bottom">To Bottom</option>
                  <option value="to top">To Top</option>
                  <option value="to bottom right">To Bottom Right</option>
                  <option value="to bottom left">To Bottom Left</option>
                  <option value="to top right">To Top Right</option>
                  <option value="to top left">To Top Left</option>
                  <option value="custom">Custom Angle</option>
                </>
              )}
              {gradientType === "radial" && (
                <>
                  <option value="circle">Circle</option>
                  <option value="ellipse">Ellipse</option>
                  <option value="circle at center">Circle at Center</option>
                  <option value="circle at top">Circle at Top</option>
                  <option value="circle at bottom">Circle at Bottom</option>
                  <option value="circle at left">Circle at Left</option>
                  <option value="circle at right">Circle at Right</option>
                </>
              )}
              {gradientType === "conic" && (
                <>
                  <option value="from 0deg">From 0deg</option>
                  <option value="from 45deg">From 45deg</option>
                  <option value="from 90deg">From 90deg</option>
                  <option value="from 180deg">From 180deg</option>
                  <option value="custom">Custom Angle</option>
                </>
              )}
            </select>
          </div>

          {/* Custom Angle */}
          {direction === "custom" && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Angle: {angle}°
              </label>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          )}

          {/* Colors */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-300">
                Colors ({colors.length})
              </label>
              <button
                onClick={addColor}
                className="px-2 py-1 text-xs bg-green-600 hover:bg-green-700 rounded-md"
              >
                Add Color
              </button>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg"
                >
                  <input
                    type="color"
                    value={color.color}
                    onChange={(e) =>
                      updateColor(index, "color", e.target.value)
                    }
                    className="w-12 h-8 rounded cursor-pointer"
                  />
                  <div className="flex-1">
                    <label className="block text-xs text-gray-400 mb-1">
                      Position: {color.position}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={color.position}
                      onChange={(e) =>
                        updateColor(index, "position", parseInt(e.target.value))
                      }
                      className="w-full"
                    />
                  </div>
                  <button
                    onClick={() => removeColor(index)}
                    disabled={colors.length <= 2}
                    className="px-2 py-1 text-xs bg-red-600 hover:bg-red-700 rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview and CSS */}
        <div className="space-y-4">
          {/* Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Preview
            </label>
            <div
              className="w-full h-64 rounded-lg border border-gray-600"
              style={{ background: generateGradient() }}
            ></div>
          </div>

          {/* CSS Code */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              CSS Code
            </label>
            <textarea
              readOnly
              value={cssCode}
              className="w-full h-32 p-3 border rounded-lg font-mono text-sm bg-gray-900 text-gray-100 resize-none custom-scrollbar"
              style={{ borderColor: "var(--secondary-color)" }}
              placeholder="Generated CSS will appear here..."
            />
          </div>
        </div>
      </div>

      {/* Toast Notifications Container */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
          {notifications.map((notification) => (
            <ToastNotification
              key={notification.id}
              notification={notification}
              onRemove={removeNotification}
            />
          ))}
        </div>
      )}
    </div>
  );
}
