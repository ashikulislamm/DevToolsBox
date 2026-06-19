import { useState } from "react";
import { Card, CardHeader } from "../../components/ui/Card.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { Textarea } from "../../components/ui/Textarea.jsx";
import { Select } from "../../components/ui/Select.jsx";
import { Input } from "../../components/ui/Input.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { useClipboard } from "../../hooks/useClipboard.js";
import { FaDocker, FaBook } from "react-icons/fa";

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
  const [showGuide, setShowGuide] = useState(false);

  const { showToast } = useToast();
  const { copy } = useClipboard();

  const packageManagers = [
    { value: "npm", label: "npm" },
    { value: "yarn", label: "yarn" },
    { value: "pnpm", label: "pnpm" },
    { value: "none", label: "None" },
  ];

  // Generate Dockerfile
  const generateDockerfile = () => {
    if (!baseImage.trim()) {
      showToast("Please enter a base image.", "error");
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
    showToast("🐳 Dockerfile generated successfully!", "success");
  };

  // Copy Dockerfile
  const copyDockerfile = () => {
    if (!dockerfile.trim()) {
      showToast("❌ No Dockerfile to copy! Please generate one first.", "error");
      return;
    }
    copy(dockerfile, "Dockerfile");
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
    showToast("Cleared Dockerfile configuration", "success");
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
        setPackageManager("none");
        break;
      case "nginx":
        setBaseImage("nginx:alpine");
        setWorkDir("/usr/share/nginx/html");
        setPort("80");
        setStartCommand("nginx -g daemon off;");
        setCopySource("./dist");
        setCopyDest(".");
        setPackageManager("none");
        break;
    }
    showToast(`📦 Applied ${preset.toUpperCase()} preset configuration`, "success");
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <Card glow={true}>
        {/* Header Actions */}
        <CardHeader
          title="Dockerfile Templates"
          icon={<FaDocker />}
          actions={
            <>
              <Button onClick={() => setShowGuide(!showGuide)} variant="outline" size="sm" icon={<FaBook />}>
                {showGuide ? "Hide Guide" : "Show Guide"}
              </Button>
              <Button onClick={generateDockerfile} variant="primary" size="sm">
                Generate
              </Button>
              <Button onClick={copyDockerfile} variant="secondary" size="sm" disabled={!dockerfile}>
                Copy Output
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
              📚 Dockerfile Generator Guide
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p>• <strong>Presets:</strong> Use presets to auto-fill common tech stacks like Node.js backend, static React UI, Python pipelines, or Nginx containers.</p>
                <p>• <strong>Caching Best Practices:</strong> By specifying package managers, package dependency configuration files are copied and installed <em>before</em> copying code, ensuring container layer cache hits.</p>
              </div>
              <div className="space-y-2">
                <p>• <strong>Health checks:</strong> Generated configurations dynamically verify network container ports via `curl` signals automatically for Node and Nginx base environments.</p>
              </div>
            </div>
          </div>
        )}

        {/* Workspace Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Settings Left Column (Span 6) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Presets Button Panel */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5">
              <label className="block text-[11px] font-semibold text-slate-400 font-brand mb-3 select-none">
                Select Docker Tech Preset:
              </label>
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => applyPreset("node")} variant="secondary" size="sm">Node.js</Button>
                <Button onClick={() => applyPreset("react")} variant="secondary" size="sm">React SPA</Button>
                <Button onClick={() => applyPreset("python")} variant="secondary" size="sm">Python</Button>
                <Button onClick={() => applyPreset("nginx")} variant="secondary" size="sm">Nginx</Button>
              </div>
            </div>

            {/* Inputs Panel */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Base Image:"
                  id="docker-base"
                  value={baseImage}
                  onChange={(e) => setBaseImage(e.target.value)}
                  placeholder="node:18-alpine"
                />
                <Input
                  label="Working Directory:"
                  id="docker-workdir"
                  value={workDir}
                  onChange={(e) => setWorkDir(e.target.value)}
                  placeholder="/app"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Package Manager:"
                  id="docker-pkg"
                  value={packageManager}
                  onChange={(e) => setPackageManager(e.target.value)}
                  options={packageManagers}
                />
                <Input
                  label="Exposed Port:"
                  id="docker-port"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  placeholder="3000"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Copy Source Path:"
                  id="docker-source"
                  value={copySource}
                  onChange={(e) => setCopySource(e.target.value)}
                  placeholder="."
                />
                <Input
                  label="Copy Destination Path:"
                  id="docker-dest"
                  value={copyDest}
                  onChange={(e) => setCopyDest(e.target.value)}
                  placeholder="."
                />
              </div>

              <Input
                label="Custom Install Command (e.g. RUN cmd):"
                id="docker-install"
                value={installCommand}
                onChange={(e) => setInstallCommand(e.target.value)}
                placeholder="pip install -r requirements.txt"
              />

              <Input
                label="Custom Build Command:"
                id="docker-build"
                value={buildCommand}
                onChange={(e) => setBuildCommand(e.target.value)}
                placeholder="npm run build"
              />

              <Input
                label="Container Entry Start Command:"
                id="docker-start"
                value={startCommand}
                onChange={(e) => setStartCommand(e.target.value)}
                placeholder="npm start"
              />

              <Textarea
                label="Additional Script Runs (one command per line):"
                id="docker-additional"
                value={additionalCommands}
                onChange={(e) => setAdditionalCommands(e.target.value)}
                placeholder="apt-get update&#10;apt-get install -y curl"
                rows={3}
              />
            </div>
          </div>

          {/* Code Output Right Column (Span 6) */}
          <div className="lg:col-span-6">
            <Textarea
              label="Generated Dockerfile File Output:"
              id="dockerfile-output"
              value={dockerfile}
              readOnly={true}
              placeholder="Dockerfile output code will generate here..."
              rows={27}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
