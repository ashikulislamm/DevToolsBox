import{r as s,u as A,j as e,c as H,o as M}from"./index-Bty-QInu.js";import{C as T,a as F,B as n}from"./Button-CCPPGs9u.js";import{T as I}from"./Textarea-Be-QwQXI.js";import{S as Y}from"./Select-BqYxo84V.js";import{I as t}from"./Input-DLl--kSo.js";import{u as W}from"./useClipboard-COVLFtXx.js";function V(){const[l,o]=s.useState("node:18-alpine"),[D,m]=s.useState("/app"),[u,r]=s.useState("npm"),[d,i]=s.useState("3000"),[P,j]=s.useState("."),[w,C]=s.useState("."),[y,g]=s.useState(""),[v,h]=s.useState(""),[b,c]=s.useState("npm start"),[N,$]=s.useState(""),[x,R]=s.useState(""),[S,B]=s.useState(!1),{showToast:p}=A(),{copy:U}=W(),z=[{value:"npm",label:"npm"},{value:"yarn",label:"yarn"},{value:"pnpm",label:"pnpm"},{value:"none",label:"None"}],G=()=>{if(!l.trim()){p("Please enter a base image.","error");return}let a=`# Use the official ${l} image
FROM ${l}

# Set the working directory
WORKDIR ${D}

`;u==="npm"?a+=`# Copy package*.json files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

`:u==="yarn"?a+=`# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --production

`:u==="pnpm"&&(a+=`# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile --prod

`),y.trim()&&(a+=`# Custom install command
RUN ${y}

`),a+=`# Copy the rest of the application code
COPY ${P} ${w}

`,v.trim()&&(a+=`# Build the application
RUN ${v}

`),N.trim()&&(a+=`# Additional commands
${N.split(`
`).map(f=>f.trim()?`RUN ${f}`:"").filter(Boolean).join(`
`)}

`),d.trim()&&(a+=`# Expose the port the app runs on
EXPOSE ${d}

`),d.trim()&&(l.includes("node")||l.includes("nginx"))&&(a+=`# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:${d}/ || exit 1

`),a+=`# Define the command to run the application
CMD ["${b.split(" ")[0]}"${b.split(" ").slice(1).map(f=>`, "${f}"`).join("")}]`,R(a),p("🐳 Dockerfile generated successfully!","success")},O=()=>{if(!x.trim()){p("❌ No Dockerfile to copy! Please generate one first.","error");return}U(x,"Dockerfile")},E=()=>{o("node:18-alpine"),m("/app"),r("npm"),i("3000"),j("."),C("."),g(""),h(""),c("npm start"),$(""),R(""),p("Cleared Dockerfile configuration","success")},k=a=>{switch(a){case"node":o("node:18-alpine"),r("npm"),i("3000"),c("npm start"),h("npm run build");break;case"react":o("node:18-alpine"),r("npm"),i("3000"),c("npm start"),h("npm run build"),g("npm install -g serve");break;case"python":o("python:3.11-slim"),m("/app"),i("8000"),c("python app.py"),g("pip install -r requirements.txt"),r("none");break;case"nginx":o("nginx:alpine"),m("/usr/share/nginx/html"),i("80"),c("nginx -g daemon off;"),j("./dist"),C("."),r("none");break}p(`📦 Applied ${a.toUpperCase()} preset configuration`,"success")};return e.jsx("div",{className:"w-full max-w-6xl mx-auto px-4 py-8",children:e.jsxs(T,{glow:!0,children:[e.jsx(F,{title:"Dockerfile Templates",icon:e.jsx(M,{}),actions:e.jsxs(e.Fragment,{children:[e.jsx(n,{onClick:()=>B(!S),variant:"outline",size:"sm",icon:e.jsx(H,{}),children:S?"Hide Guide":"Show Guide"}),e.jsx(n,{onClick:G,variant:"primary",size:"sm",children:"Generate"}),e.jsx(n,{onClick:O,variant:"secondary",size:"sm",disabled:!x,children:"Copy Output"}),e.jsx(n,{onClick:E,variant:"danger",size:"sm",children:"Clear"})]})}),S&&e.jsxs("div",{className:"mb-6 p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4 text-xs select-text leading-relaxed",children:[e.jsx("h3",{className:"font-bold text-slate-200 text-sm flex items-center gap-2 font-brand select-none",children:"📚 Dockerfile Generator Guide"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsxs("p",{children:["• ",e.jsx("strong",{children:"Presets:"})," Use presets to auto-fill common tech stacks like Node.js backend, static React UI, Python pipelines, or Nginx containers."]}),e.jsxs("p",{children:["• ",e.jsx("strong",{children:"Caching Best Practices:"})," By specifying package managers, package dependency configuration files are copied and installed ",e.jsx("em",{children:"before"})," copying code, ensuring container layer cache hits."]})]}),e.jsx("div",{className:"space-y-2",children:e.jsxs("p",{children:["• ",e.jsx("strong",{children:"Health checks:"})," Generated configurations dynamically verify network container ports via `curl` signals automatically for Node and Nginx base environments."]})})]})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6 items-start",children:[e.jsxs("div",{className:"lg:col-span-6 space-y-6",children:[e.jsxs("div",{className:"bg-slate-950/40 border border-slate-800/80 rounded-xl p-5",children:[e.jsx("label",{className:"block text-[11px] font-semibold text-slate-400 font-brand mb-3 select-none",children:"Select Docker Tech Preset:"}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(n,{onClick:()=>k("node"),variant:"secondary",size:"sm",children:"Node.js"}),e.jsx(n,{onClick:()=>k("react"),variant:"secondary",size:"sm",children:"React SPA"}),e.jsx(n,{onClick:()=>k("python"),variant:"secondary",size:"sm",children:"Python"}),e.jsx(n,{onClick:()=>k("nginx"),variant:"secondary",size:"sm",children:"Nginx"})]})]}),e.jsxs("div",{className:"bg-slate-950/40 border border-slate-800/80 rounded-xl p-5 space-y-4",children:[e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[e.jsx(t,{label:"Base Image:",id:"docker-base",value:l,onChange:a=>o(a.target.value),placeholder:"node:18-alpine"}),e.jsx(t,{label:"Working Directory:",id:"docker-workdir",value:D,onChange:a=>m(a.target.value),placeholder:"/app"})]}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[e.jsx(Y,{label:"Package Manager:",id:"docker-pkg",value:u,onChange:a=>r(a.target.value),options:z}),e.jsx(t,{label:"Exposed Port:",id:"docker-port",value:d,onChange:a=>i(a.target.value),placeholder:"3000"})]}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[e.jsx(t,{label:"Copy Source Path:",id:"docker-source",value:P,onChange:a=>j(a.target.value),placeholder:"."}),e.jsx(t,{label:"Copy Destination Path:",id:"docker-dest",value:w,onChange:a=>C(a.target.value),placeholder:"."})]}),e.jsx(t,{label:"Custom Install Command (e.g. RUN cmd):",id:"docker-install",value:y,onChange:a=>g(a.target.value),placeholder:"pip install -r requirements.txt"}),e.jsx(t,{label:"Custom Build Command:",id:"docker-build",value:v,onChange:a=>h(a.target.value),placeholder:"npm run build"}),e.jsx(t,{label:"Container Entry Start Command:",id:"docker-start",value:b,onChange:a=>c(a.target.value),placeholder:"npm start"}),e.jsx(I,{label:"Additional Script Runs (one command per line):",id:"docker-additional",value:N,onChange:a=>$(a.target.value),placeholder:`apt-get update
apt-get install -y curl`,rows:3})]})]}),e.jsx("div",{className:"lg:col-span-6",children:e.jsx(I,{label:"Generated Dockerfile File Output:",id:"dockerfile-output",value:x,readOnly:!0,placeholder:"Dockerfile output code will generate here...",rows:27})})]})]})})}export{V as default};
