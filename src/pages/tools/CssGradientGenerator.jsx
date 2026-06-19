import { useState, useEffect } from "react";
import { Card, CardHeader } from "../../components/ui/Card.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { Textarea } from "../../components/ui/Textarea.jsx";
import { Select } from "../../components/ui/Select.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { useClipboard } from "../../hooks/useClipboard.js";
import { FaPalette, FaBook, FaPlus, FaTrash } from "react-icons/fa";

export default function CssGradientGenerator() {
  const [gradientType, setGradientType] = useState("linear");
  const [direction, setDirection] = useState("to right");
  const [angle, setAngle] = useState(90);
  const [colors, setColors] = useState([
    { color: "#FF6B6B", position: 0 },
    { color: "#4ECDC4", position: 100 },
  ]);
  const [cssCode, setCssCode] = useState("");
  const [showGuide, setShowGuide] = useState(false);

  const { showToast } = useToast();
  const { copy } = useClipboard();

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

  // Generate CSS gradient code
  const generateGradient = () => {
    const colorStops = colors
      .slice()
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
  const copyCss = () => {
    if (!cssCode.trim()) {
      showToast("❌ No CSS to copy!", "error");
      return;
    }
    copy(cssCode, "CSS Gradient Styles");
  };

  // Add new color stop
  const addColor = () => {
    const newPosition =
      colors.length > 0 ? Math.max(...colors.map((c) => c.position)) + 10 : 50;
    setColors([
      ...colors,
      { color: "#847CFA", position: Math.min(newPosition, 100) },
    ]);
    showToast("Added new color swatch", "success");
  };

  // Remove color stop
  const removeColor = (index) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index));
      showToast("Removed color swatch", "success");
    } else {
      showToast("❌ You need at least 2 colors for a gradient!", "error");
    }
  };

  // Update color stop parameter
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
    showToast(`🎨 Applied "${preset.name}" preset!`, "success");
  };

  // Clear workspace
  const clearAll = () => {
    setGradientType("linear");
    setDirection("to right");
    setAngle(90);
    setColors([
      { color: "#FF6B6B", position: 0 },
      { color: "#4ECDC4", position: 100 },
    ]);
    showToast("Cleared gradient workspace", "success");
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <Card glow={true}>
        {/* Header Actions */}
        <CardHeader
          title="CSS Gradient Generator"
          icon={<FaPalette />}
          actions={
            <>
              <Button onClick={() => setShowGuide(!showGuide)} variant="outline" size="sm" icon={<FaBook />}>
                {showGuide ? "Hide Guide" : "Show Guide"}
              </Button>
              <Button onClick={copyCss} variant="primary" size="sm">
                Copy CSS
              </Button>
              <Button onClick={clearAll} variant="danger" size="sm">
                Clear
              </Button>
            </>
          }
        />

        {/* Usage Guide */}
        {showGuide && (
          <div className="mb-6 p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4 text-xs select-text leading-relaxed">
            <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2 font-brand select-none">
              📚 CSS Gradient Guide
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p>• <strong>Linear Gradients:</strong> Smooth color transitions along a straight path. Control directions via presets (To Right, To Bottom) or custom angles.</p>
                <p>• <strong>Radial Gradients:</strong> Color transitions emanating outwards in a circular or elliptical pattern from a central point.</p>
              </div>
              <div className="space-y-2">
                <p>• <strong>Conic Gradients:</strong> Colors rotate around a central origin point, creating a wheel/cone layout effect.</p>
                <p>• <strong>Position stops:</strong> Drag the position range bar to tweak how close colors merge into adjacent color ranges.</p>
              </div>
            </div>
          </div>
        )}

        {/* Presets List */}
        <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5 mb-6">
          <label className="block text-[11px] font-semibold text-slate-400 font-brand mb-3 select-none">
            Quick Preset Backgrounds:
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
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
                  className="relative p-2.5 rounded-lg text-xs font-semibold text-white hover:scale-[1.02] active:scale-95 transition-all border border-slate-800/80 cursor-pointer overflow-hidden min-h-[40px] flex items-center justify-center"
                  style={{ background: gradientStyle }}
                >
                  <span className="bg-black/60 backdrop-blur-xs rounded px-2 py-0.5 text-[9px] tracking-tight">
                    {preset.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Workspace Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls Left Column */}
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Gradient Type:"
                id="gradient-type"
                value={gradientType}
                onChange={(e) => setGradientType(e.target.value)}
                options={[
                  { value: "linear", label: "Linear" },
                  { value: "radial", label: "Radial" },
                  { value: "conic", label: "Conic" },
                ]}
              />

              <Select
                label="Direction / Shape:"
                id="gradient-direction"
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
                options={
                  gradientType === "linear"
                    ? [
                        { value: "to right", label: "To Right" },
                        { value: "to left", label: "To Left" },
                        { value: "to bottom", label: "To Bottom" },
                        { value: "to top", label: "To Top" },
                        { value: "to bottom right", label: "To Bottom Right" },
                        { value: "to bottom left", label: "To Bottom Left" },
                        { value: "to top right", label: "To Top Right" },
                        { value: "to top left", label: "To Top Left" },
                        { value: "custom", label: "Custom Angle" },
                      ]
                    : gradientType === "radial"
                    ? [
                        { value: "circle", label: "Circle" },
                        { value: "ellipse", label: "Ellipse" },
                        { value: "circle at center", label: "Circle at Center" },
                        { value: "circle at top", label: "Circle at Top" },
                        { value: "circle at bottom", label: "Circle at Bottom" },
                        { value: "circle at left", label: "Circle at Left" },
                        { value: "circle at right", label: "Circle at Right" },
                      ]
                    : [
                        { value: "from 0deg", label: "From 0deg" },
                        { value: "from 45deg", label: "From 45deg" },
                        { value: "from 90deg", label: "From 90deg" },
                        { value: "from 180deg", label: "From 180deg" },
                        { value: "custom", label: "Custom Angle" },
                      ]
                }
              />
            </div>

            {/* Custom Angle Range */}
            {direction === "custom" && (
              <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4">
                <div className="flex justify-between text-[11px] font-semibold text-slate-400 font-brand mb-1 select-none">
                  <span>Angle:</span>
                  <span className="text-[var(--accent-color)]">{angle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-[var(--accent-color)]"
                />
              </div>
            )}

            {/* Colors Swatches Editor */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4 select-none">
                <label className="block text-[11px] font-semibold text-slate-400 font-brand">
                  Color Swatches ({colors.length})
                </label>
                <Button onClick={addColor} variant="primary" size="sm" icon={<FaPlus />}>
                  Add Color
                </Button>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 bg-slate-900 border border-slate-800/60 rounded-xl"
                  >
                    <input
                      type="color"
                      value={color.color}
                      onChange={(e) => updateColor(index, "color", e.target.value)}
                      className="w-10 h-8 rounded border border-slate-850 cursor-pointer bg-transparent"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between text-[10px] text-slate-400 font-brand mb-1 select-none">
                        <span>Hex: <span className="font-mono text-white select-all">{color.color.toUpperCase()}</span></span>
                        <span>Stop: <span className="text-[var(--accent-color)] font-bold">{color.position}%</span></span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={color.position}
                        onChange={(e) => updateColor(index, "position", parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-[var(--accent-color)]"
                      />
                    </div>
                    <button
                      onClick={() => removeColor(index)}
                      disabled={colors.length <= 2}
                      className="p-2 bg-slate-950 hover:bg-rose-950 hover:text-rose-400 text-slate-500 rounded-lg border border-slate-850 hover:border-rose-900/60 transition-colors disabled:opacity-30 disabled:hover:bg-slate-950 disabled:hover:text-slate-500 disabled:hover:border-slate-850 disabled:cursor-not-allowed cursor-pointer"
                      title="Remove color swatch"
                    >
                      <FaTrash className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Viewport Preview & CSS Outputs Right Column */}
          <div className="space-y-5">
            {/* Live Preview block */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5">
              <label className="block text-[11px] font-semibold text-slate-400 font-brand mb-3 select-none">
                Live Output Preview
              </label>
              <div
                className="w-full h-64 rounded-xl border border-slate-800/80 shadow-inner"
                style={{ background: generateGradient() }}
              />
            </div>

            {/* Generated CSS codebox */}
            <div>
              <Textarea
                label="Generated CSS code:"
                id="gradient-css"
                value={cssCode}
                readOnly={true}
                placeholder="Gradient background CSS style rules..."
                rows={4}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
