import { lazy } from "react";
import { 
  FaCode, FaLock, FaKey, FaSearch, FaFileCode, FaDocker, 
  FaGitAlt, FaPalette, FaCss3Alt, FaEye, FaMarkdown, FaMobile, FaTerminal, FaClock
} from "react-icons/fa";

export const ALL_TOOLS = [
  {
    id: "json-formatter",
    title: "JSON Formatter & Validator",
    category: "Data Tools",
    path: "/DevToolsBox/tools/json-formatter",
    desc: "Format, minify, validate, and explore JSON data structures.",
    icon: FaCode,
    component: lazy(() => import("../pages/tools/JsonFormatter.jsx")),
    seo: {
      title: "Online JSON Formatter & Validator - DevToolsBox",
      description: "Pretty print, minify, validate, and explore JSON structures client-side in real-time.",
      keywords: "json formatter, json validator, pretty print json, minify json"
    }
  },
  {
    id: "base64",
    title: "Base64 Encoder/Decoder",
    category: "Data Tools",
    path: "/DevToolsBox/tools/base64",
    desc: "Encode text to Base64 format and decode Base64 back to plain text.",
    icon: FaLock,
    component: lazy(() => import("../pages/tools/Base64Tool.jsx")),
    seo: {
      title: "Base64 Encoder & Decoder - DevToolsBox",
      description: "Quickly encode plain text to Base64 format or decode Base64 data back to clear text safely in your browser.",
      keywords: "base64 encoder, base64 decoder, base64 utility"
    }
  },
  {
    id: "uuid",
    title: "UUID Generator",
    category: "Data Tools",
    path: "/DevToolsBox/tools/uuid",
    desc: "Generate unique v1 or v4 UUID/GUID tokens.",
    icon: FaKey,
    component: lazy(() => import("../pages/tools/UuidTool.jsx")),
    seo: {
      title: "UUID & GUID Generator - DevToolsBox",
      description: "Generate single or batch unique v1 or v4 UUID tokens client-side.",
      keywords: "uuid generator, guid generator, generate uuid, v4 uuid"
    }
  },
  {
    id: "regex",
    title: "Regex Tester",
    category: "Data Tools",
    path: "/DevToolsBox/tools/regex",
    desc: "Test regular expressions with syntax highlighting and match groups.",
    icon: FaSearch,
    component: lazy(() => import("../pages/tools/RegexTester.jsx")),
    seo: {
      title: "Regex Tester & Matcher - DevToolsBox",
      description: "Test your regular expressions in real-time with full match list outputs.",
      keywords: "regex tester, regular expression, regex matcher"
    }
  },
  {
    id: "jwt",
    title: "JWT Decoder",
    category: "Data Tools",
    path: "/DevToolsBox/tools/jwt",
    desc: "Decode and inspect JSON Web Tokens (JWT) headers and payloads.",
    icon: FaLock,
    component: lazy(() => import("../pages/tools/JwtDecoder.jsx")),
    seo: {
      title: "JWT Decoder & Inspector - DevToolsBox",
      description: "Decode headers, claims payloads, and validation details of any JSON Web Token (JWT) locally.",
      keywords: "jwt decoder, decode jwt, json web token"
    }
  },
  {
    id: "cron-tester",
    title: "Cron Expression Builder & Tester",
    category: "Data Tools",
    path: "/DevToolsBox/tools/cron-tester",
    desc: "Build, test, parse, and visualize cron expressions dynamically.",
    icon: FaClock,
    component: lazy(() => import("../pages/tools/CronTester.jsx")),
    seo: {
      title: "Online Cron Expression Builder & Tester - DevToolsBox",
      description: "Generate and test cron schedule expressions. View human-readable translations and next execution dates dynamically.",
      keywords: "cron builder, cron expression tester, crontab, cron generator, cron online"
    }
  },
  {
    id: "snippet-generator",
    title: "Snippet Generator",
    category: "Code Generators",
    path: "/DevToolsBox/tools/snippet-generator",
    desc: "Create VS Code, Sublime Text, or Atom reusable code snippets.",
    icon: FaFileCode,
    component: lazy(() => import("../pages/tools/SnippetGenerator.jsx")),
    seo: {
      title: "Code Snippet Generator - DevToolsBox",
      description: "Convert raw code blocks into reusable snippets for VS Code, Sublime Text, and Atom.",
      keywords: "snippet generator, vs code snippets, sublime snippets"
    }
  },
  {
    id: "dockerfile",
    title: "Dockerfile Templates",
    category: "Code Generators",
    path: "/DevToolsBox/tools/dockerfile",
    desc: "Generate optimized Dockerfiles for various technologies.",
    icon: FaDocker,
    component: lazy(() => import("../pages/tools/DockerfileGenerator.jsx")),
    seo: {
      title: "Dockerfile Template Generator - DevToolsBox",
      description: "Build production-ready Dockerfile configurations for Node.js, React, Python, or Nginx.",
      keywords: "dockerfile generator, docker templates, docker build helper"
    }
  },
  {
    id: "gitignore",
    title: ".gitignore Templates",
    category: "Code Generators",
    path: "/DevToolsBox/tools/gitignore",
    desc: "Generate standardized .gitignore files for your project.",
    icon: FaGitAlt,
    component: lazy(() => import("../pages/tools/GitignoreGenerator.jsx")),
    seo: {
      title: ".gitignore Generator - DevToolsBox",
      description: "Generate standard .gitignore configurations for languages and frameworks like Node, Python, and React.",
      keywords: "gitignore generator, gitignore templates, generate gitignore"
    }
  },
  {
    id: "css-gradient",
    title: "CSS Gradient Generator",
    category: "UI/Frontend Tools",
    path: "/DevToolsBox/tools/css-gradient",
    desc: "Create beautiful linear and radial CSS gradients visually.",
    icon: FaPalette,
    component: lazy(() => import("../pages/tools/CssGradientGenerator.jsx")),
    seo: {
      title: "CSS Gradient Generator - DevToolsBox",
      description: "Design and copy multi-color linear or radial CSS gradients with visual handles.",
      keywords: "css gradient generator, linear gradient, css background"
    }
  },
  {
    id: "css-animation",
    title: "CSS Animation Generator",
    category: "UI/Frontend Tools",
    path: "/DevToolsBox/tools/css-animation",
    desc: "Create keyframe-based CSS transitions and animations.",
    icon: FaCss3Alt,
    component: lazy(() => import("../pages/tools/CssAnimationGenerator.jsx")),
    seo: {
      title: "CSS Keyframe Animation Generator - DevToolsBox",
      description: "Generate CSS keyframes, bounce/pulse presets, and transition codes visually.",
      keywords: "css animation generator, css keyframes, css transitions"
    }
  },
  {
    id: "tailwind-visualizer",
    title: "Tailwind Visualizer",
    category: "UI/Frontend Tools",
    path: "/DevToolsBox/tools/tailwind-visualizer",
    desc: "Preview and copy utility classes in real-time.",
    icon: FaEye,
    component: lazy(() => import("../pages/tools/TailwindVisualizer.jsx")),
    seo: {
      title: "Tailwind CSS Class Visualizer - DevToolsBox",
      description: "Input Tailwind CSS classes to preview components responsively across viewport breakpoints.",
      keywords: "tailwind visualizer, tailwind preview, tailwind css"
    }
  },
  {
    id: "color-palette",
    title: "Color Palette Generator",
    category: "UI/Frontend Tools",
    path: "/DevToolsBox/tools/color-palette",
    desc: "Generate complementary, analogous, or triadic color schemes.",
    icon: FaPalette,
    component: lazy(() => import("../pages/tools/ColorPaletteGenerator.jsx")),
    seo: {
      title: "Color Palette Generator - DevToolsBox",
      description: "Generate beautiful complementary, analogous, or triadic color schemes.",
      keywords: "color palette generator, color picker, color scheme"
    }
  },
  {
    id: "markdown-html",
    title: "Markdown to HTML Converter",
    category: "UI/Frontend Tools",
    path: "/DevToolsBox/tools/markdown-html",
    desc: "Convert rich Markdown files into clean semantic HTML syntax.",
    icon: FaMarkdown,
    component: lazy(() => import("../pages/tools/MarkdownToHtml.jsx")),
    seo: {
      title: "Markdown to HTML Converter - DevToolsBox",
      description: "Convert rich markdown syntax into clean semantic HTML code with preview screens.",
      keywords: "markdown to html, md to html, html generator"
    }
  },
  {
    id: "responsive-design-tester",
    title: "Responsive Design Tester",
    category: "UI/Frontend Tools",
    path: "/DevToolsBox/tools/responsive-design-tester",
    desc: "Preview your web layout across mobile, tablet, and desktop breakpoints.",
    icon: FaMobile,
    component: lazy(() => import("../pages/tools/ResponsiveDesignTester.jsx")),
    seo: {
      title: "Responsive Web Design Tester - DevToolsBox",
      description: "Test responsive breakpoints for any public URL on virtual mobile, tablet, and desktop viewport sizes.",
      keywords: "responsive tester, responsive design, test mobile viewport"
    }
  }
];

export const getToolIcon = (id) => {
  const tool = ALL_TOOLS.find(t => t.id === id);
  if (tool && tool.icon) {
    const IconComponent = tool.icon;
    return <IconComponent className="w-3.5 h-3.5" />;
  }
  return <FaTerminal className="w-3.5 h-3.5" />;
};
