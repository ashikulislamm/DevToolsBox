import { useState } from "react";
import { v4 as uuidv4, v1 as uuidv1 } from "uuid";
import { Card, CardHeader } from "../../components/ui/Card.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { Select } from "../../components/ui/Select.jsx";
import { Input } from "../../components/ui/Input.jsx";
import { Textarea } from "../../components/ui/Textarea.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { useClipboard } from "../../hooks/useClipboard.js";
import { FaKey } from "react-icons/fa";

export default function UuidTool() {
  const [uuid, setUuid] = useState("");
  const [version, setVersion] = useState("v4");
  const [count, setCount] = useState(1);
  
  const { showToast } = useToast();
  const { copy } = useClipboard();

  const generateUUID = () => {
    const list = [];
    const clampCount = Math.max(1, Math.min(50, count));
    for (let i = 0; i < clampCount; i++) {
      list.push(version === "v1" ? uuidv1() : uuidv4());
    }
    setUuid(list.join("\n"));
    showToast(`🎯 Generated ${clampCount} UUID ${clampCount === 1 ? "token" : "tokens"} successfully!`, "success");
  };

  const copyUUID = () => {
    copy(uuid, "UUID Tokens");
  };

  const clearUUID = () => {
    setUuid("");
    showToast("Cleared UUID workspace", "success");
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <Card glow={true}>
        {/* Card Header & Actions */}
        <CardHeader
          title="UUID Generator"
          icon={<FaKey />}
          actions={
            <>
              <Button onClick={generateUUID} variant="primary" size="sm">
                Generate
              </Button>
              <Button onClick={copyUUID} variant="secondary" size="sm">
                Copy
              </Button>
              <Button onClick={clearUUID} variant="danger" size="sm">
                Clear
              </Button>
            </>
          }
        />

        {/* Configuration Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <Select
              label="UUID Version:"
              id="uuid-version"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              options={[
                { value: "v4", label: "v4 (Random)" },
                { value: "v1", label: "v1 (Timestamp-based)" },
              ]}
            />
          </div>

          <div>
            <Input
              label="Generation Count (Max 50):"
              id="uuid-count"
              type="number"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Output Textarea Area */}
        <div className="mt-4">
          <Textarea
            label="Generated Tokens:"
            id="uuid-output"
            value={uuid}
            readOnly={true}
            placeholder="Generated UUID(s) will appear here..."
            rows={10}
          />
        </div>
      </Card>
    </div>
  );
}
