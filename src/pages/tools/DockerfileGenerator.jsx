import { useState, useEffect } from "react";

export default function DockerfileGenerator() {
  const [baseImage, setBaseImage] = useState("node:18-alpine");
  const [workDir, setWorkDir] = useState("/app");
  const [packageManager, setPackageManager] = useState("npm");
  const [port, setPort] = useState("3000");
  const [copySource, setCopySource] = useState(".");
  const [copyDest, setCopyDest] = useState(".");
  const [installCommand, setInstallCommand] = useState("");
  const [buildCommand, setBuildCommand] = useState("");
  const [startCommand, setStartCommand] = useState("npm start");
  const [additionalCommands, setAdditionalCommands] = useState("");
  const [dockerfile, setDockerfile] = useState("");
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

  // Generate Dockerfile
  const generateDockerfile = () => {
    if (!baseImage.trim()) {
      showNotification("Please enter a base image.", "error");
      return;
    }

    let dockerfileContent = `# Use the official ${baseImage} image
FROM ${baseImage}

# Set the working directory
WORKDIR ${workDir}

`;

    // Copy package files first (for better caching)
    if (packageManager === "npm") {
      dockerfileContent += `# Copy package*.json files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

`;
    } else if (packageManager === "yarn") {
      dockerfileContent += `# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --production

`;
    } else if (packageManager === "pnpm") {
      dockerfileContent += `# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile --prod

`;
    }

    // Custom install command
    if (installCommand.trim()) {
      dockerfileContent += `# Custom install command
RUN ${installCommand}

`;
    }

    // Copy source code
    dockerfileContent += `# Copy the rest of the application code
COPY ${copySource} ${copyDest}

`;

    // Build command
    if (buildCommand.trim()) {
      dockerfileContent += `# Build the application
RUN ${buildCommand}

`;
    }

    // Additional commands
    if (additionalCommands.trim()) {
      dockerfileContent += `# Additional commands
${additionalCommands
  .split("\n")
  .map((cmd) => (cmd.trim() ? `RUN ${cmd}` : ""))
  .filter(Boolean)
  .join("\n")}

`;
    }

    // Expose port
    if (port.trim()) {
      dockerfileContent += `# Expose the port the app runs on
EXPOSE ${port}

`;
    }

    // Health check (optional)
    if (
      port.trim() &&
      (baseImage.includes("node") || baseImage.includes("nginx"))
    ) {
      dockerfileContent += `# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:${port}/ || exit 1

`;
    }

    // Start command
    dockerfileContent += `# Define the command to run the application
CMD ["${startCommand.split(" ")[0]}"${startCommand
      .split(" ")
      .slice(1)
      .map((arg) => `, "${arg}"`)
      .join("")}]`;

    setDockerfile(dockerfileContent);
    showNotification("🐳 Dockerfile generated successfully!", "success");
  };

  // Copy Dockerfile
  const copyDockerfile = async () => {
    if (!dockerfile.trim()) {
      showNotification(
        "No Dockerfile to copy! Please generate one first.",
        "error"
      );
      return;
    }

    try {
      await navigator.clipboard.writeText(dockerfile);
      showNotification(
        "📋 Dockerfile copied to clipboard successfully!",
        "success"
      );
    } catch (err) {
      showNotification("❌ Failed to copy Dockerfile to clipboard", "error");
    }
  };

  // Clear all fields
  const clearAll = () => {
    setBaseImage("node:18-alpine");
    setWorkDir("/app");
    setPackageManager("npm");
    setPort("3000");
    setCopySource(".");
    setCopyDest(".");
    setInstallCommand("");
    setBuildCommand("");
    setStartCommand("npm start");
    setAdditionalCommands("");
    setDockerfile("");
  };

  // Preset configurations
  const applyPreset = (preset) => {
    switch (preset) {
      case "node":
        setBaseImage("node:18-alpine");
        setPackageManager("npm");
        setPort("3000");
        setStartCommand("npm start");
        setBuildCommand("npm run build");
        break;
      case "react":
        setBaseImage("node:18-alpine");
        setPackageManager("npm");
        setPort("3000");
        setStartCommand("npm start");
        setBuildCommand("npm run build");
        setInstallCommand("npm install -g serve");
        break;
      case "python":
        setBaseImage("python:3.11-slim");
        setWorkDir("/app");
        setPort("8000");
        setStartCommand("python app.py");
        setInstallCommand("pip install -r requirements.txt");
        break;
      case "nginx":
        setBaseImage("nginx:alpine");
        setWorkDir("/usr/share/nginx/html");
        setPort("80");
        setStartCommand("nginx -g daemon off;");
        setCopySource("./dist");
        setCopyDest(".");
        break;
    }
    showNotification(
      `📦 Applied ${preset.toUpperCase()} preset configuration`,
      "success"
    );
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
          🐳 Dockerfile Generator
        </h1>
        <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700"
          >
            {showGuide ? "Hide Guide" : "Show Guide"}
          </button>
          <button
            onClick={generateDockerfile}
            className="px-3 py-1.5 rounded-lg text-sm font-medium"
            style={{ backgroundColor: "var(--accent-color)" }}
          >
            Generate
          </button>
          <button
            onClick={copyDockerfile}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-700 hover:bg-gray-800"
          >
            Copy
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
            📚 How to Use Dockerfile Generator
          </h3>
          <div className="space-y-4 text-sm text-gray-300">
            <div>
              <h4 className="font-medium text-white mb-1">
                1. Choose Base Image
              </h4>
              <p>
                • <strong>Node.js</strong>: node:18-alpine, node:16-slim
              </p>
              <p>
                • <strong>Python</strong>: python:3.11-slim, python:3.9-alpine
              </p>
              <p>
                • <strong>Nginx</strong>: nginx:alpine, nginx:latest
              </p>
              <p>
                • <strong>PHP</strong>: php:8.1-fpm, php:apache
              </p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">
                2. Configure Settings
              </h4>
              <p>• Set working directory (usually /app)</p>
              <p>• Choose package manager (npm, yarn, pnpm)</p>
              <p>• Specify port number for your application</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">3. Use Presets</h4>
              <p>
                • <strong>Node.js</strong>: Basic Node.js application
              </p>
              <p>
                • <strong>React</strong>: React application with build step
              </p>
              <p>
                • <strong>Python</strong>: Python application with pip
              </p>
              <p>
                • <strong>Nginx</strong>: Static file serving
              </p>
            </div>
            <div className="p-3 bg-blue-900/30 border border-blue-700 rounded">
              <h4 className="font-medium text-blue-300 mb-1">
                💡 Best Practices:
              </h4>
              <p>• Use Alpine images for smaller size</p>
              <p>• Copy package files before source code for better caching</p>
              <p>• Use multi-stage builds for production apps</p>
              <p>• Add health checks for better monitoring</p>
            </div>
          </div>
        </div>
      )}

      {/* Presets */}
      <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
        <h3 className="font-semibold mb-3 text-gray-200">Quick Presets:</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => applyPreset("node")}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-green-600 hover:bg-green-700"
          >
            Node.js
          </button>
          <button
            onClick={() => applyPreset("react")}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-cyan-600 hover:bg-cyan-700"
          >
            React
          </button>
          <button
            onClick={() => applyPreset("python")}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-yellow-600 hover:bg-yellow-700"
          >
            Python
          </button>
          <button
            onClick={() => applyPreset("nginx")}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-orange-600 hover:bg-orange-700"
          >
            Nginx
          </button>
        </div>
      </div>

      {/* Configuration Form */}
      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Base Image */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Base Image
            </label>
            <input
              type="text"
              value={baseImage}
              onChange={(e) => setBaseImage(e.target.value)}
              placeholder="node:18-alpine"
              className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-sm text-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Working Directory */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Working Directory
            </label>
            <input
              type="text"
              value={workDir}
              onChange={(e) => setWorkDir(e.target.value)}
              placeholder="/app"
              className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-sm text-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Package Manager */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Package Manager
            </label>
            <select
              value={packageManager}
              onChange={(e) => setPackageManager(e.target.value)}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-sm text-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="npm">npm</option>
              <option value="yarn">yarn</option>
              <option value="pnpm">pnpm</option>
              <option value="none">None</option>
            </select>
          </div>

          {/* Port */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Port
            </label>
            <input
              type="text"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              placeholder="3000"
              className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-sm text-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Copy Source */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Copy Source
            </label>
            <input
              type="text"
              value={copySource}
              onChange={(e) => setCopySource(e.target.value)}
              placeholder="."
              className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-sm text-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Copy Destination */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Copy Destination
            </label>
            <input
              type="text"
              value={copyDest}
              onChange={(e) => setCopyDest(e.target.value)}
              placeholder="."
              className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-sm text-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Install Command */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Custom Install Command (Optional)
          </label>
          <input
            type="text"
            value={installCommand}
            onChange={(e) => setInstallCommand(e.target.value)}
            placeholder="pip install -r requirements.txt"
            className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-sm text-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Build Command */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Build Command (Optional)
          </label>
          <input
            type="text"
            value={buildCommand}
            onChange={(e) => setBuildCommand(e.target.value)}
            placeholder="npm run build"
            className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-sm text-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Start Command */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Start Command
          </label>
          <input
            type="text"
            value={startCommand}
            onChange={(e) => setStartCommand(e.target.value)}
            placeholder="npm start"
            className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-sm text-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Additional Commands */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Additional Commands (One per line)
          </label>
          <textarea
            value={additionalCommands}
            onChange={(e) => setAdditionalCommands(e.target.value)}
            placeholder="apt-get update&#10;apt-get install -y curl&#10;mkdir -p /app/logs"
            className="w-full h-24 px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-sm text-gray-100 outline-none focus:ring-2 focus:ring-blue-500 resize-none custom-scrollbar"
          />
        </div>
      </div>

      {/* Generated Dockerfile */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2 text-gray-200">
          Generated Dockerfile:
        </h3>
        <textarea
          readOnly
          value={dockerfile}
          className="w-full h-96 p-3 border rounded-lg font-mono text-sm bg-gray-900 text-gray-100 resize-none custom-scrollbar"
          style={{ borderColor: "var(--secondary-color)" }}
          placeholder="Generated Dockerfile will appear here..."
        />
      </div>

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
