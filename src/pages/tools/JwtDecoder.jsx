import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function JwtDecoder() {
  const [token, setToken] = useState("");
  const [decodedHeader, setDecodedHeader] = useState(null);
  const [decodedPayload, setDecodedPayload] = useState(null);
  const [error, setError] = useState("");
  const [notifications, setNotifications] = useState([]);

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

  const decodeToken = () => {
    try {
      setError("");
      if (!token.trim()) {
        setError("Please enter a valid JWT token!");
        return;
      }

      // JWTs have 3 parts separated by dots
      const parts = token.split(".");
      if (parts.length !== 3) {
        setError(
          "Invalid JWT format. A JWT must have 3 parts separated by '.'"
        );
        setDecodedHeader(null);
        setDecodedPayload(null);
        return;
      }

      // Decode header & payload
      const header = JSON.parse(atob(parts[0]));
      const payload = jwtDecode(token);

      setDecodedHeader(header);
      setDecodedPayload(payload);
    } catch (e) {
      setDecodedHeader(null);
      setDecodedPayload(null);
      setError("❌ Failed to decode JWT: " + e.message);
    }
  };

  const clearAll = () => {
    setToken("");
    setDecodedHeader(null);
    setDecodedPayload(null);
    setError("");
  };

  const copyDecoded = async () => {
    if (!decodedHeader || !decodedPayload) {
      showNotification(
        "No decoded JWT to copy! Please decode a token first.",
        "error"
      );
      return;
    }

    try {
      const copyData = {
        header: decodedHeader,
        payload: decodedPayload,
      };
      await navigator.clipboard.writeText(JSON.stringify(copyData, null, 2));
      showNotification(
        "📋 Decoded JWT copied to clipboard successfully!",
        "success"
      );
    } catch (err) {
      showNotification("❌ Failed to copy JWT to clipboard", "error");
    }
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
        <h1 className="text-2xl font-bold text-white">🔐 JWT Decoder</h1>
        <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
          <button
            onClick={decodeToken}
            className="px-3 py-1.5 rounded-lg text-sm font-medium"
            style={{ backgroundColor: "var(--accent-color)" }}
          >
            Decode
          </button>
          <button
            onClick={copyDecoded}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-700 hover:bg-gray-800"
            disabled={!decodedPayload}
          >
            Copy Decoded
          </button>
          <button
            onClick={clearAll}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-red-600 hover:bg-red-700"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Input */}
      <div>
        <h3 className="font-semibold mb-2 text-gray-200">JWT Token:</h3>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full h-32 p-3 border rounded-lg font-mono text-sm bg-gray-900 text-gray-100 outline-none focus:ring-2 resize-none custom-scrollbar"
          style={{
            borderColor: "var(--secondary-color)",
            fontFamily: "var(--font-family)",
          }}
          placeholder="Paste your JWT token here..."
        />
      </div>

      {/* Output */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div>
          <h3 className="font-semibold mb-2 text-gray-200">Header:</h3>
          <textarea
            readOnly
            value={decodedHeader ? JSON.stringify(decodedHeader, null, 2) : ""}
            className="w-full h-56 p-3 border rounded-lg font-mono text-sm bg-gray-900 text-gray-100 resize-none custom-scrollbar"
            style={{ borderColor: "var(--secondary-color)" }}
            placeholder="Decoded header will appear here..."
          />
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-gray-200">Payload:</h3>
          <textarea
            readOnly
            value={
              decodedPayload ? JSON.stringify(decodedPayload, null, 2) : ""
            }
            className="w-full h-56 p-3 border rounded-lg font-mono text-sm bg-gray-900 text-gray-100 resize-none custom-scrollbar"
            style={{ borderColor: "var(--secondary-color)" }}
            placeholder="Decoded payload will appear here..."
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
