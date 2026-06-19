import { useState, useEffect } from "react";
import { Card, CardHeader } from "../../components/ui/Card.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { Input } from "../../components/ui/Input.jsx";
import { Textarea } from "../../components/ui/Textarea.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { useClipboard } from "../../hooks/useClipboard.js";
import { FaFileCode, FaPlay, FaCopy, FaTrash, FaInfoCircle } from "react-icons/fa";

export default function SnippetGenerator() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState("");
  const [body, setBody] = useState("");
  const [language, setLanguage] = useState("fetch");
  const [snippet, setSnippet] = useState("");
  const [showGuide, setShowGuide] = useState(false);

  const { showToast } = useToast();
  const { copy } = useClipboard();

  // Parse header input text block into key-value pairs
  const parseHeaders = (text) => {
    if (!text.trim()) return { "Content-Type": "application/json" };
    const lines = text.split("\n").filter((line) => line.includes(":"));
    const obj = {};
    lines.forEach((line) => {
      const [key, ...valueParts] = line.split(":");
      const trimmedKey = key.trim();
      const trimmedValue = valueParts.join(":").trim();
      if (trimmedKey && trimmedValue) obj[trimmedKey] = trimmedValue;
    });
    return obj;
  };

  // Generate code snippet based on parameters
  const generateSnippet = () => {
    if (!url.trim()) {
      showToast("❌ Please enter a valid URL.", "error");
      return;
    }

    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = "https://" + formattedUrl;
      setUrl(formattedUrl);
    }

    let parsedHeaders;
    try {
      parsedHeaders = parseHeaders(headers);
    } catch (e) {
      showToast("❌ Failed to parse headers. Ensure key: value format.", "error");
      return;
    }

    const formattedHeaders = JSON.stringify(parsedHeaders, null, 2);
    let code = "";

    switch (language) {
      case "fetch":
        code = `fetch("${formattedUrl}", {
  method: "${method}",
  headers: ${formattedHeaders},
  body: ${method === "GET" ? "undefined" : `JSON.stringify(${body || "{}"})`}
})
  .then(res => {
    if (!res.ok) {
      throw new Error(\`HTTP error! status: \${res.status}\`);
    }
    return res.json();
  })
  .then(data => console.log(data))
  .catch(err => console.error('Error:', err));`;
        break;

      case "axios":
        code = `import axios from "axios";

axios.${method.toLowerCase()}("${formattedUrl}"${
          method === "GET" ? "" : `, ${body || "{}"}`
        }, {
  headers: ${formattedHeaders}
})
  .then(res => console.log(res.data))
  .catch(err => console.error('Error:', err.response?.data || err.message));`;
        break;

      case "python":
        code = `import requests
import json

url = "${formattedUrl}"
headers = ${JSON.stringify(parsedHeaders, null, 2).replace(/"/g, "'")}
${
  method === "GET"
    ? `
try:
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    print(response.json())
except requests.exceptions.RequestException as e:
    print(f"Error: {e}")`
    : `
data = ${body || "{}"}

try:
    response = requests.${method.toLowerCase()}(url, headers=headers, json=data)
    response.raise_for_status()
    print(response.json())
except requests.exceptions.RequestException as e:
    print(f"Error: {e}")`
}`;
        break;

      case "nodejs":
        code = `const https = require('https');
const http = require('http');
const url = require('url');

const requestUrl = "${formattedUrl}";
const parsedUrl = url.parse(requestUrl);
const isHttps = parsedUrl.protocol === 'https:';
const client = isHttps ? https : http;

const options = {
  hostname: parsedUrl.hostname,
  port: parsedUrl.port || (isHttps ? 443 : 80),
  path: parsedUrl.path,
  method: '${method}',
  headers: ${formattedHeaders}
};

const req = client.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      const jsonData = JSON.parse(data);
      console.log(jsonData);
    } catch (e) {
      console.log(data);
    }
  });
});

req.on('error', (err) => {
  console.error('Error:', err.message);
});

${method !== "GET" ? `req.write(JSON.stringify(${body || "{}"}));` : ""}
req.end();`;
        break;

      case "go":
        code = `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
)

func main() {
    url := "${formattedUrl}"
    
    ${
      method !== "GET"
        ? `
    data := ${body || "{}"}
    jsonData, _ := json.Marshal(data)
    req, err := http.NewRequest("${method}", url, bytes.NewBuffer(jsonData))`
        : `
    req, err := http.NewRequest("${method}", url, nil)`
    }
    
    if err != nil {
        fmt.Println("Error creating request:", err)
        return
    }
    
    ${Object.entries(parsedHeaders)
      .map(([key, val]) => `req.Header.Set("${key}", "${val}")`)
      .join("\n    ")}
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println("Error making request:", err)
        return
    }
    defer resp.Body.Close()
    
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        fmt.Println("Error reading response:", err)
        return
    }
    
    fmt.Println(string(body))
}`;
        break;

      case "php":
        code = `<?php
$url = "${formattedUrl}";
$headers = array(
    ${Object.entries(parsedHeaders)
      .map(([key, val]) => `'${key}: ${val}'`)
      .join(",\n    ")}
);

$options = array(
    'http' => array(
        'method' => '${method}',
        'header' => implode("\\r\\n", $headers),
        ${method !== "GET" ? `'content' => json_encode(${body || "{}"})` : ""}
    )
);

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

if ($result === FALSE) {
    echo "Error making request\\n";
} else {
    $data = json_decode($result, true);
    print_r($data);
}
?>`;
        break;

      case "java":
        code = `import java.io.*;
import java.net.http.*;
import java.net.URI;
import java.time.Duration;

public class ApiRequest {
    public static void main(String[] args) {
        try {
            HttpClient client = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
            
            ${
              method !== "GET"
                ? `
            String requestBody = ${body || '"{}"'};
            
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("${formattedUrl}"))
                .timeout(Duration.ofSeconds(30))
                .${method.toLowerCase()}(HttpRequest.BodyPublishers.ofString(requestBody))
                ${Object.entries(parsedHeaders)
                  .map(([key, val]) => `.header("${key}", "${val}")`)
                  .join("\n                ")}
                .build();`
                : `
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("${formattedUrl}"))
                .timeout(Duration.ofSeconds(30))
                .GET()
                ${Object.entries(parsedHeaders)
                  .map(([key, val]) => `.header("${key}", "${val}")`)
                  .join("\n                ")}
                .build();`
            }
            
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            
            System.out.println("Status Code: " + response.statusCode());
            System.out.println("Response Body: " + response.body());
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}`;
        break;

      case "curl":
        code = `curl -X ${method} "${formattedUrl}" \\
  ${Object.entries(parsedHeaders)
    .map(([key, val]) => `-H "${key}: ${val}"`)
    .join(" \\\n  ")}${method !== "GET" ? ` \\\n  -d '${body || "{}"}'` : ""} \\
  -w "\\nStatus Code: %{http_code}\\n"`;
        break;

      case "powershell":
        code = `$uri = "${formattedUrl}"
$headers = @{
    ${Object.entries(parsedHeaders)
      .map(([key, val]) => `"${key}" = "${val}"`)
      .join("\n    ")}
}

${
  method !== "GET"
    ? `
$body = @'
${body || "{}"}
'@

try {
    $response = Invoke-RestMethod -Uri $uri -Method ${method} -Headers $headers -Body $body -ContentType "application/json"
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Error "Request failed: $($_.Exception.Message)"
}`
    : `
try {
    $response = Invoke-RestMethod -Uri $uri -Method ${method} -Headers $headers
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Error "Request failed: $($_.Exception.Message)"
}`
}`;
        break;

      default:
        code = "// Choose a language to generate code snippet";
    }

    setSnippet(code);
    showToast("✨ Code snippet generated successfully!", "success");
  };

  const handleCopySnippet = () => {
    if (!snippet.trim()) {
      showToast("❌ No code snippet to copy! Please generate one first.", "error");
      return;
    }
    copy(snippet, "Code Snippet");
  };

  const clearAll = () => {
    setUrl("");
    setHeaders("");
    setBody("");
    setSnippet("");
    showToast("Cleared snippet workspace", "success");
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <Card glow={true}>
        {/* Header */}
        <CardHeader
          title="Code Snippet Generator"
          icon={<FaFileCode />}
          actions={
            <>
              <Button onClick={() => setShowGuide(!showGuide)} variant="secondary" size="sm">
                {showGuide ? "Hide Guide" : "Show Guide"}
              </Button>
              <Button onClick={generateSnippet} variant="primary" size="sm" icon={<FaPlay />}>
                Generate
              </Button>
              <Button onClick={handleCopySnippet} variant="secondary" size="sm" disabled={!snippet} icon={<FaCopy />}>
                Copy
              </Button>
              <Button onClick={clearAll} variant="danger" size="sm" icon={<FaTrash />}>
                Clear
              </Button>
            </>
          }
        />

        {/* Guide */}
        {showGuide && (
          <div className="mb-6 p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3 text-xs leading-relaxed text-slate-300">
            <h3 className="font-semibold text-sm text-[var(--accent-color)] flex items-center gap-2">
              📚 HTTP Request Snippet Guide
            </h3>
            <p>
              • <strong>Method & URL:</strong> Specify the target API endpoints and HTTP method. Secure protocols (<code>https://</code>) will automatically prepend if missing.
            </p>
            <p>
              • <strong>Request Headers:</strong> Write custom headers in <code>Key: Value</code> format, one header per line. e.g. <code>Authorization: Bearer my_token</code>.
            </p>
            <p>
              • <strong>Payload JSON:</strong> Provide a valid raw JSON object inside the payload block for non-GET requests.
            </p>
          </div>
        )}

        {/* Workspace Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Inputs Panel */}
          <div className="space-y-4">
            {/* Method & URL Input row */}
            <div className="flex gap-3 items-end">
              <div className="flex flex-col gap-1.5 shrink-0">
                <label htmlFor="method-select" className="block text-[11px] font-semibold text-slate-400 font-brand">
                  HTTP Method
                </label>
                <select
                  id="method-select"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="bg-slate-950 border border-slate-800 hover:border-slate-700/80 text-xs text-white rounded-lg px-3.5 py-2.5 outline-none transition-all focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/25 cursor-pointer font-bold h-[38px] w-[90px]"
                >
                  <option>GET</option>
                  <option>POST</option>
                  <option>PUT</option>
                  <option>DELETE</option>
                  <option>PATCH</option>
                </select>
              </div>

              <div className="flex-1">
                <Input
                  label="API Endpoint URL"
                  id="snippet-url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="api.example.com/v1/users"
                  onKeyPress={(e) => e.key === "Enter" && generateSnippet()}
                />
              </div>
            </div>

            {/* Target Language Select */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="language-select" className="block text-[11px] font-semibold text-slate-400 font-brand">
                Target Language
              </label>
              <select
                id="language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700/80 text-xs text-white rounded-lg px-3.5 py-2.5 outline-none transition-all focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/25 cursor-pointer"
              >
                <optgroup label="JavaScript" className="bg-[#0F172A]">
                  <option value="fetch">JavaScript (Fetch API)</option>
                  <option value="axios">JavaScript (Axios)</option>
                  <option value="nodejs">Node.js (Native HTTP)</option>
                </optgroup>
                <optgroup label="Python" className="bg-[#0F172A]">
                  <option value="python">Python (Requests)</option>
                </optgroup>
                <optgroup label="Other Languages" className="bg-[#0F172A]">
                  <option value="go">Go (net/http)</option>
                  <option value="java">Java (HTTP Client)</option>
                  <option value="php">PHP (file_get_contents)</option>
                </optgroup>
                <optgroup label="Command Line" className="bg-[#0F172A]">
                  <option value="curl">cURL</option>
                  <option value="powershell">PowerShell</option>
                </optgroup>
              </select>
            </div>

            {/* Headers Area */}
            <Textarea
              label="Request Headers (Key: Value - One per line)"
              id="snippet-headers"
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
              placeholder="Authorization: Bearer token&#10;Accept: application/json"
              rows={4}
            />

            {/* Body Area (For non-GET) */}
            {method !== "GET" && (
              <Textarea
                label="Request Body (JSON Payload)"
                id="snippet-body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder='{"name": "John Doe", "email": "john@example.com"}'
                rows={5}
              />
            )}
          </div>

          {/* Snippet Output Panel */}
          <div className="flex flex-col gap-1.5 h-full">
            <label className="block text-[11px] font-semibold text-slate-400 font-brand select-none">
              Generated Code Snippet
            </label>
            <pre className="w-full flex-1 bg-slate-950 border border-slate-800 rounded-lg p-4 text-emerald-400 text-xs font-mono overflow-auto custom-scrollbar min-h-[350px] select-text">
              <code>{snippet || "// Click Generate to generate snippet code"}</code>
            </pre>
          </div>
        </div>

        {/* Info Box Footer */}
        <div className="mt-6 p-4 bg-slate-900/20 border border-slate-800/40 rounded-xl flex gap-3 text-slate-400">
          <FaInfoCircle className="text-base text-[var(--accent-color)] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-semibold text-slate-300 select-none">HTTP Client Notes:</h4>
            <p className="text-[10px] leading-relaxed mt-0.5">
              Code snippets generated here employ standard, modern APIs and libraries. Standard headers such as <code>Content-Type: application/json</code> are supplied by default if no headers are explicitly provided.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
