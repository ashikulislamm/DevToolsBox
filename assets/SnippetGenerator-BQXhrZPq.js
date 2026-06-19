import{r as l,u as P,j as e,e as R,f as G,g as U,h as B,i as _}from"./index-BqCVcBBf.js";import{C as A,a as O,B as u}from"./Button-DmI0f6BQ.js";import{I as F}from"./Input-1J-PCWzW.js";import{T as C}from"./Textarea-D1eCXekL.js";import{u as J}from"./useClipboard-J38lvy7o.js";function W(){const[r,q]=l.useState("GET"),[h,x]=l.useState(""),[j,g]=l.useState(""),[i,f]=l.useState(""),[$,T]=l.useState("fetch"),[p,b]=l.useState(""),[m,E]=l.useState(!1),{showToast:d}=P(),{copy:N}=J(),k=t=>{if(!t.trim())return{"Content-Type":"application/json"};const n=t.split(`
`).filter(s=>s.includes(":")),c={};return n.forEach(s=>{const[o,...a]=s.split(":"),v=o.trim(),S=a.join(":").trim();v&&S&&(c[v]=S)}),c},y=()=>{if(!h.trim()){d("❌ Please enter a valid URL.","error");return}let t=h.trim();!t.startsWith("http://")&&!t.startsWith("https://")&&(t="https://"+t,x(t));let n;try{n=k(j)}catch{d("❌ Failed to parse headers. Ensure key: value format.","error");return}const c=JSON.stringify(n,null,2);let s="";switch($){case"fetch":s=`fetch("${t}", {
  method: "${r}",
  headers: ${c},
  body: ${r==="GET"?"undefined":`JSON.stringify(${i||"{}"})`}
})
  .then(res => {
    if (!res.ok) {
      throw new Error(\`HTTP error! status: \${res.status}\`);
    }
    return res.json();
  })
  .then(data => console.log(data))
  .catch(err => console.error('Error:', err));`;break;case"axios":s=`import axios from "axios";

axios.${r.toLowerCase()}("${t}"${r==="GET"?"":`, ${i||"{}"}`}, {
  headers: ${c}
})
  .then(res => console.log(res.data))
  .catch(err => console.error('Error:', err.response?.data || err.message));`;break;case"python":s=`import requests
import json

url = "${t}"
headers = ${JSON.stringify(n,null,2).replace(/"/g,"'")}
${r==="GET"?`
try:
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    print(response.json())
except requests.exceptions.RequestException as e:
    print(f"Error: {e}")`:`
data = ${i||"{}"}

try:
    response = requests.${r.toLowerCase()}(url, headers=headers, json=data)
    response.raise_for_status()
    print(response.json())
except requests.exceptions.RequestException as e:
    print(f"Error: {e}")`}`;break;case"nodejs":s=`const https = require('https');
const http = require('http');
const url = require('url');

const requestUrl = "${t}";
const parsedUrl = url.parse(requestUrl);
const isHttps = parsedUrl.protocol === 'https:';
const client = isHttps ? https : http;

const options = {
  hostname: parsedUrl.hostname,
  port: parsedUrl.port || (isHttps ? 443 : 80),
  path: parsedUrl.path,
  method: '${r}',
  headers: ${c}
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

${r!=="GET"?`req.write(JSON.stringify(${i||"{}"}));`:""}
req.end();`;break;case"go":s=`package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
)

func main() {
    url := "${t}"
    
    ${r!=="GET"?`
    data := ${i||"{}"}
    jsonData, _ := json.Marshal(data)
    req, err := http.NewRequest("${r}", url, bytes.NewBuffer(jsonData))`:`
    req, err := http.NewRequest("${r}", url, nil)`}
    
    if err != nil {
        fmt.Println("Error creating request:", err)
        return
    }
    
    ${Object.entries(n).map(([o,a])=>`req.Header.Set("${o}", "${a}")`).join(`
    `)}
    
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
}`;break;case"php":s=`<?php
$url = "${t}";
$headers = array(
    ${Object.entries(n).map(([o,a])=>`'${o}: ${a}'`).join(`,
    `)}
);

$options = array(
    'http' => array(
        'method' => '${r}',
        'header' => implode("\\r\\n", $headers),
        ${r!=="GET"?`'content' => json_encode(${i||"{}"})`:""}
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
?>`;break;case"java":s=`import java.io.*;
import java.net.http.*;
import java.net.URI;
import java.time.Duration;

public class ApiRequest {
    public static void main(String[] args) {
        try {
            HttpClient client = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
            
            ${r!=="GET"?`
            String requestBody = ${i||'"{}"'};
            
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("${t}"))
                .timeout(Duration.ofSeconds(30))
                .${r.toLowerCase()}(HttpRequest.BodyPublishers.ofString(requestBody))
                ${Object.entries(n).map(([o,a])=>`.header("${o}", "${a}")`).join(`
                `)}
                .build();`:`
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("${t}"))
                .timeout(Duration.ofSeconds(30))
                .GET()
                ${Object.entries(n).map(([o,a])=>`.header("${o}", "${a}")`).join(`
                `)}
                .build();`}
            
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            
            System.out.println("Status Code: " + response.statusCode());
            System.out.println("Response Body: " + response.body());
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}`;break;case"curl":s=`curl -X ${r} "${t}" \\
  ${Object.entries(n).map(([o,a])=>`-H "${o}: ${a}"`).join(` \\
  `)}${r!=="GET"?` \\
  -d '${i||"{}"}'`:""} \\
  -w "\\nStatus Code: %{http_code}\\n"`;break;case"powershell":s=`$uri = "${t}"
$headers = @{
    ${Object.entries(n).map(([o,a])=>`"${o}" = "${a}"`).join(`
    `)}
}

${r!=="GET"?`
$body = @'
${i||"{}"}
'@

try {
    $response = Invoke-RestMethod -Uri $uri -Method ${r} -Headers $headers -Body $body -ContentType "application/json"
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Error "Request failed: $($_.Exception.Message)"
}`:`
try {
    $response = Invoke-RestMethod -Uri $uri -Method ${r} -Headers $headers
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Error "Request failed: $($_.Exception.Message)"
}`}`;break;default:s="// Choose a language to generate code snippet"}b(s),d("✨ Code snippet generated successfully!","success")},w=()=>{if(!p.trim()){d("❌ No code snippet to copy! Please generate one first.","error");return}N(p,"Code Snippet")},H=()=>{x(""),g(""),f(""),b(""),d("Cleared snippet workspace","success")};return e.jsx("div",{className:"w-full max-w-6xl mx-auto px-4 py-8",children:e.jsxs(A,{glow:!0,children:[e.jsx(O,{title:"Code Snippet Generator",icon:e.jsx(B,{}),actions:e.jsxs(e.Fragment,{children:[e.jsx(u,{onClick:()=>E(!m),variant:"secondary",size:"sm",children:m?"Hide Guide":"Show Guide"}),e.jsx(u,{onClick:y,variant:"primary",size:"sm",icon:e.jsx(R,{}),children:"Generate"}),e.jsx(u,{onClick:w,variant:"secondary",size:"sm",disabled:!p,icon:e.jsx(G,{}),children:"Copy"}),e.jsx(u,{onClick:H,variant:"danger",size:"sm",icon:e.jsx(U,{}),children:"Clear"})]})}),m&&e.jsxs("div",{className:"mb-6 p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3 text-xs leading-relaxed text-slate-300",children:[e.jsx("h3",{className:"font-semibold text-sm text-[var(--accent-color)] flex items-center gap-2",children:"📚 HTTP Request Snippet Guide"}),e.jsxs("p",{children:["• ",e.jsx("strong",{children:"Method & URL:"})," Specify the target API endpoints and HTTP method. Secure protocols (",e.jsx("code",{children:"https://"}),") will automatically prepend if missing."]}),e.jsxs("p",{children:["• ",e.jsx("strong",{children:"Request Headers:"})," Write custom headers in ",e.jsx("code",{children:"Key: Value"})," format, one header per line. e.g. ",e.jsx("code",{children:"Authorization: Bearer my_token"}),"."]}),e.jsxs("p",{children:["• ",e.jsx("strong",{children:"Payload JSON:"})," Provide a valid raw JSON object inside the payload block for non-GET requests."]})]}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex gap-3 items-end",children:[e.jsxs("div",{className:"flex flex-col gap-1.5 shrink-0",children:[e.jsx("label",{htmlFor:"method-select",className:"block text-[11px] font-semibold text-slate-400 font-brand",children:"HTTP Method"}),e.jsxs("select",{id:"method-select",value:r,onChange:t=>q(t.target.value),className:"bg-slate-950 border border-slate-800 hover:border-slate-700/80 text-xs text-white rounded-lg px-3.5 py-2.5 outline-none transition-all focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/25 cursor-pointer font-bold h-[38px] w-[90px]",children:[e.jsx("option",{children:"GET"}),e.jsx("option",{children:"POST"}),e.jsx("option",{children:"PUT"}),e.jsx("option",{children:"DELETE"}),e.jsx("option",{children:"PATCH"})]})]}),e.jsx("div",{className:"flex-1",children:e.jsx(F,{label:"API Endpoint URL",id:"snippet-url",value:h,onChange:t=>x(t.target.value),placeholder:"api.example.com/v1/users",onKeyPress:t=>t.key==="Enter"&&y()})})]}),e.jsxs("div",{className:"flex flex-col gap-1.5",children:[e.jsx("label",{htmlFor:"language-select",className:"block text-[11px] font-semibold text-slate-400 font-brand",children:"Target Language"}),e.jsxs("select",{id:"language-select",value:$,onChange:t=>T(t.target.value),className:"w-full bg-slate-950 border border-slate-800 hover:border-slate-700/80 text-xs text-white rounded-lg px-3.5 py-2.5 outline-none transition-all focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/25 cursor-pointer",children:[e.jsxs("optgroup",{label:"JavaScript",className:"bg-[#0F172A]",children:[e.jsx("option",{value:"fetch",children:"JavaScript (Fetch API)"}),e.jsx("option",{value:"axios",children:"JavaScript (Axios)"}),e.jsx("option",{value:"nodejs",children:"Node.js (Native HTTP)"})]}),e.jsx("optgroup",{label:"Python",className:"bg-[#0F172A]",children:e.jsx("option",{value:"python",children:"Python (Requests)"})}),e.jsxs("optgroup",{label:"Other Languages",className:"bg-[#0F172A]",children:[e.jsx("option",{value:"go",children:"Go (net/http)"}),e.jsx("option",{value:"java",children:"Java (HTTP Client)"}),e.jsx("option",{value:"php",children:"PHP (file_get_contents)"})]}),e.jsxs("optgroup",{label:"Command Line",className:"bg-[#0F172A]",children:[e.jsx("option",{value:"curl",children:"cURL"}),e.jsx("option",{value:"powershell",children:"PowerShell"})]})]})]}),e.jsx(C,{label:"Request Headers (Key: Value - One per line)",id:"snippet-headers",value:j,onChange:t=>g(t.target.value),placeholder:`Authorization: Bearer token
Accept: application/json`,rows:4}),r!=="GET"&&e.jsx(C,{label:"Request Body (JSON Payload)",id:"snippet-body",value:i,onChange:t=>f(t.target.value),placeholder:'{"name": "John Doe", "email": "john@example.com"}',rows:5})]}),e.jsxs("div",{className:"flex flex-col gap-1.5 h-full",children:[e.jsx("label",{className:"block text-[11px] font-semibold text-slate-400 font-brand select-none",children:"Generated Code Snippet"}),e.jsx("pre",{className:"w-full flex-1 bg-slate-950 border border-slate-800 rounded-lg p-4 text-emerald-400 text-xs font-mono overflow-auto custom-scrollbar min-h-[350px] select-text",children:e.jsx("code",{children:p||"// Click Generate to generate snippet code"})})]})]}),e.jsxs("div",{className:"mt-6 p-4 bg-slate-900/20 border border-slate-800/40 rounded-xl flex gap-3 text-slate-400",children:[e.jsx(_,{className:"text-base text-[var(--accent-color)] shrink-0 mt-0.5"}),e.jsxs("div",{children:[e.jsx("h4",{className:"text-xs font-semibold text-slate-300 select-none",children:"HTTP Client Notes:"}),e.jsxs("p",{className:"text-[10px] leading-relaxed mt-0.5",children:["Code snippets generated here employ standard, modern APIs and libraries. Standard headers such as ",e.jsx("code",{children:"Content-Type: application/json"})," are supplied by default if no headers are explicitly provided."]})]})]})]})})}export{W as default};
