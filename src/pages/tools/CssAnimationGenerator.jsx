import React, { useState, useEffect } from "react";
import { FaPlay, FaPause, FaRedo, FaCopy, FaDownload } from "react-icons/fa";

const CssAnimationGenerator = () => {
  const [animationName, setAnimationName] = useState("customAnimation");
  const [duration, setDuration] = useState(2);
  const [timingFunction, setTimingFunction] = useState("ease-in-out");
  const [delay, setDelay] = useState(0);
  const [iterationCount, setIterationCount] = useState("infinite");
  const [direction, setDirection] = useState("normal");
  const [fillMode, setFillMode] = useState("both");
  const [keyframes, setKeyframes] = useState([
    {
      percentage: 0,
      transform: "translateX(0px) rotate(0deg) scale(1)",
      opacity: 1,
    },
    {
      percentage: 50,
      transform: "translateX(100px) rotate(180deg) scale(1.2)",
      opacity: 0.8,
    },
    {
      percentage: 100,
      transform: "translateX(0px) rotate(360deg) scale(1)",
      opacity: 1,
    },
  ]);
  const [selectedProperty, setSelectedProperty] = useState("transform");
  const [isPlaying, setIsPlaying] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [showGuide, setShowGuide] = useState(false);

  // Animation presets
  const presets = [
    {
      name: "Bounce",
      keyframes: [
        { percentage: 0, transform: "translateY(0px)", opacity: 1 },
        { percentage: 25, transform: "translateY(-30px)", opacity: 1 },
        { percentage: 50, transform: "translateY(0px)", opacity: 1 },
        { percentage: 75, transform: "translateY(-15px)", opacity: 1 },
        { percentage: 100, transform: "translateY(0px)", opacity: 1 },
      ],
      duration: 1,
      timingFunction: "ease-in-out",
    },
    {
      name: "Fade In",
      keyframes: [
        { percentage: 0, transform: "scale(0.8)", opacity: 0 },
        { percentage: 100, transform: "scale(1)", opacity: 1 },
      ],
      duration: 0.8,
      timingFunction: "ease-out",
    },
    {
      name: "Slide In Right",
      keyframes: [
        { percentage: 0, transform: "translateX(100px)", opacity: 0 },
        { percentage: 100, transform: "translateX(0px)", opacity: 1 },
      ],
      duration: 0.6,
      timingFunction: "ease-out",
    },
    {
      name: "Pulse",
      keyframes: [
        { percentage: 0, transform: "scale(1)", opacity: 1 },
        { percentage: 50, transform: "scale(1.1)", opacity: 0.8 },
        { percentage: 100, transform: "scale(1)", opacity: 1 },
      ],
      duration: 1.5,
      timingFunction: "ease-in-out",
    },
    {
      name: "Rotate",
      keyframes: [
        { percentage: 0, transform: "rotate(0deg)", opacity: 1 },
        { percentage: 100, transform: "rotate(360deg)", opacity: 1 },
      ],
      duration: 2,
      timingFunction: "linear",
    },
    {
      name: "Shake",
      keyframes: [
        { percentage: 0, transform: "translateX(0px)", opacity: 1 },
        { percentage: 10, transform: "translateX(-10px)", opacity: 1 },
        { percentage: 20, transform: "translateX(10px)", opacity: 1 },
        { percentage: 30, transform: "translateX(-10px)", opacity: 1 },
        { percentage: 40, transform: "translateX(10px)", opacity: 1 },
        { percentage: 50, transform: "translateX(-10px)", opacity: 1 },
        { percentage: 60, transform: "translateX(10px)", opacity: 1 },
        { percentage: 70, transform: "translateX(-10px)", opacity: 1 },
        { percentage: 80, transform: "translateX(10px)", opacity: 1 },
        { percentage: 90, transform: "translateX(-10px)", opacity: 1 },
        { percentage: 100, transform: "translateX(0px)", opacity: 1 },
      ],
      duration: 0.8,
      timingFunction: "ease-in-out",
    },
  ];

  const timingFunctions = [
    "ease",
    "ease-in",
    "ease-out",
    "ease-in-out",
    "linear",
    "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
    "cubic-bezier(0.215, 0.61, 0.355, 1)",
  ];

  const directions = ["normal", "reverse", "alternate", "alternate-reverse"];
  const fillModes = ["none", "forwards", "backwards", "both"];

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

  // Generate CSS code
  const generateCSS = () => {
    const keyframeCSS = keyframes
      .map(
        (kf) =>
          `  ${kf.percentage}% {\n    transform: ${kf.transform};\n    opacity: ${kf.opacity};\n  }`
      )
      .join("\n");

    const animationCSS = `@keyframes ${animationName} {
${keyframeCSS}
}

.animated-element {
  animation: ${animationName} ${duration}s ${timingFunction} ${delay}s ${iterationCount} ${direction} ${fillMode};
}`;

    return animationCSS;
  };

  // Apply preset
  const applyPreset = (preset) => {
    setKeyframes(preset.keyframes);
    setDuration(preset.duration);
    setTimingFunction(preset.timingFunction);
    setAnimationName(preset.name.toLowerCase().replace(/\s+/g, ""));
  };

  // Add keyframe
  const addKeyframe = () => {
    const newKeyframe = {
      percentage: 50,
      transform: "translateX(0px) rotate(0deg) scale(1)",
      opacity: 1,
    };
    setKeyframes(
      [...keyframes, newKeyframe].sort((a, b) => a.percentage - b.percentage)
    );
  };

  // Remove keyframe
  const removeKeyframe = (index) => {
    if (keyframes.length > 2) {
      setKeyframes(keyframes.filter((_, i) => i !== index));
    }
  };

  // Update keyframe
  const updateKeyframe = (index, field, value) => {
    const updatedKeyframes = [...keyframes];
    updatedKeyframes[index] = { ...updatedKeyframes[index], [field]: value };
    if (field === "percentage") {
      updatedKeyframes.sort((a, b) => a.percentage - b.percentage);
    }
    setKeyframes(updatedKeyframes);
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateCSS());
      showNotification("CSS code copied to clipboard! 🎉", "success");
    } catch (err) {
      console.error("Failed to copy: ", err);
      showNotification("Failed to copy CSS code", "error");
    }
  };

  // Download CSS file
  const downloadCSS = () => {
    const css = generateCSS();
    const blob = new Blob([css], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${animationName}.css`;
    a.click();
    URL.revokeObjectURL(url);
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
          <h1 className="text-2xl font-bold text-white">
            🎬 CSS Animation Generator
          </h1>
          <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700"
            >
              {showGuide ? "Hide Guide" : "Show Guide"}
            </button>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1.5 rounded-lg text-sm font-medium"
              style={{ backgroundColor: "var(--accent-color)" }}
            >
              Copy CSS
            </button>
            <button
              onClick={downloadCSS}
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
              📚 How to Use CSS Animation Generator
            </h3>
            <div className="space-y-4 text-sm text-gray-300">
              <div>
                <h4 className="font-medium text-white mb-1">
                  1. Choose Animation Settings
                </h4>
                <p>
                  • <strong>Duration</strong>: How long the animation takes to
                  complete
                </p>
                <p>
                  • <strong>Timing Function</strong>: Controls acceleration
                  (ease, linear, cubic-bezier)
                </p>
                <p>
                  • <strong>Iteration Count</strong>: How many times to repeat
                  (infinite, 1, 2, etc.)
                </p>
                <p>
                  • <strong>Direction</strong>: normal, reverse, alternate,
                  alternate-reverse
                </p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">
                  2. Use Presets or Create Custom
                </h4>
                <p>
                  • Start with presets like Bounce, Fade In, Slide In Right,
                  Pulse, Rotate, or Shake
                </p>
                <p>• Create custom animations by editing keyframes manually</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">
                  3. Edit Keyframes
                </h4>
                <p>• Add keyframes at different percentages (0% to 100%)</p>
                <p>
                  • Modify transform properties: translateX/Y, rotate, scale,
                  skew
                </p>
                <p>• Adjust opacity for fade effects</p>
                <p>• Remove keyframes (minimum 2 required)</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">
                  4. Preview &amp; Export
                </h4>
                <p>• Watch live preview with play/pause/restart controls</p>
                <p>• Copy generated CSS to clipboard</p>
                <p>• Download as .css file for your projects</p>
              </div>
              <div className="p-3 bg-blue-900/30 border border-blue-700 rounded">
                <h4 className="font-medium text-blue-300 mb-1">
                  💡 Transform Examples:
                </h4>
                <p>
                  • <code>translateX(100px)</code> - Move 100px right
                </p>
                <p>
                  • <code>translateY(-50px)</code> - Move 50px up
                </p>
                <p>
                  • <code>rotate(45deg)</code> - Rotate 45 degrees
                </p>
                <p>
                  • <code>scale(1.5)</code> - Make 1.5x larger
                </p>
                <p>
                  • <code>skew(10deg, 5deg)</code> - Skew on X and Y axis
                </p>
                <p>
                  • Combine multiple:{" "}
                  <code>translateX(50px) rotate(45deg) scale(1.3)</code>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Animation Settings */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-blue-400">
                Animation Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Animation Name
                  </label>
                  <input
                    type="text"
                    value={animationName}
                    onChange={(e) => setAnimationName(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Duration (seconds)
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={duration}
                    onChange={(e) => setDuration(parseFloat(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Timing Function
                  </label>
                  <select
                    value={timingFunction}
                    onChange={(e) => setTimingFunction(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  >
                    {timingFunctions.map((func) => (
                      <option key={func} value={func}>
                        {func}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Delay (seconds)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={delay}
                    onChange={(e) => setDelay(parseFloat(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Iteration Count
                  </label>
                  <input
                    type="text"
                    value={iterationCount}
                    onChange={(e) => setIterationCount(e.target.value)}
                    placeholder="infinite or number"
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Direction
                  </label>
                  <select
                    value={direction}
                    onChange={(e) => setDirection(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  >
                    {directions.map((dir) => (
                      <option key={dir} value={dir}>
                        {dir}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Fill Mode
                  </label>
                  <select
                    value={fillMode}
                    onChange={(e) => setFillMode(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  >
                    {fillModes.map((mode) => (
                      <option key={mode} value={mode}>
                        {mode}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Presets */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-purple-400">
                Animation Presets
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {presets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyPreset(preset)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Keyframes Editor */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-green-400">Keyframes</h3>
                <button
                  onClick={addKeyframe}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  Add Keyframe
                </button>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                {keyframes.map((keyframe, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 rounded-lg p-4 border border-gray-600"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium">
                        Keyframe at {keyframe.percentage}%
                      </span>
                      {keyframes.length > 2 && (
                        <button
                          onClick={() => removeKeyframe(index)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium mb-1">
                          Percentage
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={keyframe.percentage}
                          onChange={(e) =>
                            updateKeyframe(
                              index,
                              "percentage",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full bg-gray-600 border border-gray-500 rounded px-2 py-1 text-white text-sm focus:border-blue-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium mb-1">
                          Opacity
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="1"
                          step="0.1"
                          value={keyframe.opacity}
                          onChange={(e) =>
                            updateKeyframe(
                              index,
                              "opacity",
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full bg-gray-600 border border-gray-500 rounded px-2 py-1 text-white text-sm focus:border-blue-500 focus:outline-none"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium mb-1">
                          Transform
                        </label>
                        <input
                          type="text"
                          value={keyframe.transform}
                          onChange={(e) =>
                            updateKeyframe(index, "transform", e.target.value)
                          }
                          className="w-full bg-gray-600 border border-gray-500 rounded px-2 py-1 text-white text-sm focus:border-blue-500 focus:outline-none"
                          placeholder="translateX(0px) rotate(0deg) scale(1)"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview and Code Panel */}
          <div className="space-y-6">
            {/* Preview */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-yellow-400">
                  Live Preview
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center gap-2"
                  >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                    {isPlaying ? "Pause" : "Play"}
                  </button>
                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      setTimeout(() => setIsPlaying(true), 100);
                    }}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center gap-2"
                  >
                    <FaRedo />
                    Restart
                  </button>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-8 min-h-48 flex items-center justify-center">
                <div
                  className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"
                  style={{
                    animation: isPlaying
                      ? `${animationName} ${duration}s ${timingFunction} ${delay}s ${iterationCount} ${direction} ${fillMode}`
                      : "none",
                  }}
                />
              </div>

              <style>
                {`
                  @keyframes ${animationName} {
                    ${keyframes
                      .map(
                        (kf) => `
                      ${kf.percentage}% {
                        transform: ${kf.transform};
                        opacity: ${kf.opacity};
                      }
                    `
                      )
                      .join("")}
                  }
                `}
              </style>
            </div>

            {/* Generated CSS */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-orange-400">
                  Generated CSS
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center gap-2"
                  >
                    <FaCopy />
                    Copy
                  </button>
                  <button
                    onClick={downloadCSS}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center gap-2"
                  >
                    <FaDownload />
                    Download
                  </button>
                </div>
              </div>

              <pre className="bg-gray-900 text-left rounded-lg p-4 text-sm overflow-x-auto text-green-400 border border-gray-600 custom-scrollbar">
                <code>{generateCSS()}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CssAnimationGenerator;
