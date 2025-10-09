import { useState, useRef } from "react";

const DEVICE_PRESETS = [
  // Desktop
  {
    name: "Desktop HD",
    width: 1920,
    height: 1080,
    category: "desktop",
    icon: "🖥️",
  },
  {
    name: "Desktop",
    width: 1366,
    height: 768,
    category: "desktop",
    icon: "🖥️",
  },
  {
    name: "Laptop",
    width: 1440,
    height: 900,
    category: "desktop",
    icon: "💻",
  },

  // Tablets
  {
    name: "iPad Pro",
    width: 1024,
    height: 1366,
    category: "tablet",
    icon: "📱",
  },
  {
    name: "iPad",
    width: 768,
    height: 1024,
    category: "tablet",
    icon: "📱",
  },
  {
    name: "iPad Mini",
    width: 768,
    height: 1024,
    category: "tablet",
    icon: "📱",
  },
  {
    name: "Surface Pro",
    width: 912,
    height: 1368,
    category: "tablet",
    icon: "📱",
  },

  // Mobile
  {
    name: "iPhone 14 Pro Max",
    width: 430,
    height: 932,
    category: "mobile",
    icon: "📱",
  },
  {
    name: "iPhone 14 Pro",
    width: 393,
    height: 852,
    category: "mobile",
    icon: "📱",
  },
  {
    name: "iPhone SE",
    width: 375,
    height: 667,
    category: "mobile",
    icon: "📱",
  },
  {
    name: "Samsung Galaxy S23",
    width: 360,
    height: 780,
    category: "mobile",
    icon: "📱",
  },
  {
    name: "Google Pixel 7",
    width: 412,
    height: 915,
    category: "mobile",
    icon: "📱",
  },
];

const ToastNotification = ({ notification, onDismiss }) => {
  const { id, message, type } = notification;

  const variants = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  return (
    <div
      className={`flex items-center p-4 mb-3 rounded-lg border shadow-lg transition-all duration-300 ${
        variants[type] || variants.info
      }`}
    >
      <div className="ml-3 text-sm font-medium flex-1">{message}</div>
      <button
        onClick={() => onDismiss(id)}
        className="ml-3 rounded-lg p-1 hover:bg-white/30"
      >
        ×
      </button>
    </div>
  );
};

export default function ResponsiveDesignTester() {
  const [url, setUrl] = useState("https://example.com");
  const [selectedDevice, setSelectedDevice] = useState(DEVICE_PRESETS[1]);
  const [customWidth, setCustomWidth] = useState(1366);
  const [customHeight, setCustomHeight] = useState(768);
  const [isLandscape, setIsLandscape] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showGuide, setShowGuide] = useState(false);
  const [key, setKey] = useState(0);
  const iframeRef = useRef(null);

  const showNotification = (message, type = "success") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getCurrentDimensions = () => {
    if (isCustomMode) {
      return isLandscape
        ? { width: customWidth, height: customHeight }
        : { width: customHeight, height: customWidth };
    }
    return isLandscape
      ? { width: selectedDevice.width, height: selectedDevice.height }
      : { width: selectedDevice.height, height: selectedDevice.width };
  };

  const handleDeviceSelect = (device) => {
    setSelectedDevice(device);
    setIsCustomMode(false);
    setIsLandscape(device.category !== "mobile");
  };

  const toggleOrientation = () => {
    setIsLandscape(!isLandscape);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const refreshIframe = () => {
    setKey((prev) => prev + 1);
    showNotification("Page refreshed", "success");
  };

  const copyDimensions = () => {
    const { width, height } = getCurrentDimensions();
    navigator.clipboard.writeText(`${width} × ${height}px`);
    showNotification("Dimensions copied to clipboard!", "success");
  };

  const loadUrl = () => {
    if (!url || url.trim() === "") {
      showNotification("Please enter a valid URL", "error");
      return;
    }

    let formattedUrl = url.trim();
    if (
      !formattedUrl.startsWith("http://") &&
      !formattedUrl.startsWith("https://")
    ) {
      formattedUrl = "https://" + formattedUrl;
    }

    setUrl(formattedUrl);
    setKey((prev) => prev + 1);
    showNotification("Loading website...", "info");
  };

  const { width, height } = getCurrentDimensions();
  const scale = isFullscreen
    ? 1
    : Math.min(
        1,
        (window.innerWidth - 100) / width,
        (window.innerHeight - 300) / height
      );

  const groupedDevices = DEVICE_PRESETS.reduce((acc, device) => {
    if (!acc[device.category]) acc[device.category] = [];
    acc[device.category].push(device);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 mt-8 mb-8 rounded-lg">
      {/* Toast Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
          {notifications.map((notification) => (
            <ToastNotification
              key={notification.id}
              notification={notification}
              onDismiss={removeNotification}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              📱 Responsive Design Tester
            </h1>
            <p className="text-gray-300">
              Test how your website looks on different devices and screen sizes
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
            <button
              onClick={() => setShowGuide((prev) => !prev)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              {showGuide ? "Hide Guide" : "Show Guide"}
            </button>
          </div>
        </div>

        {/* Usage Guide */}
        {showGuide && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-600 mb-6">
            <h3 className="font-semibold mb-3 text-blue-300 flex items-center">
              📚 How to Use Responsive Design Tester
            </h3>
            <div className="space-y-4 text-sm text-gray-300">
              <div>
                <h4 className="font-medium text-white mb-1">
                  1. Enter Website URL
                </h4>
                <p>
                  • Type or paste the website URL you want to test in the input
                  field.
                </p>
                <p>• Click "Load Website" or press Enter to load the site.</p>
                <p>
                  • The tool automatically adds https:// if no protocol is
                  specified.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">
                  2. Choose Device Size
                </h4>
                <p>
                  • Select from popular device presets (Desktop, Tablet,
                  Mobile).
                </p>
                <p>
                  • Each preset includes real device dimensions for accurate
                  testing.
                </p>
                <p>
                  • Use "Custom Mode" to set specific width and height
                  dimensions.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">
                  3. Test Orientations
                </h4>
                <p>• Toggle between Landscape and Portrait orientations.</p>
                <p>
                  • Mobile devices default to Portrait, others to Landscape.
                </p>
                <p>• Great for testing responsive breakpoints and layouts.</p>
              </div>
              <div className="p-3 bg-blue-900/30 border border-blue-700 rounded">
                <h4 className="font-medium text-blue-300 mb-1">
                  🖥️ Available Device Categories:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div>
                    <p className="font-medium text-white">Desktop</p>
                    <p>• Desktop HD (1920×1080)</p>
                    <p>• Standard Desktop (1366×768)</p>
                    <p>• Laptop (1440×900)</p>
                  </div>
                  <div>
                    <p className="font-medium text-white">Tablet</p>
                    <p>• iPad Pro (1024×1366)</p>
                    <p>• iPad (768×1024)</p>
                    <p>• Surface Pro (912×1368)</p>
                  </div>
                  <div>
                    <p className="font-medium text-white">Mobile</p>
                    <p>• iPhone 14 Pro Max (430×932)</p>
                    <p>• Samsung Galaxy S23 (360×780)</p>
                    <p>• iPhone SE (375×667)</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-green-900/30 border border-green-700 rounded">
                <h4 className="font-medium text-green-300 mb-1">
                  ⚡ Pro Tips:
                </h4>
                <p>
                  • Use Fullscreen mode for detailed testing without
                  distractions.
                </p>
                <p>• Copy dimensions to clipboard for development reference.</p>
                <p>• Refresh the iframe if a website doesn't load properly.</p>
                <p>
                  • Some sites block iframe embedding - this is normal security
                  behavior.
                </p>
                <p>
                  • Scale percentage shows if the preview is scaled down to fit
                  your screen.
                </p>
              </div>
              <div className="p-3 bg-purple-900/30 border border-purple-700 rounded">
                <h4 className="font-medium text-purple-300 mb-1">
                  🎯 Custom Mode Features:
                </h4>
                <p>• Set any width from 200px to 3000px.</p>
                <p>• Set any height from 200px to 3000px.</p>
                <p>• Perfect for testing specific CSS breakpoints.</p>
                <p>• Orientation toggle works with custom dimensions too.</p>
              </div>
            </div>
          </div>
        )}

        {/* URL Input */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website URL (e.g., https://example.com)"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                onKeyPress={(e) => e.key === "Enter" && loadUrl()}
              />
            </div>
            <button
              onClick={loadUrl}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              Load Website
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
          {/* Device Presets */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-3 text-blue-300">
              Device Presets
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(groupedDevices).map(([category, devices]) => (
                <div key={category}>
                  <h4 className="text-sm font-medium text-gray-400 mb-2 capitalize flex items-center gap-2">
                    {category === "desktop" && "🖥️"}
                    {category === "tablet" && "📱"}
                    {category === "mobile" && "📱"}
                    {category}
                  </h4>
                  <div className="space-y-1">
                    {devices.map((device) => (
                      <button
                        key={device.name}
                        onClick={() => handleDeviceSelect(device)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedDevice.name === device.name && !isCustomMode
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{device.name}</span>
                          <span className="text-xs text-gray-400">
                            {device.width}×{device.height}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Size */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-3 text-purple-300">
              Custom Size
            </h3>
            <div className="flex flex-wrap gap-3 items-center">
              <button
                onClick={() => setIsCustomMode(!isCustomMode)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isCustomMode
                    ? "bg-purple-600 text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                }`}
              >
                Custom Mode
              </button>
              {isCustomMode && (
                <>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-300">Width:</label>
                    <input
                      type="number"
                      value={customWidth}
                      onChange={(e) => setCustomWidth(Number(e.target.value))}
                      className="w-20 px-2 py-1 bg-gray-900 border border-gray-600 rounded text-white text-sm"
                      min="200"
                      max="3000"
                    />
                    <span className="text-gray-400 text-sm">px</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-300">Height:</label>
                    <input
                      type="number"
                      value={customHeight}
                      onChange={(e) => setCustomHeight(Number(e.target.value))}
                      className="w-20 px-2 py-1 bg-gray-900 border border-gray-600 rounded text-white text-sm"
                      min="200"
                      max="3000"
                    />
                    <span className="text-gray-400 text-sm">px</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={toggleOrientation}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              🔄 {isLandscape ? "Portrait" : "Landscape"}
            </button>
            <button
              onClick={toggleFullscreen}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              {isFullscreen ? "🔙" : "⛶"}{" "}
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </button>
            <button
              onClick={refreshIframe}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              🔄 Refresh
            </button>
            <button
              onClick={copyDimensions}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              📋 Copy Size
            </button>
          </div>
        </div>

        {/* Device Info */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-blue-400">📐</span>
              <span className="text-gray-300">
                Size:{" "}
                <span className="text-white font-medium">
                  {width} × {height}px
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">🔄</span>
              <span className="text-gray-300">
                Orientation:{" "}
                <span className="text-white font-medium">
                  {isLandscape ? "Landscape" : "Portrait"}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-400">🖥️</span>
              <span className="text-gray-300">
                Device:{" "}
                <span className="text-white font-medium">
                  {isCustomMode ? "Custom" : selectedDevice.name}
                </span>
              </span>
            </div>
            {scale < 1 && (
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">🔍</span>
                <span className="text-gray-300">
                  Scale:{" "}
                  <span className="text-white font-medium">
                    {Math.round(scale * 100)}%
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Preview Frame */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-center">
            <div
              className={`bg-gray-900 border-8 border-gray-700 rounded-lg overflow-hidden shadow-2xl ${
                isFullscreen ? "fixed inset-4 z-40" : ""
              }`}
              style={{
                width: isFullscreen ? "calc(100vw - 2rem)" : width * scale,
                height: isFullscreen ? "calc(100vh - 2rem)" : height * scale,
              }}
            >
              {isFullscreen && (
                <div className="absolute top-2 right-2 z-50">
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg"
                  >
                    ✕
                  </button>
                </div>
              )}
              <iframe
                key={key}
                ref={iframeRef}
                src={url}
                className="w-full h-full border-0"
                title="Responsive Preview"
                loading="lazy"
                sandbox="allow-same-origin allow-scripts allow-forms allow-links allow-popups"
                onLoad={() =>
                  showNotification("Website loaded successfully", "success")
                }
                onError={() =>
                  showNotification("Failed to load website", "error")
                }
              />
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 bg-blue-900/20 border border-blue-700 rounded-lg p-4">
          <h3 className="font-semibold mb-2 text-blue-300">💡 Tips:</h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>
              • Use the orientation toggle to test both portrait and landscape
              modes
            </li>
            <li>• Try different device presets to see how your site adapts</li>
            <li>• Use custom mode for testing specific breakpoints</li>
            <li>
              • Some websites may block iframe embedding for security reasons
            </li>
            <li>• Use fullscreen mode for a better testing experience</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
