import { useState } from "react";
import { Card, CardHeader } from "../../components/ui/Card.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { Textarea } from "../../components/ui/Textarea.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { useClipboard } from "../../hooks/useClipboard.js";
import { FaTerminal } from "react-icons/fa";

export default function JsonFormatter() {
  const [input, setInput] = useState(
    '{\n  "name": "DevToolbox",\n  "version": 1.0\n}'
  );
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("text"); // "text" or "tree"
  
  const { showToast } = useToast();
  const { copy } = useClipboard();

  // Format (pretty print)
  const formatJson = () => {
    try {
      setError("");
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setViewMode("text");
    } catch (e) {
      setError("❌ Invalid JSON: " + e.message);
      setOutput("");
    }
  };

  // Minify JSON
  const minifyJson = () => {
    try {
      setError("");
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setViewMode("text");
    } catch (e) {
      setError("❌ Invalid JSON: " + e.message);
      setOutput("");
    }
  };

  // View JSON in tree format
  const viewJson = () => {
    try {
      setError("");
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setViewMode("tree");
    } catch (e) {
      setError("❌ Invalid JSON: " + e.message);
      setOutput("");
    }
  };

  // Validate only
  const validateJson = () => {
    try {
      JSON.parse(input);
      setError("");
      showToast("✅ JSON is valid!", "success");
    } catch (e) {
      setError("❌ Invalid JSON: " + e.message);
      showToast("❌ Invalid JSON schema", "error");
    }
  };

  // Copy output to clipboard
  const copyOutput = () => {
    copy(output, "JSON Output");
  };

  // Clear input/output
  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
    setViewMode("text");
  };

  // JSON Tree Viewer Component
  const JsonTreeViewer = ({ data, level = 0 }) => {
    const [collapsed, setCollapsed] = useState({});

    const toggleCollapse = (key) => {
      setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const renderValue = (key, value, path = "") => {
      const currentPath = path ? `${path}.${key}` : key;
      const indent = level * 20;

      if (value === null) {
        return (
          <div key={currentPath} style={{ marginLeft: `${indent}px` }} className="py-1 font-mono text-xs select-text">
            <span className="text-blue-400 font-semibold">"{key}"</span>:
            <span className="text-slate-500 ml-1">null</span>
          </div>
        );
      }

      if (typeof value === "string") {
        return (
          <div key={currentPath} style={{ marginLeft: `${indent}px` }} className="py-1 font-mono text-xs select-text">
            <span className="text-blue-400 font-semibold">"{key}"</span>:
            <span className="text-emerald-400 ml-1">"{value}"</span>
          </div>
        );
      }

      if (typeof value === "number" || typeof value === "boolean") {
        return (
          <div key={currentPath} style={{ marginLeft: `${indent}px` }} className="py-1 font-mono text-xs select-text">
            <span className="text-blue-400 font-semibold">"{key}"</span>:
            <span className="text-amber-500 ml-1">{String(value)}</span>
          </div>
        );
      }

      if (Array.isArray(value)) {
        const isCollapsed = collapsed[currentPath];
        return (
          <div key={currentPath} style={{ marginLeft: `${indent}px` }} className="font-mono text-xs">
            <div className="py-1 select-none">
              <button
                onClick={() => toggleCollapse(currentPath)}
                className="text-blue-400 font-semibold hover:text-blue-300 focus:outline-none cursor-pointer"
              >
                {isCollapsed ? "▶" : "▼"} "{key}"
              </button>
              <span className="text-slate-500 ml-1">
                [{value.length} {value.length === 1 ? "item" : "items"}]
              </span>
            </div>
            {!isCollapsed && (
              <div className="border-l border-slate-800 ml-2">
                {value.map((item, index) => (
                  <JsonTreeViewer
                    key={`${currentPath}[${index}]`}
                    data={{ [index]: item }}
                    level={level + 1}
                  />
                ))}
              </div>
            )}
          </div>
        );
      }

      if (typeof value === "object") {
        const isCollapsed = collapsed[currentPath];
        const keys = Object.keys(value);
        return (
          <div key={currentPath} style={{ marginLeft: `${indent}px` }} className="font-mono text-xs">
            <div className="py-1 select-none">
              <button
                onClick={() => toggleCollapse(currentPath)}
                className="text-blue-400 font-semibold hover:text-blue-300 focus:outline-none cursor-pointer"
              >
                {isCollapsed ? "▶" : "▼"} "{key}"
              </button>
              <span className="text-slate-500 ml-1">
                {`{${keys.length} ${keys.length === 1 ? "property" : "properties"}}`}
              </span>
            </div>
            {!isCollapsed && (
              <div className="border-l border-slate-800 ml-2">
                <JsonTreeViewer data={value} level={level + 1} />
              </div>
            )}
          </div>
        );
      }

      return null;
    };

    if (typeof data === "object" && data !== null) {
      return (
        <div>
          {Object.entries(data).map(([key, value]) => renderValue(key, value))}
        </div>
      );
    }

    return <div className="text-slate-500 text-xs">Invalid data</div>;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <Card glow={true}>
        {/* Title & Toolbar Actions */}
        <CardHeader
          title="JSON Formatter & Validator"
          icon={<FaTerminal />}
          actions={
            <>
              <Button onClick={formatJson} variant="primary" size="sm">
                Format
              </Button>
              <Button onClick={minifyJson} variant="secondary" size="sm">
                Minify
              </Button>
              <Button onClick={viewJson} variant="secondary" size="sm">
                Tree View
              </Button>
              <Button onClick={validateJson} variant="secondary" size="sm">
                Validate
              </Button>
              <Button onClick={copyOutput} variant="secondary" size="sm">
                Copy
              </Button>
              <Button onClick={clearAll} variant="danger" size="sm">
                Clear
              </Button>
            </>
          }
        />

        {/* Input/Output Workspace panels */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Side */}
          <div>
            <Textarea
              label="Input JSON:"
              id="json-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter or paste your raw JSON here..."
              rows={14}
            />
          </div>

          {/* Output Side */}
          <div>
            <div className="flex items-center justify-between mb-1.5 h-[22px]">
              <span className="block text-[11px] font-semibold text-slate-400 font-brand">
                {viewMode === "tree" ? "JSON Tree View:" : "Formatted Output:"}
              </span>
              {viewMode === "tree" && output && (
                <button
                  onClick={() => setViewMode("text")}
                  className="text-[10px] text-[var(--accent-color)] hover:text-white transition-colors font-bold cursor-pointer"
                >
                  Switch to Text
                </button>
              )}
            </div>

            {viewMode === "tree" && output ? (
              <div className="w-full h-[374px] p-3.5 border border-slate-800 rounded-lg bg-slate-950 overflow-auto text-sm custom-scrollbar">
                <JsonTreeViewer data={JSON.parse(output)} />
              </div>
            ) : (
              <Textarea
                id="json-output"
                value={output}
                readOnly={true}
                placeholder="Formatted output will appear here..."
                rows={14}
              />
            )}
          </div>
        </div>

        {/* Error Output Log */}
        {error && (
          <div className="mt-6 p-4 bg-rose-950/20 border border-rose-900/40 text-rose-300 rounded-xl text-xs font-mono select-text leading-relaxed">
            {error}
          </div>
        )}
      </Card>
    </div>
  );
}
