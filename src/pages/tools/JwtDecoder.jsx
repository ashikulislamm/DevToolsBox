import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function JwtDecoder() {
  const [token, setToken] = useState("");
  const [decodedHeader, setDecodedHeader] = useState(null);
  const [decodedPayload, setDecodedPayload] = useState(null);
  const [error, setError] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showGuide, setShowGuide] = useState(false);

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
            onClick={() => setShowGuide(!showGuide)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700"
          >
            {showGuide ? "Hide Guide" : "Show Guide"}
          </button>
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

      {/* Usage Guide */}
      {showGuide && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
          <h3 className="font-semibold mb-3 text-blue-300 flex items-center">
            📚 How to Use JWT Decoder
          </h3>
          <div className="space-y-4 text-sm text-gray-300">
            <div>
              <h4 className="font-medium text-white mb-1">1. What is JWT?</h4>
              <p>• <strong>JWT (JSON Web Token)</strong> is a compact, URL-safe means of representing claims</p>
              <p>• Used for secure information transmission between parties</p>
              <p>• Commonly used for authentication and authorization</p>
              <p>• Structure: <code className="bg-gray-700 px-1 rounded">header.payload.signature</code></p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">2. How to Use This Tool</h4>
              <p>• <strong>Paste JWT Token</strong>: Copy your JWT token into the input field</p>
              <p>• <strong>Click Decode</strong>: The tool will decode the header and payload</p>
              <p>• <strong>View Results</strong>: See the decoded JSON data in readable format</p>
              <p>• <strong>Copy Results</strong>: Use "Copy Decoded" to copy the decoded data</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">3. JWT Structure Explained</h4>
              <p>• <strong>Header</strong>: Contains metadata (algorithm, token type)</p>
              <p>• <strong>Payload</strong>: Contains claims (user data, expiration, etc.)</p>
              <p>• <strong>Signature</strong>: Ensures token hasn't been tampered with</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">4. Common JWT Claims</h4>
              <p>• <strong>iss</strong>: Issuer - who created the token</p>
              <p>• <strong>sub</strong>: Subject - who the token is about</p>
              <p>• <strong>aud</strong>: Audience - who should consume the token</p>
              <p>• <strong>exp</strong>: Expiration time - when the token expires</p>
              <p>• <strong>iat</strong>: Issued at - when the token was created</p>
              <p>• <strong>nbf</strong>: Not before - when the token becomes valid</p>
            </div>
            <div className="p-3 bg-blue-900/30 border border-blue-700 rounded">
              <h4 className="font-medium text-blue-300 mb-1">⚠️ Security Note:</h4>
              <p>• JWTs are encoded, not encrypted (readable by anyone)</p>
              <p>• Never put sensitive data in JWT payload</p>
              <p>• Always verify JWT signatures on the server side</p>
              <p>• This tool only decodes - it doesn't verify signatures</p>
            </div>
            <div className="p-3 bg-green-900/30 border border-green-700 rounded">
              <h4 className="font-medium text-green-300 mb-1">💡 Example JWT:</h4>
              <p className="font-mono text-xs break-all bg-gray-700 p-2 rounded mt-1">
                eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
              </p>
            </div>
          </div>
        </div>
      )}

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
