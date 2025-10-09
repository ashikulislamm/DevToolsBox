import React, { useState, useEffect } from "react";
import {
  FaCopy,
  FaEye,
  FaCode,
  FaMobile,
  FaTabletAlt,
  FaDesktop,
} from "react-icons/fa";

const TailwindVisualizer = () => {
  const [tailwindClasses, setTailwindClasses] = useState(
    "bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg"
  );
  const [htmlContent, setHtmlContent] = useState("Hello, Tailwind CSS!");
  const [viewMode, setViewMode] = useState("desktop"); // desktop, tablet, mobile
  const [elementType, setElementType] = useState("div");
  const [notifications, setNotifications] = useState([]);
  const [showGuide, setShowGuide] = useState(false);

  // Predefined class examples
  const examples = [
    {
      name: "Button Primary",
      classes:
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
      content: "Click Me",
      element: "button",
    },
    {
      name: "Card Component",
      classes: "bg-white shadow-lg rounded-lg p-6 m-4 border border-gray-200",
      content: "This is a card component with shadow and border.",
      element: "div",
    },
    {
      name: "Alert Success",
      classes:
        "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded",
      content: "Success! Your action was completed.",
      element: "div",
    },
    {
      name: "Navigation Bar",
      classes: "bg-gray-800 text-white p-4 flex justify-between items-center",
      content: "Navigation • Menu • Profile",
      element: "nav",
    },
    {
      name: "Input Field",
      classes:
        "border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
      content: "",
      element: "input",
      placeholder: "Enter your text here...",
    },
    {
      name: "Badge",
      classes:
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800",
      content: "New",
      element: "span",
    },
    {
      name: "Progress Bar",
      classes: "w-full bg-gray-200 rounded-full h-2.5",
      content:
        '<div class="bg-blue-600 h-2.5 rounded-full" style="width: 45%"></div>',
      element: "div",
    },
    {
      name: "Hero Section",
      classes:
        "bg-gradient-to-br from-purple-600 to-blue-500 text-white p-12 text-center",
      content: "Welcome to Our Amazing Platform",
      element: "section",
    },
  ];

  const elementTypes = [
    "div",
    "button",
    "span",
    "p",
    "h1",
    "h2",
    "h3",
    "section",
    "nav",
    "header",
    "footer",
    "input",
    "textarea",
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

  // Apply example
  const applyExample = (example) => {
    setTailwindClasses(example.classes);
    setHtmlContent(example.content);
    setElementType(example.element);
    showNotification(`Applied ${example.name} example! 🎨`, "success");
  };

  // Copy classes to clipboard
  const copyClasses = async () => {
    try {
      await navigator.clipboard.writeText(tailwindClasses);
      showNotification("Tailwind classes copied to clipboard! 📋", "success");
    } catch (err) {
      showNotification("Failed to copy classes", "error");
    }
  };

  // Copy full HTML to clipboard
  const copyHTML = async () => {
    const fullHTML = generateHTML();
    try {
      await navigator.clipboard.writeText(fullHTML);
      showNotification("HTML code copied to clipboard! 🎉", "success");
    } catch (err) {
      showNotification("Failed to copy HTML", "error");
    }
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

  // Get viewport classes for responsive preview
  const getViewportClasses = () => {
    switch (viewMode) {
      case "mobile":
        return "max-w-sm mx-auto";
      case "tablet":
        return "max-w-2xl mx-auto";
      default:
        return "max-w-full";
    }
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
            👁️ Tailwind CSS Visualizer
          </h1>
          <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700"
            >
              {showGuide ? "Hide Guide" : "Show Guide"}
            </button>
            <button
              onClick={copyClasses}
              className="px-3 py-1.5 rounded-lg text-sm font-medium"
              style={{ backgroundColor: "var(--accent-color)" }}
            >
              Copy Classes
            </button>
            <button
              onClick={copyHTML}
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-green-600 hover:bg-green-700"
            >
              Copy HTML
            </button>
          </div>
        </div>

        {/* Usage Guide */}
        {showGuide && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
            <h3 className="font-semibold mb-3 text-blue-300 flex items-center">
              📚 How to Use Tailwind CSS Visualizer
            </h3>
            <div className="space-y-4 text-sm text-gray-300">
              <div>
                <h4 className="font-medium text-white mb-1">
                  1. Enter Tailwind Classes
                </h4>
                <p>• Type or paste Tailwind CSS classes in the input field</p>
                <p>
                  • Classes are space-separated like:{" "}
                  <code>bg-blue-500 text-white p-4 rounded</code>
                </p>
                <p>
                  • Use responsive prefixes:{" "}
                  <code>sm:text-lg md:p-6 lg:bg-red-500</code>
                </p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">
                  2. Choose Element & Content
                </h4>
                <p>• Select HTML element type (div, button, span, etc.)</p>
                <p>• Add content text or HTML for the element</p>
                <p>• For inputs, content becomes placeholder text</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">
                  3. Use Examples & Responsive Preview
                </h4>
                <p>• Try predefined examples like buttons, cards, alerts</p>
                <p>• Switch between desktop, tablet, and mobile views</p>
                <p>• Test responsive design with different viewport sizes</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">
                  4. Copy & Export
                </h4>
                <p>• Copy just the Tailwind classes</p>
                <p>• Copy complete HTML with classes applied</p>
                <p>• Use in your projects or codepen demos</p>
              </div>
              <div className="p-3 bg-blue-900/30 border border-blue-700 rounded">
                <h4 className="font-medium text-blue-300 mb-1">
                  💡 Common Tailwind Patterns:
                </h4>
                <p>
                  • <code>flex items-center justify-center</code> - Center
                  content
                </p>
                <p>
                  • <code>bg-gradient-to-r from-blue-500 to-purple-600</code> -
                  Gradients
                </p>
                <p>
                  • <code>hover:bg-blue-700 transition-colors</code> - Hover
                  effects
                </p>
                <p>
                  • <code>shadow-lg rounded-lg border border-gray-200</code> -
                  Card styling
                </p>
                <p>
                  • <code>text-sm md:text-base lg:text-lg</code> - Responsive
                  text
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Input Controls */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-blue-400">
                Element Configuration
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tailwind CSS Classes
                  </label>
                  <textarea
                    value={tailwindClasses}
                    onChange={(e) => setTailwindClasses(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:border-blue-500 focus:outline-none custom-scrollbar h-24 resize-none"
                    placeholder="Enter Tailwind CSS classes..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Element Type
                    </label>
                    <select
                      value={elementType}
                      onChange={(e) => setElementType(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                    >
                      {elementTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      View Mode
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setViewMode("mobile")}
                        className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                          viewMode === "mobile"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        <FaMobile className="inline mr-1" />
                        Mobile
                      </button>
                      <button
                        onClick={() => setViewMode("tablet")}
                        className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                          viewMode === "tablet"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        <FaTabletAlt className="inline mr-1" />
                        Tablet
                      </button>
                      <button
                        onClick={() => setViewMode("desktop")}
                        className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                          viewMode === "desktop"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        <FaDesktop className="inline mr-1" />
                        Desktop
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Content {elementType === "input" ? "(Placeholder)" : ""}
                  </label>
                  <textarea
                    value={htmlContent}
                    onChange={(e) => setHtmlContent(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:border-blue-500 focus:outline-none custom-scrollbar h-20 resize-none"
                    placeholder={
                      elementType === "input"
                        ? "Placeholder text..."
                        : "Element content or HTML..."
                    }
                  />
                </div>
              </div>
            </div>

            {/* Examples */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-purple-400">
                Quick Examples
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {examples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => applyExample(example)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium text-left"
                  >
                    {example.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview and Code Panel */}
          <div className="space-y-6">
            {/* Live Preview */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-yellow-400">
                  Live Preview
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FaEye />
                  {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} View
                </div>
              </div>

              <div
                className={`bg-white rounded-lg p-8 min-h-48 ${getViewportClasses()}`}
              >
                <div className="flex items-center justify-center min-h-32">
                  {renderPreviewElement()}
                </div>
              </div>
            </div>

            {/* Generated HTML */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-orange-400">
                  Generated HTML
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={copyClasses}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center gap-2"
                  >
                    <FaCopy />
                    Classes
                  </button>
                  <button
                    onClick={copyHTML}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center gap-2"
                  >
                    <FaCode />
                    HTML
                  </button>
                </div>
              </div>

              <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto text-green-400 border border-gray-600 custom-scrollbar text-left">
                <code className="text-left whitespace-pre">
                  {generateHTML()}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TailwindVisualizer;
