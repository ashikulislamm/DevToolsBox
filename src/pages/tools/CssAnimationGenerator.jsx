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
  FaCss3Alt, FaPlay, FaPause, FaRedo, FaCopy, FaDownload, FaBook, FaPlus, FaTrash 
} from "react-icons/fa";

export default function CssAnimationGenerator() {
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
  const [isPlaying, setIsPlaying] = useState(true);
  const [showGuide, setShowGuide] = useState(false);

  const { showToast } = useToast();
  const { copy } = useClipboard();

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
    { value: "ease", label: "ease" },
    { value: "ease-in", label: "ease-in" },
    { value: "ease-out", label: "ease-out" },
    { value: "ease-in-out", label: "ease-in-out" },
    { value: "linear", label: "linear" },
    { value: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", label: "ease-out-quad" },
    { value: "cubic-bezier(0.55, 0.055, 0.675, 0.19)", label: "ease-in-sine" },
    { value: "cubic-bezier(0.215, 0.61, 0.355, 1)", label: "ease-out-back" },
  ];

  const directions = [
    { value: "normal", label: "normal" },
    { value: "reverse", label: "reverse" },
    { value: "alternate", label: "alternate" },
    { value: "alternate-reverse", label: "alternate-reverse" },
  ];

  const fillModes = [
    { value: "none", label: "none" },
    { value: "forwards", label: "forwards" },
    { value: "backwards", label: "backwards" },
    { value: "both", label: "both" },
  ];

  // Generate CSS code
  const generateCSS = () => {
    const keyframeCSS = keyframes
      .slice()
      .sort((a, b) => a.percentage - b.position)
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
    showToast(`🎬 Preset "${preset.name}" applied!`, "success");
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
    showToast("Added keyframe stop", "success");
  };

  // Remove keyframe
  const removeKeyframe = (index) => {
    if (keyframes.length > 2) {
      setKeyframes(keyframes.filter((_, i) => i !== index));
      showToast("Removed keyframe stop", "success");
    } else {
      showToast("❌ Minimum of 2 keyframes required!", "error");
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

  // Copy CSS to clipboard
  const copyToClipboard = () => {
    copy(generateCSS(), "CSS Animation Rules");
  };

  // Download CSS file
  const downloadCSS = () => {
    const exported = exportToFile(generateCSS(), `${animationName}.css`, "text/css");
    if (exported) {
      showToast("💾 CSS animation stylesheet downloaded!", "success");
    } else {
      showToast("❌ Download failed", "error");
    }
  };

  // Clear workspace
  const clearAll = () => {
    setAnimationName("customAnimation");
    setDuration(2);
    setTimingFunction("ease-in-out");
    setDelay(0);
    setIterationCount("infinite");
    setDirection("normal");
    setFillMode("both");
    setKeyframes([
      { percentage: 0, transform: "translateX(0px) rotate(0deg) scale(1)", opacity: 1 },
      { percentage: 100, transform: "translateX(0px) rotate(360deg) scale(1)", opacity: 1 },
    ]);
    showToast("Cleared animation editor", "success");
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <Card glow={true}>
        {/* Header Actions */}
        <CardHeader
          title="CSS Animation Generator"
          icon={<FaCss3Alt />}
          actions={
            <>
              <Button onClick={() => setShowGuide(!showGuide)} variant="outline" size="sm" icon={<FaBook />}>
                {showGuide ? "Hide Guide" : "Show Guide"}
              </Button>
              <Button onClick={copyToClipboard} variant="primary" size="sm" icon={<FaCopy />}>
                Copy CSS
              </Button>
              <Button onClick={downloadCSS} variant="secondary" size="sm" icon={<FaDownload />}>
                Download
              </Button>
              <Button onClick={clearAll} variant="danger" size="sm">
                Clear
              </Button>
            </>
          }
        />

        {/* Collapsible Usage Guide */}
        {showGuide && (
          <div className="mb-6 p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4 text-xs select-text leading-relaxed">
            <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2 font-brand select-none">
              📚 CSS Animation Guide
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p>• <strong>Keyframe timeline:</strong> Set percentages from <code className="bg-slate-950 px-1 rounded text-white font-mono">0%</code> (start) to <code className="bg-slate-950 px-1 rounded text-white font-mono">100%</code> (end) and configure CSS transform strings inside each block.</p>
                <p>• <strong>Transform Properties:</strong> Combine properties like <code className="bg-slate-950 px-1 rounded text-white font-mono">translateX(50px)</code>, <code className="bg-slate-950 px-1 rounded text-white font-mono">rotate(45deg)</code>, and <code className="bg-slate-950 px-1 rounded text-white font-mono">scale(1.2)</code>.</p>
              </div>
              <div className="space-y-2">
                <p>• <strong>Presets:</strong> Test ready-made transitions (Bounce, Pulse, Rotate) to quickly evaluate keyframe mappings in action.</p>
                <p>• <strong>Exporters:</strong> Export the compiled CSS containing both the <code className="bg-slate-950 px-1 rounded text-white font-mono">@keyframes</code> tag and class descriptors.</p>
              </div>
            </div>
          </div>
        )}

        {/* Configuration Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Settings Left Column (Span 6) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Presets Panel */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5">
              <label className="block text-[11px] font-semibold text-slate-400 font-brand mb-3 select-none">
                Quick Preset Motions:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {presets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyPreset(preset)}
                    className="bg-slate-900 border border-slate-850 hover:bg-slate-800 hover:text-white text-slate-300 px-3 py-2 rounded-lg text-xs font-semibold text-left transition-colors cursor-pointer"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs settings block */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 select-none">
                Animation Parameters
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Animation Name:"
                  id="anim-name"
                  value={animationName}
                  onChange={(e) => setAnimationName(e.target.value)}
                  placeholder="customAnimation"
                />
                <Input
                  label="Duration (seconds):"
                  id="anim-duration"
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={duration}
                  onChange={(e) => setDuration(parseFloat(e.target.value) || 1)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Timing Function:"
                  id="anim-timing"
                  value={timingFunction}
                  onChange={(e) => setTimingFunction(e.target.value)}
                  options={timingFunctions}
                />
                <Input
                  label="Delay (seconds):"
                  id="anim-delay"
                  type="number"
                  min="0"
                  step="0.1"
                  value={delay}
                  onChange={(e) => setDelay(parseFloat(e.target.value) || 0)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Iteration Count:"
                  id="anim-iterations"
                  value={iterationCount}
                  onChange={(e) => setIterationCount(e.target.value)}
                  placeholder="infinite or number"
                />
                <Select
                  label="Direction:"
                  id="anim-direction"
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                  options={directions}
                />
                <Select
                  label="Fill Mode:"
                  id="anim-fill"
                  value={fillMode}
                  onChange={(e) => setFillMode(e.target.value)}
                  options={fillModes}
                />
              </div>
            </div>

            {/* Timeline Editor block */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between select-none">
                <label className="block text-[11px] font-semibold text-slate-400 font-brand">
                  Timeline Keyframe Nodes
                </label>
                <Button onClick={addKeyframe} variant="primary" size="sm" icon={<FaPlus />}>
                  Add Keyframe
                </Button>
              </div>

              <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar pr-2 select-none">
                {keyframes.map((keyframe, index) => (
                  <div
                    key={index}
                    className="bg-slate-900 border border-slate-850 rounded-xl p-4 relative"
                  >
                    <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-300">
                      <span>Keyframe stop #{index + 1}</span>
                      {keyframes.length > 2 && (
                        <button
                          onClick={() => removeKeyframe(index)}
                          className="text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                        >
                          <FaTrash className="w-2.5 h-2.5" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <Input
                        label="Percentage (%):"
                        id={`kf-pct-${index}`}
                        type="number"
                        min="0"
                        max="100"
                        value={keyframe.percentage}
                        onChange={(e) => updateKeyframe(index, "percentage", parseInt(e.target.value) || 0)}
                      />
                      <Input
                        label="Opacity (0 - 1):"
                        id={`kf-opacity-${index}`}
                        type="number"
                        min="0"
                        max="1"
                        step="0.1"
                        value={keyframe.opacity}
                        onChange={(e) => updateKeyframe(index, "opacity", parseFloat(e.target.value) || 1)}
                      />
                    </div>

                    <Input
                      label="Transform Rules:"
                      id={`kf-transform-${index}`}
                      value={keyframe.transform}
                      onChange={(e) => updateKeyframe(index, "transform", e.target.value)}
                      placeholder="e.g. translateX(20px) rotate(45deg)"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview & Styles Outputs Right Column (Span 6) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Visualizer Frame */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4 select-none">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Animation Visualizer Canvas
                </h3>
                <div className="flex gap-1.5">
                  <Button
                    onClick={() => setIsPlaying(!isPlaying)}
                    variant="secondary"
                    size="sm"
                    icon={isPlaying ? <FaPause /> : <FaPlay />}
                  >
                    {isPlaying ? "Pause" : "Play"}
                  </Button>
                  <Button
                    onClick={() => {
                      setIsPlaying(false);
                      setTimeout(() => setIsPlaying(true), 80);
                    }}
                    variant="outline"
                    size="sm"
                    icon={<FaRedo />}
                  >
                    Restart
                  </Button>
                </div>
              </div>

              {/* Viewport Box */}
              <div className="bg-slate-950 border border-slate-900 rounded-lg p-10 min-h-[220px] flex items-center justify-center relative">
                <div
                  className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg shadow-blue-500/10 border border-white/10"
                  style={{
                    animation: isPlaying
                      ? `${animationName} ${duration}s ${timingFunction} ${delay}s ${iterationCount} ${direction} ${fillMode}`
                      : "none",
                  }}
                />
              </div>

              {/* Inline style element dynamically compiled */}
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

            {/* Generated CSS Style block */}
            <div>
              <Textarea
                label="Generated CSS rules:"
                id="animation-css"
                value={generateCSS()}
                readOnly={true}
                placeholder="Compiled keyframes CSS styling rules..."
                rows={13}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
