import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Card, CardHeader } from "../../components/ui/Card.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { Textarea } from "../../components/ui/Textarea.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { useClipboard } from "../../hooks/useClipboard.js";
import { FaLock, FaBook } from "react-icons/fa";

export default function JwtDecoder() {
  const [token, setToken] = useState("");
  const [decodedHeader, setDecodedHeader] = useState(null);
  const [decodedPayload, setDecodedPayload] = useState(null);
  const [error, setError] = useState("");
  const [showGuide, setShowGuide] = useState(false);

  const { showToast } = useToast();
  const { copy } = useClipboard();

  // Decode JWT
  const decodeToken = () => {
    try {
      setError("");
      if (!token.trim()) {
        showToast("❌ Please enter a JWT token!", "error");
        return;
      }

      // JWTs have 3 parts separated by dots
      const parts = token.trim().split(".");
      if (parts.length !== 3) {
        setError("Invalid JWT format. A JWT must have 3 parts separated by '.'");
        setDecodedHeader(null);
        setDecodedPayload(null);
        showToast("❌ Invalid JWT format", "error");
        return;
      }

      // Decode header & payload
      const header = JSON.parse(atob(parts[0]));
      const payload = jwtDecode(token);

      setDecodedHeader(header);
      setDecodedPayload(payload);
      showToast("🔐 JWT decoded successfully!", "success");
    } catch (e) {
      setDecodedHeader(null);
      setDecodedPayload(null);
      setError("Failed to decode JWT: " + e.message);
      showToast("❌ Failed to decode JWT", "error");
    }
  };

  // Clear workspace
  const clearAll = () => {
    setToken("");
    setDecodedHeader(null);
    setDecodedPayload(null);
    setError("");
    showToast("Cleared JWT workspace", "success");
  };

  // Copy output
  const copyDecoded = () => {
    if (!decodedHeader || !decodedPayload) {
      showToast("❌ No decoded JWT to copy!", "error");
      return;
    }
    const copyData = {
      header: decodedHeader,
      payload: decodedPayload,
    };
    copy(JSON.stringify(copyData, null, 2), "Decoded JWT Data");
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <Card glow={true}>
        {/* Header & Tool Action Buttons */}
        <CardHeader
          title="JWT Decoder"
          icon={<FaLock />}
          actions={
            <>
              <Button onClick={() => setShowGuide(!showGuide)} variant="outline" size="sm" icon={<FaBook />}>
                {showGuide ? "Hide Guide" : "Show Guide"}
              </Button>
              <Button onClick={decodeToken} variant="primary" size="sm">
                Decode
              </Button>
              <Button onClick={copyDecoded} variant="secondary" size="sm" disabled={!decodedPayload}>
                Copy Decoded
              </Button>
              <Button onClick={clearAll} variant="danger" size="sm">
                Clear
              </Button>
            </>
          }
        />

        {/* Collapsible Usage Guide */}
        {showGuide && (
          <div className="mb-6 p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4 text-xs select-text">
            <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2 font-brand">
              📚 How to Use JWT Decoder
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
              <div className="space-y-2">
                <p>
                  • <strong>What is JWT?</strong> JSON Web Token (JWT) is an open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.
                </p>
                <p>
                  • <strong>Structure:</strong> It contains three parts: Header (Algorithm & Token Type), Payload (Data/Claims), and Signature. They are separated by dots (<code className="bg-slate-950 px-1 rounded text-indigo-400 font-mono">.</code>).
                </p>
              </div>
              <div className="space-y-2">
                <p>
                  • <strong>Usage:</strong> Paste your JWT in the input box, click <strong>Decode</strong>, and inspect the claims. Note that this tool decodes the token client-side and does not verify signatures.
                </p>
                <p className="text-amber-400 font-semibold">
                  ⚠️ Security Note: JWTs are encoded, NOT encrypted. Never store private sensitive data in the token payload.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Workspace Layout */}
        <div className="space-y-6">
          {/* JWT Input */}
          <div>
            <Textarea
              label="JWT Token:"
              id="jwt-input"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste your encoded JWT token here..."
              rows={4}
            />
          </div>

          {/* Header & Payload Decoded Outputs */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Textarea
                label="Header (Metadata):"
                id="jwt-header"
                value={decodedHeader ? JSON.stringify(decodedHeader, null, 2) : ""}
                readOnly={true}
                placeholder="Decoded header will appear here..."
                rows={10}
              />
            </div>
            <div>
              <Textarea
                label="Payload (Claims / Data):"
                id="jwt-payload"
                value={decodedPayload ? JSON.stringify(decodedPayload, null, 2) : ""}
                readOnly={true}
                placeholder="Decoded payload will appear here..."
                rows={10}
              />
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
