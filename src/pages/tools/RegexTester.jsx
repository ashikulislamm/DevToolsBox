import { useState } from "react";
import { Card, CardHeader } from "../../components/ui/Card.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { Input } from "../../components/ui/Input.jsx";
import { Textarea } from "../../components/ui/Textarea.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { FaSearch, FaBook } from "react-icons/fa";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testText, setTestText] = useState("");
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");
  const [showGuide, setShowGuide] = useState(false);

  const { showToast } = useToast();

  const runRegex = () => {
    if (!pattern) {
      showToast("❌ Please enter a regular expression pattern!", "error");
      return;
    }
    try {
      setError("");
      const regex = new RegExp(pattern, flags);
      const found = [...testText.matchAll(regex)].map((m) => m[0]);
      if (found.length) {
        setMatches(found);
        showToast(`🎯 Found ${found.length} match${found.length === 1 ? "" : "es"} successfully!`, "success");
      } else {
        setMatches(["No matches found"]);
        showToast("ℹ️ No matches found", "default");
      }
    } catch (e) {
      setMatches([]);
      setError("Invalid regex: " + e.message);
      showToast("❌ Invalid regular expression pattern", "error");
    }
  };

  const clearAll = () => {
    setPattern("");
    setFlags("g");
    setTestText("");
    setMatches([]);
    setError("");
    showToast("Cleared Regex workspace", "success");
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <Card glow={true}>
        {/* Header & Actions */}
        <CardHeader
          title="Regex Tester"
          icon={<FaSearch />}
          actions={
            <>
              <Button onClick={() => setShowGuide(!showGuide)} variant="outline" size="sm" icon={<FaBook />}>
                {showGuide ? "Hide Guide" : "Show Guide"}
              </Button>
              <Button onClick={runRegex} variant="primary" size="sm">
                Test Regex
              </Button>
              <Button onClick={clearAll} variant="danger" size="sm">
                Clear
              </Button>
            </>
          }
        />

        {/* Usage Guide */}
        {showGuide && (
          <div className="mb-6 p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4 text-xs select-text">
            <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2 font-brand">
              📚 Regular Expression Guide
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 leading-relaxed">
              <div>
                <h4 className="font-semibold text-indigo-400 mb-1">Character Classes</h4>
                <p>• <code className="bg-slate-950 px-1 rounded text-white font-mono">\d</code> - Any digit (0-9)</p>
                <p>• <code className="bg-slate-950 px-1 rounded text-white font-mono">\w</code> - Any word character (a-z, A-Z, 0-9, _)</p>
                <p>• <code className="bg-slate-950 px-1 rounded text-white font-mono">\s</code> - Any whitespace character</p>
                <p>• <code className="bg-slate-950 px-1 rounded text-white font-mono">.</code> - Any character except line break</p>
              </div>
              <div>
                <h4 className="font-semibold text-indigo-400 mb-1">Quantifiers</h4>
                <p>• <code className="bg-slate-950 px-1 rounded text-white font-mono">*</code> - 0 or more times</p>
                <p>• <code className="bg-slate-950 px-1 rounded text-white font-mono">+</code> - 1 or more times</p>
                <p>• <code className="bg-slate-950 px-1 rounded text-white font-mono">?</code> - 0 or 1 time</p>
                <p>• <code className="bg-slate-950 px-1 rounded text-white font-mono">&#123;n,m&#125;</code> - Between n and m times</p>
              </div>
              <div>
                <h4 className="font-semibold text-indigo-400 mb-1">Flags</h4>
                <p>• <strong>g</strong> - Global search (find all matches)</p>
                <p>• <strong>i</strong> - Case-insensitive search</p>
                <p>• <strong>m</strong> - Multiline search</p>
              </div>
            </div>
          </div>
        )}

        {/* Inputs */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  label="Regex Pattern:"
                  id="regex-pattern"
                  type="text"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="Enter regex pattern, e.g. [A-Za-z]+"
                />
              </div>
              <div className="w-24">
                <Input
                  label="Flags:"
                  id="regex-flags"
                  type="text"
                  value={flags}
                  onChange={(e) => setFlags(e.target.value)}
                  placeholder="g"
                />
              </div>
            </div>
            <div>
              <Textarea
                label="Test Text:"
                id="regex-text"
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                placeholder="Paste or type text to test against the regex..."
                rows={10}
              />
            </div>
          </div>

          {/* Results Output */}
          <div className="flex flex-col">
            <label className="block text-[11px] font-semibold text-slate-400 font-brand mb-1.5">
              Matches Output:
            </label>
            <div className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-3.5 overflow-y-auto custom-scrollbar font-mono text-xs text-white min-h-[300px]">
              {matches.length > 0 ? (
                <ul className="list-disc ml-5 space-y-1">
                  {matches.map((m, i) => (
                    <li key={i} className={m === "No matches found" ? "text-slate-500 italic list-none ml-0" : "text-emerald-400 break-all"}>
                      {m}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-slate-500 italic">No matches checked yet. Enter pattern and test text, then click Test Regex.</span>
              )}
            </div>
          </div>
        </div>

        {/* Errors Log */}
        {error && (
          <div className="mt-6 p-4 bg-rose-950/20 border border-rose-900/40 text-rose-300 rounded-xl text-xs font-mono select-text leading-relaxed">
            {error}
          </div>
        )}
      </Card>
    </div>
  );
}
