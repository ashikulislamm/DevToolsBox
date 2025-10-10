import { useState, useEffect } from "react";

export default function SnippetGenerator() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState("");
  const [body, setBody] = useState("");
  const [language, setLanguage] = useState("fetch");
  const [snippet, setSnippet] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showGuide, setShowGuide] = useState(false);

  // Notification functions
  const showNotification = (message, type = "success") => {
    const id = Date.now();
    const newNotification = { id, message, type };
    setNotifications((prev) => [...prev, newNotification]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 3000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  // Generate code based on user input
  const generateSnippet = () => {
    if (!url.trim()) {
      showNotification("Please enter a valid URL.", "error");
      return;
    }

    const parsedHeaders = parseHeaders(headers);
    const formattedHeaders = JSON.stringify(parsedHeaders, null, 2);
    let code = "";

    switch (language) {
      case "fetch":
        code = `fetch("${url}", {
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

axios.${method.toLowerCase()}("${url}"${
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

url = "${url}"
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

const requestUrl = "${url}";
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
    url := "${url}"
    
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
      .map(([key, value]) => `req.Header.Set("${key}", "${value}")`)
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
$url = "${url}";
$headers = array(
    ${Object.entries(parsedHeaders)
      .map(([key, value]) => `'${key}: ${value}'`)
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
                .uri(URI.create("${url}"))
                .timeout(Duration.ofSeconds(30))
                .${method.toLowerCase()}(HttpRequest.BodyPublishers.ofString(requestBody))
                ${Object.entries(parsedHeaders)
                  .map(([key, value]) => `.header("${key}", "${value}")`)
                  .join("\n                ")}
                .build();`
                : `
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("${url}"))
                .timeout(Duration.ofSeconds(30))
                .GET()
                ${Object.entries(parsedHeaders)
                  .map(([key, value]) => `.header("${key}", "${value}")`)
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
        code = `curl -X ${method} "${url}" \\
  ${Object.entries(parsedHeaders)
    .map(([key, value]) => `-H "${key}: ${value}"`)
    .join(" \\\n  ")}${method !== "GET" ? ` \\\n  -d '${body || "{}"}'` : ""} \\
  -w "\\nStatus Code: %{http_code}\\n"`;
        break;

      case "powershell":
        code = `$uri = "${url}"
$headers = @{
    ${Object.entries(parsedHeaders)
      .map(([key, value]) => `"${key}" = "${value}"`)
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
    showNotification("✨ Code snippet generated successfully!", "success");
  };

  // Parse header input into JSON
  const parseHeaders = (text) => {
    if (!text.trim()) return { "Content-Type": "application/json" };
    const lines = text.split("\n").filter((line) => line.includes(":"));
    const obj = {};
    lines.forEach((line) => {
      const [key, value] = line.split(":").map((v) => v.trim());
      if (key && value) obj[key] = value;
    });
    return obj;
  };

  // Copy snippet
  const copySnippet = async () => {
    if (!snippet.trim()) {
      showNotification(
        "No code snippet to copy! Please generate one first.",
        "error"
      );
      return;
    }

    try {
      await navigator.clipboard.writeText(snippet);
      showNotification(
        "📋 Code snippet copied to clipboard successfully!",
        "success"
      );
    } catch (err) {
      showNotification("❌ Failed to copy code snippet to clipboard", "error");
    }
  };

  // Clear fields
  const clearAll = () => {
    setUrl("");
    setHeaders("");
    setBody("");
    setSnippet("");
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
        <h1 className="md:text-2xl font-bold text-white">
          💻 Code Snippet Generator
        </h1>
        <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700"
          >
            {showGuide ? "Hide Guide" : "Show Guide"}
          </button>
          <button
            onClick={generateSnippet}
            className="px-3 py-1.5 rounded-lg text-sm font-medium"
            style={{ backgroundColor: "var(--accent-color)" }}
          >
            Generate
          </button>
          <button
            onClick={copySnippet}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-700 hover:bg-gray-800"
          >
            Copy
          </button>
          <button
            onClick={clearAll}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-red-600 hover:bg-red-700"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        {/* Method + URL */}
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="px-3 py-2 rounded-md bg-gray-900 border border-gray-700 text-sm font-semibold"
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
            <option>PATCH</option>
          </select>

          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.example.com/data"
            className="flex-1 px-3 py-2 rounded-md bg-gray-900 border border-gray-700 text-sm outline-none"
          />
        </div>

        {/* Headers */}
        <div>
          <h3 className="text-gray-300 mb-1 font-semibold">Headers:</h3>
          <textarea
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            placeholder="Content-Type: application/json&#10;Authorization: Bearer your-token&#10;Accept: application/json"
            className="w-full h-24 p-3 border rounded-lg font-mono text-sm bg-gray-900 text-gray-100 resize-none custom-scrollbar"
            style={{ borderColor: "var(--secondary-color)" }}
          />
        </div>

        {/* Body */}
        {method !== "GET" && (
          <div>
            <h3 className="text-gray-300 mb-1 font-semibold">
              Request Body (JSON):
            </h3>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder='{"name": "John Doe", "email": "john@example.com", "age": 30}'
              className="w-full h-24 p-3 border rounded-lg font-mono text-sm bg-gray-900 text-gray-100 resize-none custom-scrollbar"
              style={{ borderColor: "var(--secondary-color)" }}
            />
          </div>
        )}

        {/* Language Select */}
        <div>
          <h3 className="text-gray-300 mb-1 font-semibold">Language:</h3>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-2 rounded-md bg-gray-900 border border-gray-700 text-sm font-semibold"
          >
            <optgroup label="JavaScript">
              <option value="fetch">JavaScript (Fetch API)</option>
              <option value="axios">JavaScript (Axios)</option>
              <option value="nodejs">Node.js (Native HTTP)</option>
            </optgroup>
            <optgroup label="Python">
              <option value="python">Python (Requests)</option>
            </optgroup>
            <optgroup label="Other Languages">
              <option value="go">Go (net/http)</option>
              <option value="java">Java (HTTP Client)</option>
              <option value="php">PHP (file_get_contents)</option>
            </optgroup>
            <optgroup label="Command Line">
              <option value="curl">cURL</option>
              <option value="powershell">PowerShell</option>
            </optgroup>
          </select>
        </div>
      </div>

      {/* Usage Guide */}
      {showGuide && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
          <h3 className="font-semibold mb-3 text-blue-300 flex items-center">
            📚 How to Use Code Snippet Generator
          </h3>
          <div className="space-y-4 text-sm text-gray-300">
            <div>
              <h4 className="font-medium text-white mb-1">
                1. Set HTTP Method & URL
              </h4>
              <p>• Choose your HTTP method (GET, POST, PUT, DELETE, PATCH)</p>
              <p>• Enter the complete API endpoint URL</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">
                2. Add Headers (Optional)
              </h4>
              <p>
                • Format:{" "}
                <code className="bg-gray-700 px-1 rounded">
                  Header-Name: Header-Value
                </code>
              </p>
              <p>
                • Example:{" "}
                <code className="bg-gray-700 px-1 rounded">
                  Authorization: Bearer your-token
                </code>
              </p>
              <p>• One header per line</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">
                3. Request Body (For POST/PUT/PATCH)
              </h4>
              <p>• Enter valid JSON data</p>
              <p>
                • Example:{" "}
                <code className="bg-gray-700 px-1 rounded">
                  {"{"}"name": "John", "email": "john@example.com"{"}"}
                </code>
              </p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">
                4. Choose Language
              </h4>
              <p>
                • <strong>JavaScript (Fetch/Axios/Node.js):</strong> Web
                development
              </p>
              <p>
                • <strong>Python:</strong> Data science, automation, backend
              </p>
              <p>
                • <strong>Go:</strong> High-performance backend services
              </p>
              <p>
                • <strong>Java:</strong> Enterprise applications
              </p>
              <p>
                • <strong>PHP:</strong> Web development, WordPress
              </p>
              <p>
                • <strong>cURL:</strong> Command line testing
              </p>
              <p>
                • <strong>PowerShell:</strong> Windows automation
              </p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">
                5. Generate & Copy
              </h4>
              <p>• Click "Generate" to create your code snippet</p>
              <p>• Click "Copy" to copy the generated code to clipboard</p>
              <p>• Paste into your project and modify as needed</p>
            </div>
            <div className="p-3 bg-blue-900/30 border border-blue-700 rounded">
              <h4 className="font-medium text-blue-300 mb-1">💡 Pro Tips:</h4>
              <p>• Always test your API endpoints before generating code</p>
              <p>• Add error handling for production applications</p>
              <p>• Consider rate limiting and authentication requirements</p>
              <p>
                • Use environment variables for sensitive data like API keys
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Output Section */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2 text-gray-200">Generated Snippet:</h3>
        <textarea
          readOnly
          value={snippet}
          className="w-full h-80 p-3 border rounded-lg font-mono text-sm bg-gray-900 text-gray-100 resize-none custom-scrollbar"
          style={{ borderColor: "var(--secondary-color)" }}
          placeholder="Generated code snippet will appear here..."
        />
      </div>

      {/* Toast Notification Component */}
      {(() => {
        const ToastNotification = ({ notification, onRemove }) => {
          const { id, message, type } = notification;
          const [isVisible, setIsVisible] = useState(false);

          useEffect(() => {
            setTimeout(() => setIsVisible(true), 10);
          }, []);

          const getIcon = () => {
            switch (type) {
              case "success":
                return (
                  <svg
                    className="w-5 h-5 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                );
              case "error":
                return (
                  <svg
                    className="w-5 h-5 text-red-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                );
              default:
                return (
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                );
            }
          };

          const getBgColor = () => {
            switch (type) {
              case "success":
                return "bg-green-50 border-green-200";
              case "error":
                return "bg-red-50 border-red-200";
              default:
                return "bg-blue-50 border-blue-200";
            }
          };

          const getTextColor = () => {
            switch (type) {
              case "success":
                return "text-green-800";
              case "error":
                return "text-red-800";
              default:
                return "text-blue-800";
            }
          };

          return (
            <div
              className={`flex items-start p-4 mb-3 rounded-lg border ${getBgColor()} ${getTextColor()} transform transition-all duration-300 ease-in-out shadow-lg`}
              style={{
                transform: isVisible ? "translateX(0)" : "translateX(100%)",
                opacity: isVisible ? 1 : 0,
              }}
            >
              <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
              <div className="ml-3 text-sm font-medium flex-1 min-w-0">
                {message}
              </div>
              <button
                onClick={() => onRemove(id)}
                className={`ml-3 flex-shrink-0 rounded-lg p-1 inline-flex items-center justify-center h-6 w-6 ${getTextColor()} hover:bg-white hover:bg-opacity-30 focus:ring-2 focus:ring-gray-300 focus:outline-none transition-colors`}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          );
        };

        return (
          notifications.length > 0 && (
            <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
              {notifications.map((notification) => (
                <ToastNotification
                  key={notification.id}
                  notification={notification}
                  onRemove={removeNotification}
                />
              ))}
            </div>
          )
        );
      })()}
    </div>
  );
}
