import { useState, useEffect } from "react";

export default function JsonFormatter() {
  const [input, setInput] = useState(
    '{\n  "name": "DevToolbox",\n  "version": 1.0\n}'
  );
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("text"); // "text" or "tree"
  const [notifications, setNotifications] = useState([]);

  // Show notification
  const showNotification = (message, type = "success") => {
    const id = Date.now();
    const notification = { id, message, type };

    setNotifications((prev) => [...prev, notification]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  // Remove notification manually
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

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
      showNotification("✅ JSON is valid!", "success");
    } catch (e) {
      setError("❌ Invalid JSON: " + e.message);
      showNotification("❌ Invalid JSON", "error");
    }
  };

  // Copy output to clipboard
  const copyOutput = async () => {
    if (output.trim() === "") {
      showNotification("❌ No content to copy", "error");
      return;
    }
    try {
      await navigator.clipboard.writeText(output);
      showNotification("📋 Copied to clipboard!", "success");
    } catch (err) {
      showNotification("❌ Failed to copy to clipboard", "error");
    }
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
          <div
            key={currentPath}
            style={{ marginLeft: `${indent}px` }}
            className="py-1"
          >
            <span className="text-blue-600 font-medium">"{key}"</span>:
            <span className="text-gray-500 ml-1">null</span>
          </div>
        );
      }

      if (typeof value === "string") {
        return (
          <div
            key={currentPath}
            style={{ marginLeft: `${indent}px` }}
            className="py-1"
          >
            <span className="text-blue-600 font-medium">"{key}"</span>:
            <span className="text-green-600 ml-1">"{value}"</span>
          </div>
        );
      }

      if (typeof value === "number" || typeof value === "boolean") {
        return (
          <div
            key={currentPath}
            style={{ marginLeft: `${indent}px` }}
            className="py-1"
          >
            <span className="text-blue-600 font-medium">"{key}"</span>:
            <span className="text-orange-600 ml-1">{String(value)}</span>
          </div>
        );
      }

      if (Array.isArray(value)) {
        const isCollapsed = collapsed[currentPath];
        return (
          <div key={currentPath} style={{ marginLeft: `${indent}px` }}>
            <div className="py-1">
              <button
                onClick={() => toggleCollapse(currentPath)}
                className="text-blue-600 font-medium hover:text-blue-800 focus:outline-none"
              >
                {isCollapsed ? "▶" : "▼"} "{key}"
              </button>
              <span className="text-gray-600 ml-1">
                [{value.length} {value.length === 1 ? "item" : "items"}]
              </span>
            </div>
            {!isCollapsed && (
              <div className="border-l-2 border-gray-200 ml-2">
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
          <div key={currentPath} style={{ marginLeft: `${indent}px` }}>
            <div className="py-1">
              <button
                onClick={() => toggleCollapse(currentPath)}
                className="text-blue-600 font-medium hover:text-blue-800 focus:outline-none"
              >
                {isCollapsed ? "▶" : "▼"} "{key}"
              </button>
              <span className="text-gray-600 ml-1">
                {`{${keys.length} ${
                  keys.length === 1 ? "property" : "properties"
                }}`}
              </span>
            </div>
            {!isCollapsed && (
              <div className="border-l-2 border-gray-200 ml-2">
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

    return <div className="text-gray-500">Invalid data</div>;
  };

  // Toast Notification Component
  const ToastNotification = ({ notification, onRemove }) => {
    const { id, message, type } = notification;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      // Trigger animation on mount
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
        <div className="flex-shrink-0 mt-0.2">{getIcon()}</div>
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
    <>
      {/* Toast Notifications Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        {notifications.map((notification) => (
          <ToastNotification
            key={notification.id}
            notification={notification}
            onRemove={removeNotification}
          />
        ))}
      </div>

      <div className="w-full max-w-6xl mx-auto mt-8 mb-8 p-6 bg-[var(--primary-color)] shadow-lg rounded-2xl border border-gray-200 font-[var(--font-family)]">
        {/* Title Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">
            🧾 JSON Formatter & Validator
          </h1>
          <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
            <button
              onClick={formatJson}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              Format
            </button>
            <button
              onClick={minifyJson}
              className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
            >
              Minify
            </button>
            <button
              onClick={viewJson}
              className="px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
            >
              Tree View
            </button>
            <button
              onClick={validateJson}
              className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
            >
              Validate
            </button>
            <button
              onClick={copyOutput}
              className="px-3 py-1.5 bg-gray-700 text-white rounded-lg hover:bg-gray-800 text-sm"
            >
              Copy Output
            </button>
            <button
              onClick={clearAll}
              className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Editor Section */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Input */}
          <div>
            <h3 className="font-semibold mb-1 text-white text-left">
              Input JSON:
            </h3>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-gray-900 text-white w-full h-64 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-1 focus:ring-[var(--accent-color)] outline-none"
              placeholder="Enter or paste your JSON here..."
            />
          </div>

          {/* Output */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-white">
                {viewMode === "tree" ? "JSON Tree View:" : "Formatted Output:"}
              </h3>
              {viewMode === "tree" && output && (
                <button
                  onClick={() => setViewMode("text")}
                  className="text-sm px-2 py-1 bg-[var(--accent-color)] font-bold text-white rounded hover:bg-[var(--accent-color)]/80"
                >
                  Switch to Text
                </button>
              )}
            </div>

            {viewMode === "tree" && output ? (
              <div className="w-full h-64 p-3 border border-gray-300 rounded-lg bg-gray-50 overflow-auto text-sm">
                <JsonTreeViewer data={JSON.parse(output)} />
              </div>
            ) : (
              <textarea
                value={output}
                readOnly
                className="w-full h-64 bg-gray-900 text-white p-3 border border-gray-300 rounded-lg font-mono text-sm"
                placeholder="Your formatted/minified JSON will appear here..."
              />
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-300 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>
    </>
  );
}
