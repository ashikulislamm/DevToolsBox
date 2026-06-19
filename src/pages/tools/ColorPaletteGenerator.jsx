import React, { useState, useEffect } from "react";
import { Card, CardHeader } from "../../components/ui/Card.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { Textarea } from "../../components/ui/Textarea.jsx";
import { Select } from "../../components/ui/Select.jsx";
import { Input } from "../../components/ui/Input.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { useClipboard } from "../../hooks/useClipboard.js";
import { exportToFile } from "../../utils/fileExport.js";
import { 
  FaPalette, FaCopy, FaRandom, FaDownload, FaPlus, FaMinus, FaLock, FaUnlock, FaBook 
} from "react-icons/fa";

export default function ColorPaletteGenerator() {
  const [colors, setColors] = useState([
    { hex: "#3B82F6", locked: false },
    { hex: "#8B5CF6", locked: false },
    { hex: "#EF4444", locked: false },
    { hex: "#10B981", locked: false },
    { hex: "#F59E0B", locked: false },
  ]);
  const [harmony, setHarmony] = useState("complementary");
  const [baseColor, setBaseColor] = useState("#3B82F6");
  const [showGuide, setShowGuide] = useState(false);
  const [exportFormat, setExportFormat] = useState("hex");

  const { showToast } = useToast();
  const { copy } = useClipboard();

  // Color harmony algorithms
  const colorHarmonies = [
    { value: "monochromatic", label: "Monochromatic" },
    { value: "analogous", label: "Analogous" },
    { value: "complementary", label: "Complementary" },
    { value: "triadic", label: "Triadic" },
    { value: "tetradic", label: "Tetradic" },
    { value: "splitComplementary", label: "Split Complementary" },
    { value: "random", label: "Random (No Harmony)" },
  ];

  const exportFormats = [
    { value: "hex", label: "HEX (#3B82F6)" },
    { value: "rgb", label: "RGB (59, 130, 246)" },
    { value: "hsl", label: "HSL (217, 91%, 60%)" },
    { value: "css-variables", label: "CSS Variables (--color-1)" },
  ];

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
    let h, s, l = (max + min) / 2;

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
      const randomBaseColor = generateRandomColor();
      const harmonies = generateHarmony(randomBaseColor, harmony);
      const newColors = colors.map((color, index) =>
        color.locked
          ? color
          : { ...color, hex: harmonies[index] || generateRandomColor() }
      );
      setColors(newColors);
      setBaseColor(randomBaseColor);
    }
    showToast("New palette generated! 🎨", "success");
  };

  // Apply preset palette
  const applyPreset = (preset) => {
    const newColors = preset.colors.map((hex, index) => ({
      hex,
      locked: colors[index]?.locked || false,
    }));

    while (newColors.length < colors.length) {
      newColors.push({ hex: generateRandomColor(), locked: false });
    }

    setColors(newColors.slice(0, colors.length));
    showToast(`Applied ${preset.name} palette! 🎨`, "success");
  };

  // Update color
  const updateColor = (index, newHex) => {
    const newColors = [...colors];
    newColors[index].hex = newHex;
    setColors(newColors);
  };

  // Toggle lock state
  const toggleLock = (index) => {
    const newColors = [...colors];
    newColors[index].locked = !newColors[index].locked;
    setColors(newColors);
  };

  // Add color block
  const addColor = () => {
    if (colors.length < 10) {
      setColors([...colors, { hex: generateRandomColor(), locked: false }]);
      showToast("Added new color block", "success");
    } else {
      showToast("❌ Max limit of 10 colors reached", "error");
    }
  };

  // Remove color block
  const removeColor = (index) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index));
      showToast("Removed color block", "success");
    } else {
      showToast("❌ You need at least 2 colors!", "error");
    }
  };

  // Format color outputs
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

  const getExportPreviewText = () => {
    return colors
      .map((color) => formatColor(color.hex, exportFormat))
      .join("\n");
  };

  // Copy Palette
  const copyPalette = () => {
    copy(getExportPreviewText(), `Palette (${exportFormat.toUpperCase()})`);
  };

  // Download Palette JSON config
  const downloadPalette = () => {
    const paletteData = {
      colors: colors.map((c) => c.hex),
      format: exportFormat,
      harmony,
      baseColor,
      generated: new Date().toISOString(),
    };

    const exported = exportToFile(
      JSON.stringify(paletteData, null, 2),
      `color-palette-${Date.now()}.json`,
      "application/json"
    );

    if (exported) {
      showToast("Palette JSON configuration downloaded! 💾", "success");
    } else {
      showToast("❌ Download failed", "error");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <Card glow={true}>
        {/* Header Actions */}
        <CardHeader
          title="Color Palette Generator"
          icon={<FaPalette />}
          actions={
            <>
              <Button onClick={() => setShowGuide(!showGuide)} variant="outline" size="sm" icon={<FaBook />}>
                {showGuide ? "Hide Guide" : "Show Guide"}
              </Button>
              <Button onClick={copyPalette} variant="primary" size="sm" icon={<FaCopy />}>
                Copy Palette
              </Button>
              <Button onClick={downloadPalette} variant="secondary" size="sm" icon={<FaDownload />}>
                Download JSON
              </Button>
            </>
          }
        />

        {/* Collapsible Usage Guide */}
        {showGuide && (
          <div className="mb-6 p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4 text-xs select-text leading-relaxed">
            <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2 font-brand select-none">
              📚 Color Palette Guide
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p>• <strong>Harmonies:</strong> Choose from complementary contrast, analogous blends, monochromatic gradients, or triadic layout models.</p>
                <p>• <strong>Locks:</strong> Press the padlock button on any color card to prevent it from changing when generating new palettes.</p>
              </div>
              <div className="space-y-2">
                <p>• <strong>Color picker:</strong> Click directly on the color rectangles to toggle the browser's native picker for custom edits.</p>
                <p>• <strong>Exporters:</strong> Export the palette as HEX values, CSS variables, RGB codes, or HSL formatting.</p>
              </div>
            </div>
          </div>
        )}

        {/* Presets List */}
        <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5 mb-6">
          <label className="block text-[11px] font-semibold text-slate-400 font-brand mb-3 select-none">
            Preset Palettes:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {presetPalettes.map((preset, index) => (
              <div
                key={index}
                className="group cursor-pointer bg-slate-900 border border-slate-850 p-2.5 rounded-xl hover:border-slate-700/80 transition-colors"
                onClick={() => applyPreset(preset)}
              >
                <div className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors mb-2 truncate">
                  {preset.name}
                </div>
                <div className="flex rounded overflow-hidden h-5 select-none">
                  {preset.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="flex-1 h-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workspace Columns */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* Main Palette Blocks Panel (Span 8) */}
          <div className="xl:col-span-8 space-y-6">
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5 space-y-4">
              <div className="flex justify-between items-center select-none">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Active Palette Swatches
                </h3>
                <div className="flex gap-2">
                  <Button onClick={addColor} variant="outline" size="sm" icon={<FaPlus />} disabled={colors.length >= 10}>
                    Add Block
                  </Button>
                  <Button onClick={generateNewPalette} variant="primary" size="sm" icon={<FaRandom />}>
                    Generate
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {colors.map((color, index) => (
                  <div key={index} className="bg-slate-900 border border-slate-850 p-3 rounded-xl flex flex-col items-center">
                    <div
                      className="w-full h-24 rounded-lg shadow-inner cursor-pointer hover:scale-102 active:scale-98 transition-all border border-slate-850"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => {
                        const input = document.createElement("input");
                        input.type = "color";
                        input.value = color.hex;
                        input.onchange = (e) => updateColor(index, e.target.value);
                        input.click();
                      }}
                      title="Click to pick custom color"
                    />
                    <div className="mt-3 text-center w-full">
                      <div className="text-[10px] font-bold font-mono text-slate-300 tracking-wider">
                        {color.hex.toUpperCase()}
                      </div>
                      <div className="flex justify-center items-center gap-1.5 mt-2">
                        <button
                          onClick={() => toggleLock(index)}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer text-[10px] ${
                            color.locked
                              ? "bg-yellow-900/20 border-yellow-800/60 text-yellow-400"
                              : "bg-slate-950 border-slate-850 text-slate-400 hover:text-white"
                          }`}
                          title={color.locked ? "Color locked" : "Lock color"}
                        >
                          {color.locked ? <FaLock className="w-2.5 h-2.5" /> : <FaUnlock className="w-2.5 h-2.5" />}
                        </button>
                        {colors.length > 2 && (
                          <button
                            onClick={() => removeColor(index)}
                            className="p-1.5 bg-slate-950 hover:bg-rose-950/20 text-slate-400 hover:text-rose-400 rounded-lg border border-slate-850 hover:border-rose-900/60 transition-colors cursor-pointer"
                            title="Remove color block"
                          >
                            <FaMinus className="w-2.5 h-2.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Harmony and Settings */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 select-none">
                Generator parameters
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Select
                  label="Color Harmony:"
                  id="color-harmony"
                  value={harmony}
                  onChange={(e) => setHarmony(e.target.value)}
                  options={colorHarmonies}
                />

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 font-brand mb-1.5 select-none">
                    Base Color picker:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={baseColor}
                      onChange={(e) => setBaseColor(e.target.value)}
                      className="w-10 h-8 rounded border border-slate-850 cursor-pointer bg-transparent"
                    />
                    <div className="flex-1">
                      <Input
                        id="base-hex"
                        value={baseColor}
                        onChange={(e) => setBaseColor(e.target.value)}
                        placeholder="#3B82F6"
                        className="!px-2.5 !py-1.5"
                      />
                    </div>
                  </div>
                </div>

                <Select
                  label="Output Format:"
                  id="export-format"
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  options={exportFormats}
                />
              </div>
            </div>
          </div>

          {/* Export Preview Column (Span 4) */}
          <div className="xl:col-span-4">
            <Textarea
              label="Compiled Palette output:"
              id="palette-output-preview"
              value={getExportPreviewText()}
              readOnly={true}
              placeholder="Palette colors export preview..."
              rows={16}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
