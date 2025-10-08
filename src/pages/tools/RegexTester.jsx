import { useState } from "react";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testText, setTestText] = useState("");
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");
  const [showGuide, setShowGuide] = useState(false);

  const runRegex = () => {
    try {
      setError("");
      const regex = new RegExp(pattern, flags);
      const found = [...testText.matchAll(regex)].map((m) => m[0]);
      setMatches(found.length ? found : ["No matches found"]);
    } catch (e) {
      setMatches([]);
      setError("❌ Invalid regex: " + e.message);
    }
  };

  const clearAll = () => {
    setPattern("");
    setFlags("g");
    setTestText("");
    setMatches([]);
    setError("");
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
        <h1 className="text-2xl font-bold text-white">🔍 Regex Tester</h1>
        <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700"
          >
            {showGuide ? "Hide Guide" : "Show Guide"}
          </button>
          <button
            onClick={runRegex}
            className="px-3 py-1.5 rounded-lg text-sm font-medium"
            style={{ backgroundColor: "var(--accent-color)" }}
          >
            Test
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
            📚 How to Use Regex Tester
          </h3>
          <div className="space-y-4 text-sm text-gray-300">
            <div>
              <h4 className="font-medium text-white mb-1">1. What is Regular Expression (Regex)?</h4>
              <p>• A sequence of characters that defines a search pattern</p>
              <p>• Used for string matching, validation, and text processing</p>
              <p>• Powerful tool for finding and manipulating text</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">2. How to Use This Tool</h4>
              <p>• <strong>Enter Pattern</strong>: Type your regex pattern in the first field</p>
              <p>• <strong>Set Flags</strong>: Add flags like 'g', 'i', 'm' in the flags field</p>
              <p>• <strong>Add Test Text</strong>: Paste or type text to test against</p>
              <p>• <strong>Click Test</strong>: See all matches highlighted below</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">3. Common Regex Patterns</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                <div className="bg-gray-700 p-2 rounded">
                  <p><code className="text-yellow-300">[0-9]+</code> - Numbers</p>
                </div>
                <div className="bg-gray-700 p-2 rounded">
                  <p><code className="text-yellow-300">[A-Za-z]+</code> - Letters</p>
                </div>
                <div className="bg-gray-700 p-2 rounded">
                  <p><code className="text-yellow-300">\w+</code> - Word characters</p>
                </div>
                <div className="bg-gray-700 p-2 rounded">
                  <p><code className="text-yellow-300">\d+</code> - Digits</p>
                </div>
                <div className="bg-gray-700 p-2 rounded">
                  <p><code className="text-yellow-300">\s+</code> - Whitespace</p>
                </div>
                <div className="bg-gray-700 p-2 rounded">
                  <p><code className="text-yellow-300">.</code> - Any character</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">4. Regex Flags Explained</h4>
              <p>• <strong>g</strong> - Global: Find all matches (not just first)</p>
              <p>• <strong>i</strong> - Case-insensitive: Ignore upper/lower case</p>
              <p>• <strong>m</strong> - Multiline: ^ and $ match line breaks</p>
              <p>• <strong>s</strong> - Dotall: . matches newline characters</p>
              <p>• <strong>u</strong> - Unicode: Full unicode matching</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">5. Special Characters</h4>
              <p>• <code className="bg-gray-700 px-1 rounded">^</code> - Start of string/line</p>
              <p>• <code className="bg-gray-700 px-1 rounded">$</code> - End of string/line</p>
              <p>• <code className="bg-gray-700 px-1 rounded">*</code> - Zero or more occurrences</p>
              <p>• <code className="bg-gray-700 px-1 rounded">+</code> - One or more occurrences</p>
              <p>• <code className="bg-gray-700 px-1 rounded">?</code> - Zero or one occurrence</p>
              <p>• <code className="bg-gray-700 px-1 rounded">&#123;n,m&#125;</code> - Between n and m occurrences</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">6. Practical Examples</h4>
              <div className="space-y-2">
                <div className="bg-gray-700 p-2 rounded">
                  <p><strong>Email:</strong> <code className="text-yellow-300">\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]&#123;2,&#125;\b</code></p>
                </div>
                <div className="bg-gray-700 p-2 rounded">
                  <p><strong>Phone:</strong> <code className="text-yellow-300">\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})</code></p>
                </div>
                <div className="bg-gray-700 p-2 rounded">
                  <p><strong>URL:</strong> <code className="text-yellow-300">https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]&#123;1,256&#125;\.[a-zA-Z0-9()]&#123;1,6&#125;\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)</code></p>
                </div>
                <div className="bg-gray-700 p-2 rounded">
                  <p><strong>Date (MM/DD/YYYY):</strong> <code className="text-yellow-300">\b(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/\d&#123;4&#125;\b</code></p>
                </div>
              </div>
            </div>
            <div className="p-3 bg-blue-900/30 border border-blue-700 rounded">
              <h4 className="font-medium text-blue-300 mb-1">💡 Pro Tips:</h4>
              <p>• Use parentheses <code className="bg-gray-700 px-1 rounded">()</code> to group patterns</p>
              <p>• Escape special characters with backslash <code className="bg-gray-700 px-1 rounded">\</code></p>
              <p>• Test your regex with different inputs to ensure accuracy</p>
              <p>• Use online regex visualizers for complex patterns</p>
            </div>
            <div className="p-3 bg-green-900/30 border border-green-700 rounded">
              <h4 className="font-medium text-green-300 mb-1">🎯 Try These Samples:</h4>
              <p>• Pattern: <code className="bg-gray-700 px-1 rounded text-yellow-300">\b\w+@\w+\.\w+\b</code> | Text: "Contact us at john@example.com or support@test.org"</p>
              <p>• Pattern: <code className="bg-gray-700 px-1 rounded text-yellow-300">\d&#123;3&#125;-\d&#123;2&#125;-\d&#123;4&#125;</code> | Text: "SSN: 123-45-6789 and 987-65-4321"</p>
              <p>• Pattern: <code className="bg-gray-700 px-1 rounded text-yellow-300">#[A-Fa-f0-9]&#123;6&#125;</code> | Text: "Colors: #FF5733, #33FF57, #3357FF"</p>
            </div>
          </div>
        </div>
      )}

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-1 text-gray-200">Regex Pattern:</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="flex-1 px-3 py-2 rounded-md bg-gray-900 border border-gray-700 text-sm font-mono outline-none focus:ring-2"
              placeholder="Enter regex pattern, e.g. [A-Za-z]+"
            />
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="w-20 px-2 py-2 rounded-md bg-gray-900 border border-gray-700 text-sm text-center outline-none"
              placeholder="flags"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Flags: g (global), i (ignore case), m (multiline), etc.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-1 text-gray-200">Test Text:</h3>
          <textarea
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            className="w-full h-32 p-3 border rounded-lg font-mono text-sm bg-gray-900 text-gray-100 outline-none focus:ring-2"
            style={{
              borderColor: "var(--secondary-color)",
              fontFamily: "var(--font-family)",
            }}
            placeholder="Paste or type text to test against the regex..."
          />
        </div>
      </div>

      {/* Results */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2 text-gray-200">Matches:</h3>
        <div
          className="p-3 border rounded-lg bg-gray-900 text-sm overflow-auto"
          style={{ borderColor: "var(--secondary-color)" }}
        >
          {matches.length > 0 ? (
            <ul className="list-disc ml-5 space-y-1">
              {matches.map((m, i) => (
                <li key={i} className="text-green-400 break-all">
                  {m}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 italic">No matches yet</p>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-4 p-3 bg-red-700/30 border border-red-500 text-red-200 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
