import { useState, useEffect } from "react";
import MarkdownIt from "markdown-it";
import DOMPurify from "dompurify";
import { Card, CardHeader } from "../../components/ui/Card.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { Textarea } from "../../components/ui/Textarea.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { useClipboard } from "../../hooks/useClipboard.js";
import { FaMarkdown, FaShieldAlt } from "react-icons/fa";
import { MARKDOWN_TEMPLATES } from "../../data/markdownTemplates.js";

const TEMPLATE_BUTTONS = [
  { key: "blog", label: "Blog Post", icon: "📝", color: "hover:border-purple-500/50 hover:bg-purple-950/20" },
  { key: "readme", label: "README", icon: "📚", color: "hover:border-green-500/50 hover:bg-green-950/20" },
  { key: "notes", label: "Notes", icon: "📋", color: "hover:border-orange-500/50 hover:bg-orange-950/20" },
  { key: "apiDocs", label: "API Docs", icon: "🔌", color: "hover:border-cyan-500/50 hover:bg-cyan-950/20" },
  { key: "meetingNotes", label: "Meeting Notes", icon: "🗓️", color: "hover:border-indigo-500/50 hover:bg-indigo-950/20" },
  { key: "tutorial", label: "Tutorial", icon: "📖", color: "hover:border-pink-500/50 hover:bg-pink-950/20" },
  { key: "changelog", label: "Changelog", icon: "📋", color: "hover:border-emerald-500/50 hover:bg-emerald-950/20" },
  { key: "prd", label: "PRD", icon: "📊", color: "hover:border-violet-500/50 hover:bg-violet-950/20" },
  { key: "weeklyReport", label: "Weekly Report", icon: "📈", color: "hover:border-amber-500/50 hover:bg-amber-950/20" },
  { key: "codeReview", label: "Code Review", icon: "✅", color: "hover:border-slate-500/50 hover:bg-slate-800/20" },
  { key: "proposal", label: "Project Proposal", icon: "💼", color: "hover:border-blue-500/50 hover:bg-blue-950/20" },
  { key: "techSpec", label: "Tech Spec", icon: "⚙️", color: "hover:border-rose-500/50 hover:bg-rose-950/20" }
];

export default function MarkdownToHtml() {
  const [markdown, setMarkdown] = useState(
    `# Welcome to DevToolsBox Markdown Previewer\nType your **Markdown** here to see real-time **HTML preview** 👇\n\n- Supports headers, lists, links, code blocks, tables, etc.\n- Safe and sanitized rendering using DOMPurify.`
  );
  const [html, setHtml] = useState("");
  const [showGuide, setShowGuide] = useState(false);
  const [previewTheme, setPreviewTheme] = useState("dark"); // "dark" or "light"
  
  const { showToast } = useToast();
  const { copy } = useClipboard();

  // Create markdown parser
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    breaks: true,
  });

  // Convert markdown → HTML (sanitized)
  useEffect(() => {
    try {
      const rawHtml = md.render(markdown);
      const cleanHtml = DOMPurify.sanitize(rawHtml);
      setHtml(cleanHtml);
    } catch (err) {
      console.error("Markdown rendering error:", err);
    }
  }, [markdown]);

  const copyHTML = () => {
    if (!html.trim()) {
      showToast("❌ No HTML content to copy", "error");
      return;
    }
    copy(html, "HTML Output");
  };

  const clearAll = () => {
    setMarkdown("");
    setHtml("");
    showToast("Content cleared!", "success");
  };

  const applyTemplate = (key) => {
    const templateVal = MARKDOWN_TEMPLATES[key];
    let val = "";
    const dateStr = new Date().toLocaleDateString();
    if (typeof templateVal === "function") {
      if (key === "weeklyReport") {
        const nextDateStr = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString();
        val = templateVal(dateStr, nextDateStr);
      } else if (key === "techSpec") {
        const nextReviewDateStr = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString();
        val = templateVal(dateStr, nextReviewDateStr);
      } else {
        val = templateVal(dateStr);
      }
    } else {
      val = templateVal;
    }
    setMarkdown(val);
    showToast(`Template applied!`, "success");
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <Card glow={true}>
        {/* Header */}
        <CardHeader
          title="Markdown to HTML Converter"
          icon={<FaMarkdown />}
          actions={
            <>
              <Button
                onClick={() => setShowGuide(!showGuide)}
                variant="secondary"
                size="sm"
              >
                {showGuide ? "Hide Guide" : "Show Guide"}
              </Button>
              <Button
                onClick={copyHTML}
                variant="primary"
                size="sm"
                disabled={!html.trim()}
              >
                Copy HTML
              </Button>
              <Button
                onClick={clearAll}
                variant="danger"
                size="sm"
              >
                Clear Workspace
              </Button>
            </>
          }
        />

        {/* Guide */}
        {showGuide && (
          <div className="mb-6 p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4 text-xs leading-relaxed text-slate-300">
            <h3 className="font-semibold text-sm text-[var(--accent-color)] flex items-center gap-2">
              📚 Markdown Guide & Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-slate-100 mb-1">How to use:</p>
                <p>• Type or paste Markdown into the left panel.</p>
                <p>• Review the live HTML presentation in the preview screen.</p>
                <p>• Click "Copy HTML" to save the sanitized code to your clipboard.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-100 mb-1">Standard syntax cheat sheet:</p>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-900">
                  <div># Header 1</div>
                  <div>## Header 2</div>
                  <div>**bold text**</div>
                  <div>*italic text*</div>
                  <div>[Link](url)</div>
                  <div>![Image](url)</div>
                  <div>- Bullet item</div>
                  <div>\`inline code\`</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Templates Panel */}
        <div className="mb-6 bg-slate-900/50 border border-slate-800/80 rounded-xl p-5">
          <h3 className="text-xs font-semibold text-slate-400 mb-3 select-none">
            ⚡ Quick Document Templates
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {TEMPLATE_BUTTONS.map((btn) => (
              <button
                key={btn.key}
                onClick={() => applyTemplate(btn.key)}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 border border-slate-800/80 rounded-lg text-slate-300 hover:text-white transition-all text-[11px] font-medium ${btn.color} cursor-pointer`}
              >
                <span>{btn.icon}</span>
                <span>{btn.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Editors Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold text-slate-400 font-brand">
              Markdown Editor
            </label>
            <textarea
              id="markdown-input"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Type your markdown here..."
              rows={15}
              className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700/80 text-xs text-white placeholder:text-slate-700 rounded-lg px-3.5 py-3 outline-none transition-all focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 font-mono leading-relaxed resize-none custom-scrollbar"
            />
          </div>

          {/* HTML Preview */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold text-slate-400 font-brand">
                HTML Preview
              </label>
              <div className="flex bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-[9px] font-semibold">
                <button
                  type="button"
                  onClick={() => setPreviewTheme("dark")}
                  className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                    previewTheme === "dark" ? "bg-slate-800 text-white" : "text-slate-500"
                  }`}
                >
                  Dark Preview
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTheme("light")}
                  className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                    previewTheme === "light" ? "bg-slate-200 text-slate-900" : "text-slate-500"
                  }`}
                >
                  Light Preview
                </button>
              </div>
            </div>
            <div
              className={`w-full h-[332px] p-4 border rounded-lg overflow-auto custom-scrollbar select-text ${
                previewTheme === "dark"
                  ? "bg-slate-950 border-slate-800 text-slate-200 prose prose-invert"
                  : "bg-white border-slate-200 text-slate-900 prose prose-slate"
              }`}
              style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                fontSize: "13px",
                lineHeight: "1.6",
              }}
              dangerouslySetInnerHTML={{
                __html: html || "<p className='text-slate-500 italic'>HTML preview will appear here...</p>"
              }}
            />
          </div>
        </div>

        {/* HTML Source Code Block */}
        <div className="mt-6 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-semibold text-slate-400 font-brand">
              Generated HTML Source Code
            </label>
            <Button onClick={copyHTML} variant="secondary" size="sm" disabled={!html.trim()}>
              Copy Code
            </Button>
          </div>
          <pre className="w-full h-48 bg-slate-950 border border-slate-800 hover:border-slate-700/80 rounded-lg px-4 py-3 text-emerald-400 text-xs font-mono overflow-auto custom-scrollbar">
            <code>{html || "<!-- Generated HTML will appear here -->"}</code>
          </pre>
        </div>

        {/* Security Alert Footer */}
        <div className="mt-6 p-3 bg-emerald-950/20 border border-emerald-900/40 rounded-xl flex items-center gap-2.5 text-emerald-400">
          <FaShieldAlt className="text-base flex-shrink-0" />
          <p className="text-[10px] leading-relaxed">
            <strong>Client-Side Security:</strong> HTML parsing and DOM rendering is executed completely inside your browser sandbox. Output content is sanitized in real-time using DOMPurify to filter dangerous tags or scripts before rendering.
          </p>
        </div>
      </Card>
    </div>
  );
}
