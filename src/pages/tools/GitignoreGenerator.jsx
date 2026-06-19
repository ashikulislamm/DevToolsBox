import { useState } from "react";
import { Card, CardHeader } from "../../components/ui/Card.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { Textarea } from "../../components/ui/Textarea.jsx";
import { Input } from "../../components/ui/Input.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { useClipboard } from "../../hooks/useClipboard.js";
import { templates } from "../../data/gitignoreTemplates.js";
import { FaGitAlt, FaBook } from "react-icons/fa";

export default function GitignoreGenerator() {
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [customIgnores, setCustomIgnores] = useState("");
  const [gitignoreContent, setGitignoreContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showGuide, setShowGuide] = useState(false);

  const { showToast } = useToast();
  const { copy } = useClipboard();

  // Generate .gitignore content
  const generateGitignore = () => {
    if (selectedTemplates.length === 0 && !customIgnores.trim()) {
      showToast("❌ Please select at least one template or add custom patterns.", "error");
      return;
    }

    let content = "";

    // Add header comment
    if (selectedTemplates.length > 0) {
      content += `# Created by .gitignore Generator\n# Templates: ${selectedTemplates
        .map((t) => t.name)
        .join(", ")}\n\n`;
    }

    // Add selected templates
    selectedTemplates.forEach((template, index) => {
      content += `# ==========================================\n`;
      content += `# ${template.name}\n`;
      content += `# ==========================================\n\n`;
      content += template.content;
      if (index < selectedTemplates.length - 1) {
        content += "\n\n";
      }
    });

    // Add custom ignores
    if (customIgnores.trim()) {
      if (selectedTemplates.length > 0) {
        content += "\n\n";
      }
      content += `# ==========================================\n`;
      content += `# Custom Ignore Patterns\n`;
      content += `# ==========================================\n\n`;
      content += customIgnores.trim();
    }

    setGitignoreContent(content);
    showToast("🎯 .gitignore file generated successfully!", "success");
  };

  // Copy .gitignore content
  const copyGitignore = () => {
    if (!gitignoreContent.trim()) {
      showToast("No .gitignore content to copy! Please generate one first.", "error");
      return;
    }
    copy(gitignoreContent, ".gitignore Content");
  };

  // Clear all selections
  const clearAll = () => {
    setSelectedTemplates([]);
    setCustomIgnores("");
    setGitignoreContent("");
    setSearchTerm("");
    showToast("Cleared gitignore editor workspace", "success");
  };

  // Toggle template selection
  const toggleTemplate = (template) => {
    setSelectedTemplates((prev) => {
      const isSelected = prev.some((t) => t.name === template.name);
      if (isSelected) {
        return prev.filter((t) => t.name !== template.name);
      } else {
        return [...prev, template];
      }
    });
  };

  // Filter templates based on search term
  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group templates by category
  const templatesByCategory = filteredTemplates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {});

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <Card glow={true}>
        {/* Header Actions */}
        <CardHeader
          title=".gitignore Templates"
          icon={<FaGitAlt />}
          actions={
            <>
              <Button onClick={() => setShowGuide(!showGuide)} variant="outline" size="sm" icon={<FaBook />}>
                {showGuide ? "Hide Guide" : "Show Guide"}
              </Button>
              <Button onClick={generateGitignore} variant="primary" size="sm">
                Generate
              </Button>
              <Button onClick={copyGitignore} variant="secondary" size="sm" disabled={!gitignoreContent}>
                Copy Output
              </Button>
              <Button onClick={clearAll} variant="danger" size="sm">
                Clear
              </Button>
            </>
          }
        />

        {/* Usage Guide */}
        {showGuide && (
          <div className="mb-6 p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4 text-xs select-text leading-relaxed">
            <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2 font-brand select-none">
              📚 .gitignore Generator Guide
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p>• <strong>Selection:</strong> Filter and select template configurations matching languages, IDE frameworks, or Operating Systems (e.g. Node, React, macOS, VS Code) in your workspace.</p>
                <p>• <strong>Custom Rules:</strong> Add your project-specific private paths (like <code className="bg-slate-950 px-1 rounded text-rose-400 font-mono">.env.local</code> or custom log directories) in the custom input.</p>
              </div>
              <div className="space-y-2">
                <p>• <strong>Generation:</strong> The generator concatenates selected setups with formatted header comment dividers for readable outputs.</p>
              </div>
            </div>
          </div>
        )}

        {/* Workspace Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls Left Column (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5 space-y-4">
              <div>
                <Input
                  label="Search Templates:"
                  id="gitignore-search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="e.g. Node, React, macOS, VS Code..."
                />
              </div>

              {/* Selected templates count */}
              <div className="text-xs text-slate-400 font-brand">
                Selected: <span className="text-[var(--accent-color)] font-bold">{selectedTemplates.length}</span> template{selectedTemplates.length !== 1 ? "s" : ""}
              </div>

              {/* Template categories */}
              <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar pr-2 select-none">
                {Object.entries(templatesByCategory).map(([category, categoryTemplates]) => (
                  <div key={category} className="space-y-2">
                    <h4 className="font-bold text-slate-400 uppercase text-[9px] tracking-wider font-brand">
                      {category}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {categoryTemplates.map((template) => {
                        const isSelected = selectedTemplates.some(
                          (t) => t.name === template.name
                        );
                        return (
                          <button
                            key={template.name}
                            onClick={() => toggleTemplate(template)}
                            className={`px-3 py-2 rounded-lg text-xs font-semibold text-left transition-colors cursor-pointer border ${
                              isSelected
                                ? "bg-[var(--accent-color)]/10 border-[var(--accent-color)] text-white shadow-sm"
                                : "bg-slate-900 border-slate-850 hover:bg-slate-800 text-slate-300"
                            }`}
                          >
                            {template.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                {Object.keys(templatesByCategory).length === 0 && (
                  <div className="text-center text-slate-500 text-xs py-4 italic">
                    No templates found for "{searchTerm}"
                  </div>
                )}
              </div>
            </div>

            {/* Custom Ignore Patterns */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5">
              <Textarea
                label="Custom Ignore Patterns (One per line):"
                id="gitignore-custom"
                value={customIgnores}
                onChange={(e) => setCustomIgnores(e.target.value)}
                placeholder="*.log&#10;temp/&#10;.env.local"
                rows={4}
              />
            </div>
          </div>

          {/* Generated Code Output Right Column (Span 7) */}
          <div className="lg:col-span-7">
            <Textarea
              label="Generated .gitignore File Content:"
              id="gitignore-output"
              value={gitignoreContent}
              readOnly={true}
              placeholder="Generated .gitignore content will appear here..."
              rows={23}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
