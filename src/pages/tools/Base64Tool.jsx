import { useState } from "react";
import { Base64 } from "js-base64";
import { Card, CardHeader } from "../../components/ui/Card.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { Textarea } from "../../components/ui/Textarea.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { useClipboard } from "../../hooks/useClipboard.js";
import { FaLock } from "react-icons/fa";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  
  const { showToast } = useToast();
  const { copy } = useClipboard();

  // Encode
  const encodeBase64 = () => {
    if (!input.trim()) {
      showToast("❌ Please enter some text to encode!", "error");
      return;
    }
    try {
      setError("");
      const encoded = Base64.encode(input);
      setOutput(encoded);
      showToast("🔐 Encoded to Base64 successfully!", "success");
    } catch (e) {
      setError("Encoding failed: " + e.message);
      showToast("❌ Encoding failed", "error");
    }
  };

  // Decode
  const decodeBase64 = () => {
    if (!input.trim()) {
      showToast("❌ Please enter some Base64 text to decode!", "error");
      return;
    }
    try {
      setError("");
      const decoded = Base64.decode(input);
      setOutput(decoded);
      showToast("🔑 Decoded from Base64 successfully!", "success");
    } catch (e) {
      setError("Decoding failed: " + e.message);
      showToast("❌ Decoding failed. Check if input is valid Base64.", "error");
    }
  };

  // Copy result
  const copyOutput = () => {
    copy(output, "Base64 Output");
  };

  // Clear
  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
    showToast("Cleared Base64 workspace", "success");
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <Card glow={true}>
        {/* Header & Actions */}
        <CardHeader
          title="Base64 Encoder / Decoder"
          icon={<FaLock />}
          actions={
            <>
              <Button onClick={encodeBase64} variant="primary" size="sm">
                Encode
              </Button>
              <Button onClick={decodeBase64} variant="secondary" size="sm">
                Decode
              </Button>
              <Button onClick={copyOutput} variant="secondary" size="sm" disabled={!output}>
                Copy Output
              </Button>
              <Button onClick={clearAll} variant="danger" size="sm">
                Clear
              </Button>
            </>
          }
        />

        {/* Input / Output Workspace */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div>
            <Textarea
              label="Input text or Base64 string:"
              id="base64-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text or Base64 string here..."
              rows={14}
            />
          </div>

          {/* Output Panel */}
          <div>
            <Textarea
              label="Result:"
              id="base64-output"
              value={output}
              readOnly={true}
              placeholder="Encoded or decoded result will appear here..."
              rows={14}
            />
          </div>
        </div>

        {/* Error Output Log */}
        {error && (
          <div className="mt-6 p-4 bg-rose-950/20 border border-rose-900/40 text-rose-300 rounded-xl text-xs font-mono select-text leading-relaxed">
            {error}
          </div>
        )}
      </Card>
    </div>
  );
}
