import { useState, useEffect } from "react";
import { Base64 } from "js-base64";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [notifications, setNotifications] = useState([]);

  // Show notification
  const showNotification = (message, type = "success") => {
    const id = Date.now();
    const notification = { id, message, type };
    
    setNotifications(prev => [...prev, notification]);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  // Remove notification manually
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Encode
  const encodeBase64 = () => {
    try {
      setError("");
      const encoded = Base64.encode(input);
      setOutput(encoded);
    } catch (e) {
      setError("❌ Encoding failed: " + e.message);
    }
  };

  // Decode
  const decodeBase64 = () => {
    try {
      setError("");
      const decoded = Base64.decode(input);
      setOutput(decoded);
    } catch (e) {
      setError("❌ Decoding failed: " + e.message);
    }
  };

  // Copy result
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

  // Clear
  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
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
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          );
        case "error":
          return (
            <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          );
        default:
          return (
            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
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
          transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        <div className="ml-3 text-sm font-medium flex-1 min-w-0">
          {message}
        </div>
        <button
          onClick={() => onRemove(id)}
          className={`ml-3 flex-shrink-0 rounded-lg p-1 inline-flex items-center justify-center h-6 w-6 ${getTextColor()} hover:bg-white hover:bg-opacity-30 focus:ring-2 focus:ring-gray-300 focus:outline-none transition-colors`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <div
      className="w-full max-w-6xl mx-auto mt-8 mb-8 p-6 rounded-2xl shadow-sm border"
      style={{
        backgroundColor: "var(--primary-color)",
        color: "#fff",
        borderColor: "var(--secondary-color)",
        fontFamily: "var(--font-family)",
      }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="md:text-2xl font-bold text-white">
          🔐 Base64 Encoder / Decoder
        </h1>
        <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
          <button
            onClick={encodeBase64}
            className="px-3 py-1.5 rounded-lg text-sm font-medium"
            style={{ backgroundColor: "var(--accent-color)" }}
          >
            Encode
          </button>
          <button
            onClick={decodeBase64}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-700 hover:bg-gray-800"
          >
            Decode
          </button>
          <button
            onClick={copyOutput}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-700 hover:bg-gray-800"
          >
            Copy Output
          </button>
          <button
            onClick={clearAll}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-red-600 hover:bg-red-700"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Input / Output areas */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Input */}
        <div>
          <h3 className="font-semibold mb-1 text-gray-200">Input:</h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-64 p-3 border rounded-lg font-mono text-sm bg-gray-900 text-gray-100 outline-none focus:ring-1"
            style={{
              borderColor: "var(--secondary-color)",
              fontFamily: "var(--font-family)",
            }}
            placeholder="Enter text or Base64 string here..."
          />
        </div>

        {/* Output */}
        <div>
          <h3 className="font-semibold mb-1 text-gray-200">Result:</h3>
          <textarea
            value={output}
            readOnly
            className="w-full h-64 p-3 border rounded-lg font-mono text-sm bg-gray-900 text-gray-100"
            style={{
              borderColor: "var(--secondary-color)",
              fontFamily: "var(--font-family)",
            }}
            placeholder="Encoded or decoded result will appear here..."
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-700/30 border border-red-500 text-red-200 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Toast Notifications Container */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
          {notifications.map((notification) => (
            <ToastNotification
              key={notification.id}
              notification={notification}
              onRemove={removeNotification}
            />
          ))}
        </div>
      )}
    </div>
  );
}
