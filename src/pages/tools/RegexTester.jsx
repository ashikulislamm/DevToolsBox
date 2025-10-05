import { useState } from "react";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testText, setTestText] = useState("");
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");

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
      className="w-full max-w-6xl mx-auto mt-8 p-6 rounded-2xl shadow-sm border"
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
