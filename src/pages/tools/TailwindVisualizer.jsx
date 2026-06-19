import React, { useState } from "react";
import { Card, CardHeader } from "../../components/ui/Card.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { Textarea } from "../../components/ui/Textarea.jsx";
import { Select } from "../../components/ui/Select.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { useClipboard } from "../../hooks/useClipboard.js";
import { 
  FaEye, FaCopy, FaCode, FaMobile, FaTabletAlt, FaDesktop, FaBook
} from "react-icons/fa";

export default function TailwindVisualizer() {
  const [tailwindClasses, setTailwindClasses] = useState(
    "bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg"
  );
  const [htmlContent, setHtmlContent] = useState("Hello, Tailwind CSS!");
  const [viewMode, setViewMode] = useState("desktop"); // desktop, tablet, mobile
  const [elementType, setElementType] = useState("div");
  const [showGuide, setShowGuide] = useState(false);

  const { showToast } = useToast();
  const { copy } = useClipboard();

  // Predefined class examples
  const examples = [
    {
      name: "Button Primary",
      classes: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all",
      content: "Click Me",
      element: "button",
    },
    {
      name: "Card Component",
      classes: "bg-white text-slate-800 shadow-lg rounded-lg p-6 border border-gray-200",
      content: "This is a card component with shadow and border.",
      element: "div",
    },
    {
      name: "Alert Success",
      classes: "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded",
      content: "Success! Your action was completed.",
      element: "div",
    },
    {
      name: "Navigation Bar",
      classes: "bg-gray-800 text-white p-4 flex justify-between items-center w-full",
      content: "Navigation • Menu • Profile",
      element: "nav",
    },
    {
      name: "Input Field",
      classes: "border border-gray-300 rounded-md px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white",
      content: "",
      element: "input",
      placeholder: "Enter your text here...",
    },
    {
      name: "Badge",
      classes: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800",
      content: "New",
      element: "span",
    },
    {
      name: "Progress Bar",
      classes: "w-full bg-gray-200 rounded-full h-2.5 overflow-hidden",
      content: '<div class="bg-blue-600 h-2.5 rounded-full" style="width: 45%"></div>',
      element: "div",
    },
    {
      name: "Hero Section",
      classes: "bg-gradient-to-br from-purple-600 to-blue-500 text-white p-12 text-center rounded-lg w-full",
      content: "Welcome to Our Amazing Platform",
      element: "section",
    },
  ];

  const elementTypes = [
    { value: "div", label: "div" },
    { value: "button", label: "button" },
    { value: "span", label: "span" },
    { value: "p", label: "p" },
    { value: "h1", label: "h1" },
    { value: "h2", label: "h2" },
    { value: "h3", label: "h3" },
    { value: "section", label: "section" },
    { value: "nav", label: "nav" },
    { value: "header", label: "header" },
    { value: "footer", label: "footer" },
    { value: "input", label: "input" },
    { value: "textarea", label: "textarea" },
  ];

  // Apply example
  const applyExample = (example) => {
    setTailwindClasses(example.classes);
    setHtmlContent(example.content);
    setElementType(example.element);
    showToast(`Applied ${example.name} example! 🎨`, "success");
  };

  // Copy classes to clipboard
  const copyClasses = () => {
    copy(tailwindClasses, "Tailwind Classes");
  };

  // Generate HTML code
  const generateHTML = () => {
    if (elementType === "input") {
      return `<${elementType} class="${tailwindClasses}" placeholder="${
        htmlContent || "Enter text..."
      }" />`;
    }
    return `<${elementType} class="${tailwindClasses}">\n  ${htmlContent}\n</${elementType}>`;
  };

  // Copy full HTML to clipboard
  const copyHTML = () => {
    copy(generateHTML(), "HTML Code");
  };

  // Get viewport classes for responsive preview
  const getViewportClasses = () => {
    switch (viewMode) {
      case "mobile":
        return "max-w-sm mx-auto shadow-2xl border-4 border-slate-700 rounded-3xl overflow-hidden";
      case "tablet":
        return "max-w-2xl mx-auto shadow-2xl border-4 border-slate-700 rounded-2xl overflow-hidden";
      default:
        return "max-w-full";
    }
  };

  // Render the preview element
  const renderPreviewElement = () => {
    const Element = elementType;

    if (elementType === "input") {
      return (
        <input
          className={tailwindClasses}
          placeholder={htmlContent || "Enter text..."}
          readOnly
        />
      );
    }

    if (elementType === "textarea") {
      return (
        <textarea
          className={tailwindClasses}
          placeholder={htmlContent || "Enter text..."}
          readOnly
          rows={4}
        />
      );
    }

    if (htmlContent.includes("<") && htmlContent.includes(">")) {
      return (
        <div
          className={tailwindClasses}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      );
    }

    return React.createElement(
      Element,
      { className: tailwindClasses },
      htmlContent
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <Card glow={true}>
        {/* Header & Main Action Controls */}
        <CardHeader
          title="Tailwind CSS Visualizer"
          icon={<FaEye />}
          actions={
            <>
              <Button onClick={() => setShowGuide(!showGuide)} variant="outline" size="sm" icon={<FaBook />}>
                {showGuide ? "Hide Guide" : "Show Guide"}
              </Button>
              <Button onClick={copyClasses} variant="primary" size="sm" icon={<FaCopy />}>
                Copy Classes
              </Button>
              <Button onClick={copyHTML} variant="secondary" size="sm" icon={<FaCode />}>
                Copy HTML
              </Button>
            </>
          }
        />

        {/* Collapsible Usage Guide */}
        {showGuide && (
          <div className="mb-6 p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4 text-xs select-text">
            <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2 font-brand">
              📚 Tailwind CSS Guide
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
              <div className="space-y-2">
                <p>• <strong>Tailwind Classes:</strong> Type Tailwind CSS classes directly into the field. Focus on flex spacing, sizes, margins, backgrounds, and text styling.</p>
                <p>• <strong>Responsive Preview:</strong> Toggle view modes above the preview box to test layout alignments on mobile, tablet, and desktop bounds.</p>
              </div>
              <div className="space-y-2">
                <p>• <strong>Examples:</strong> Utilize the predefined blocks (buttons, alerts, card items) as styling templates to kickstart component mockups.</p>
                <p>• <strong>Copy Code:</strong> Export styles as individual utility classes or complete nested HTML tags directly to clipboard.</p>
              </div>
            </div>
          </div>
        )}

        {/* Configurations & Workspace Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* Settings Left Column (Span 5) */}
          <div className="xl:col-span-5 space-y-6">
            {/* Editor Block */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 select-none">
                Configuration
              </h3>

              <div className="space-y-4">
                <div>
                  <Textarea
                    label="Tailwind CSS Classes:"
                    id="tailwind-classes"
                    value={tailwindClasses}
                    onChange={(e) => setTailwindClasses(e.target.value)}
                    placeholder="bg-blue-500 text-white p-4 rounded-lg..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Select
                      label="Element Type:"
                      id="element-type"
                      value={elementType}
                      onChange={(e) => setElementType(e.target.value)}
                      options={elementTypes}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 font-brand mb-1.5 select-none">
                      View Mode:
                    </label>
                    <div className="flex gap-1 bg-slate-950 border border-slate-800 p-1 rounded-lg">
                      <button
                        onClick={() => setViewMode("mobile")}
                        className={`flex-1 p-1.5 rounded-md text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                          viewMode === "mobile" ? "bg-slate-850 text-[var(--accent-color)]" : "text-slate-400 hover:text-white"
                        }`}
                        title="Mobile View"
                      >
                        <FaMobile />
                        <span>SM</span>
                      </button>
                      <button
                        onClick={() => setViewMode("tablet")}
                        className={`flex-1 p-1.5 rounded-md text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                          viewMode === "tablet" ? "bg-slate-850 text-[var(--accent-color)]" : "text-slate-400 hover:text-white"
                        }`}
                        title="Tablet View"
                      >
                        <FaTabletAlt />
                        <span>MD</span>
                      </button>
                      <button
                        onClick={() => setViewMode("desktop")}
                        className={`flex-1 p-1.5 rounded-md text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                          viewMode === "desktop" ? "bg-slate-850 text-[var(--accent-color)]" : "text-slate-400 hover:text-white"
                        }`}
                        title="Desktop View"
                      >
                        <FaDesktop />
                        <span>LG</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <Textarea
                    label={elementType === "input" ? "Placeholder text:" : "Inner Content / HTML:"}
                    id="html-content"
                    value={htmlContent}
                    onChange={(e) => setHtmlContent(e.target.value)}
                    placeholder="Enter element inner content or markup here..."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Presets List */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 select-none mb-3">
                Quick Preset Templates
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {examples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => applyExample(example)}
                    className="bg-slate-900 border border-slate-800/60 hover:bg-slate-800 hover:text-white text-slate-300 px-3 py-2 rounded-lg text-xs font-semibold text-left transition-colors cursor-pointer"
                  >
                    {example.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Visual Workspace Right Column (Span 7) */}
          <div className="xl:col-span-7 space-y-6">
            {/* Live Preview Pane */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4 select-none">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Live Viewport Preview
                </h3>
                <span className="text-[10px] text-slate-500 font-mono">
                  {viewMode === "mobile" ? "375px (SM)" : viewMode === "tablet" ? "768px (MD)" : "100% (LG)"}
                </span>
              </div>

              {/* Viewport Frame */}
              <div className="bg-slate-950 border border-slate-900 rounded-lg p-6 min-h-[200px] flex items-center justify-center overflow-auto custom-scrollbar">
                <div className={`bg-white rounded-lg p-6 min-h-[140px] flex items-center justify-center transition-all duration-300 w-full ${getViewportClasses()}`}>
                  {renderPreviewElement()}
                </div>
              </div>
            </div>

            {/* Generated Code Markup Codebox */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 font-brand mb-1.5 select-none">
                Generated HTML Markup:
              </label>
              <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs text-emerald-400 overflow-x-auto custom-scrollbar text-left">
                <code>{generateHTML()}</code>
              </pre>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
