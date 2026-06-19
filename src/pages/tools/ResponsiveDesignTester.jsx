import { useState, useRef } from "react";
import { Card, CardHeader } from "../../components/ui/Card.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { Input } from "../../components/ui/Input.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { useClipboard } from "../../hooks/useClipboard.js";
import {
  FaMobileAlt,
  FaDesktop,
  FaTabletAlt,
  FaSync,
  FaCopy,
  FaExpand,
  FaTimes,
  FaGlobe,
  FaInfoCircle
} from "react-icons/fa";

const DEVICE_PRESETS = [
  // Desktop
  { name: "Desktop HD", width: 1920, height: 1080, category: "desktop", icon: <FaDesktop /> },
  { name: "Desktop Standard", width: 1366, height: 768, category: "desktop", icon: <FaDesktop /> },
  { name: "Laptop Pro", width: 1440, height: 900, category: "desktop", icon: <FaDesktop /> },

  // Tablets
  { name: "iPad Pro", width: 1024, height: 1366, category: "tablet", icon: <FaTabletAlt /> },
  { name: "iPad Air", width: 768, height: 1024, category: "tablet", icon: <FaTabletAlt /> },
  { name: "Surface Pro", width: 912, height: 1368, category: "tablet", icon: <FaTabletAlt /> },

  // Mobile
  { name: "iPhone 14 Pro Max", width: 430, height: 932, category: "mobile", icon: <FaMobileAlt /> },
  { name: "iPhone 14 Pro", width: 393, height: 852, category: "mobile", icon: <FaMobileAlt /> },
  { name: "iPhone SE", width: 375, height: 667, category: "mobile", icon: <FaMobileAlt /> },
  { name: "Galaxy S23 Ultra", width: 360, height: 780, category: "mobile", icon: <FaMobileAlt /> },
  { name: "Google Pixel 7", width: 412, height: 915, category: "mobile", icon: <FaMobileAlt /> }
];

export default function ResponsiveDesignTester() {
  const [url, setUrl] = useState("https://example.com");
  const [activeUrl, setActiveUrl] = useState("https://example.com");
  const [selectedDevice, setSelectedDevice] = useState(DEVICE_PRESETS[1]);
  const [customWidth, setCustomWidth] = useState(1200);
  const [customHeight, setCustomHeight] = useState(800);
  const [isLandscape, setIsLandscape] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [key, setKey] = useState(0);
  const iframeRef = useRef(null);

  const { showToast } = useToast();
  const { copy } = useClipboard();

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
    showToast(`Preset loaded: ${device.name}`, "info");
  };

  const toggleOrientation = () => {
    setIsLandscape(!isLandscape);
    showToast(`Oriented to ${!isLandscape ? "Landscape" : "Portrait"}`, "info");
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const refreshIframe = () => {
    setKey((prev) => prev + 1);
    showToast("Preview frame reloaded", "success");
  };

  const copyDimensions = () => {
    const { width, height } = getCurrentDimensions();
    copy(`${width} × ${height}px`, "Dimensions");
  };

  const loadUrl = () => {
    if (!url || url.trim() === "") {
      showToast("❌ Please enter a valid URL", "error");
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
    setActiveUrl(formattedUrl);
    setKey((prev) => prev + 1);
    showToast("Connecting and loading target site...", "info");
  };

  const { width, height } = getCurrentDimensions();
  
  // Responsive zoom calculation
  const scale = isFullscreen
    ? 1
    : Math.min(
        1,
        (window.innerWidth - 350) / width,
        (window.innerHeight - 450) / height
      );

  const groupedDevices = DEVICE_PRESETS.reduce((acc, device) => {
    if (!acc[device.category]) acc[device.category] = [];
    acc[device.category].push(device);
    return acc;
  }, {});

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <Card glow={true}>
        {/* Header */}
        <CardHeader
          title="Responsive Design Tester"
          icon={<FaMobileAlt />}
          actions={
            <Button
              onClick={() => setShowGuide(!showGuide)}
              variant="secondary"
              size="sm"
            >
              {showGuide ? "Hide Guide" : "Show Guide"}
            </Button>
          }
        />

        {/* Guide */}
        {showGuide && (
          <div className="mb-6 p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3 text-xs leading-relaxed text-slate-300">
            <h3 className="font-semibold text-sm text-[var(--accent-color)] flex items-center gap-2">
              📚 Responsive Design Testing Guide
            </h3>
            <p>
              • <strong>Iframe Security Note:</strong> Some websites (like Google, GitHub, or YouTube) send headers that block embedding inside iframes (<code>X-Frame-Options: SAMEORIGIN</code>). This is standard browser security behavior.
            </p>
            <p>
              • <strong>Custom Viewports:</strong> Click "Custom Mode" to enter specific width/height dimensions. Handy for testing edge responsive breakpoints.
            </p>
            <p>
              • <strong>Zoom Scaling:</strong> The preview frame scales down automatically to fit your browser workspace. Check the scale badge in the status bar to verify the current ratio.
            </p>
          </div>
        )}

        {/* URL Input Bar */}
        <div className="mb-6 bg-slate-900/50 border border-slate-800/85 p-4 rounded-xl">
          <div className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1 w-full">
              <Input
                label="Target Website URL"
                id="url-input"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website URL (e.g. https://example.com)"
                onKeyPress={(e) => e.key === "Enter" && loadUrl()}
              />
            </div>
            <Button
              onClick={loadUrl}
              variant="primary"
              className="w-full sm:w-auto h-[38px] shrink-0"
              icon={<FaGlobe />}
            >
              Load Website
            </Button>
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          {/* Device Presets (Takes 3 cols) */}
          <div className="md:col-span-3 bg-slate-900/40 border border-slate-800/60 rounded-xl p-5">
            <h3 className="text-xs font-semibold text-slate-400 mb-4 select-none">
              Device Presets
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Object.entries(groupedDevices).map(([category, devices]) => (
                <div key={category} className="space-y-2">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider select-none flex items-center gap-1.5">
                    {category === "desktop" && <FaDesktop className="text-[9px]" />}
                    {category === "tablet" && <FaTabletAlt className="text-[9px]" />}
                    {category === "mobile" && <FaMobileAlt className="text-[9px]" />}
                    {category}
                  </h4>
                  <div className="flex flex-col gap-1">
                    {devices.map((device) => {
                      const isActive = selectedDevice.name === device.name && !isCustomMode;
                      return (
                        <button
                          key={device.name}
                          onClick={() => handleDeviceSelect(device)}
                          className={`w-full text-left px-3 py-1.5 rounded-lg transition-all text-xs font-medium flex items-center justify-between border cursor-pointer ${
                            isActive
                              ? "bg-[var(--accent-color)] text-white border-transparent shadow-sm"
                              : "bg-slate-950 border-slate-900 text-slate-300 hover:text-white hover:border-slate-800"
                          }`}
                        >
                          <span className="truncate">{device.name}</span>
                          <span className={`text-[9px] ${isActive ? "text-white/80" : "text-slate-500"} font-mono`}>
                            {device.width}×{device.height}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom controls (Takes 1 col) */}
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-5 flex flex-col gap-4">
            <div>
              <h3 className="text-xs font-semibold text-slate-400 mb-3 select-none">
                Custom Viewport
              </h3>
              <Button
                onClick={() => {
                  setIsCustomMode(!isCustomMode);
                  showToast(isCustomMode ? "Preset mode enabled" : "Custom mode enabled", "info");
                }}
                variant={isCustomMode ? "primary" : "secondary"}
                size="sm"
                className="w-full"
              >
                {isCustomMode ? "Active: Custom" : "Enable Custom Mode"}
              </Button>
            </div>

            {isCustomMode && (
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="Width (px)"
                  id="custom-w"
                  type="number"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(Math.max(200, Number(e.target.value)))}
                  min="200"
                  max="3000"
                />
                <Input
                  label="Height (px)"
                  id="custom-h"
                  type="number"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(Math.max(200, Number(e.target.value)))}
                  min="200"
                  max="3000"
                />
              </div>
            )}
          </div>
        </div>

        {/* Quick Toolbar & Status Indicators */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900/30 border border-slate-800/50 px-5 py-3 rounded-xl mb-6 select-none">
          <div className="flex flex-wrap gap-1.5">
            <Button
              onClick={toggleOrientation}
              variant="secondary"
              size="sm"
            >
              🔄 Flip ({isLandscape ? "Landscape" : "Portrait"})
            </Button>
            <Button
              onClick={refreshIframe}
              variant="secondary"
              size="sm"
              icon={<FaSync />}
            >
              Reload Frame
            </Button>
            <Button
              onClick={copyDimensions}
              variant="secondary"
              size="sm"
              icon={<FaCopy />}
            >
              Copy Size
            </Button>
            <Button
              onClick={toggleFullscreen}
              variant="secondary"
              size="sm"
              icon={<FaExpand />}
            >
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"}
            </Button>
          </div>

          <div className="flex flex-wrap gap-4 text-[10px] text-slate-400 font-mono">
            <div className="flex items-center gap-1">
              <span className="text-slate-600">Preset:</span>
              <span className="text-white font-semibold">{isCustomMode ? "Custom Mode" : selectedDevice.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-slate-600">Viewport:</span>
              <span className="text-[var(--accent-color)] font-bold">{width} × {height}px</span>
            </div>
            {scale < 1 && (
              <div className="flex items-center gap-1">
                <span className="text-slate-600">Scale:</span>
                <span className="text-amber-500 font-semibold">{Math.round(scale * 100)}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Iframe Viewport Container */}
        <div className="bg-slate-950 border border-slate-900 rounded-xl p-6 flex items-center justify-center relative overflow-hidden min-h-[500px]">
          {/* Main Frame */}
          <div
            className={`transition-all duration-300 ${
              isFullscreen
                ? "fixed inset-0 z-50 bg-slate-950 p-6 flex flex-col justify-center items-center"
                : ""
            }`}
          >
            {isFullscreen && (
              <div className="absolute top-4 right-4 z-50">
                <button
                  onClick={toggleFullscreen}
                  className="p-2.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-lg shadow-xl hover:bg-slate-850 cursor-pointer"
                  title="Close Fullscreen"
                >
                  <FaTimes />
                </button>
              </div>
            )}

            <div
              className="bg-slate-900 border-[8px] border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative transition-all duration-200"
              style={{
                width: isFullscreen ? "100%" : width * scale,
                height: isFullscreen ? "100%" : height * scale,
                transform: isFullscreen ? "none" : `scale(1)`,
                transformOrigin: "center center"
              }}
            >
              <iframe
                key={key}
                ref={iframeRef}
                src={activeUrl}
                className="w-full h-full border-0 bg-white"
                title="Responsive Preview Frame"
                loading="lazy"
                sandbox="allow-same-origin allow-scripts allow-forms allow-links allow-popups"
                onLoad={() => showToast("Website Loaded successfully", "success")}
              />
            </div>
          </div>
        </div>

        {/* Professional Pro Tips Panel */}
        <div className="mt-6 p-4 bg-slate-900/20 border border-slate-800/40 rounded-xl flex gap-3 text-slate-400">
          <FaInfoCircle className="text-base text-[var(--accent-color)] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-slate-300 select-none">Pro-Tips & Debugging:</h4>
            <ul className="text-[10px] space-y-1 leading-relaxed">
              <li>• <strong>CORS / Frame Policies:</strong> Iframe-blocking is a server security design (<code>CSP frame-ancestors</code> policy). If a site fails to render, check the console output.</li>
              <li>• <strong>Local Host Testing:</strong> If you are testing local servers (e.g. <code>http://localhost:3000</code>), make sure the server is actively running and you include the HTTP protocol.</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
