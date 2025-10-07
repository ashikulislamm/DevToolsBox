import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar.jsx";
import { Home } from "./pages/Home.jsx";
import { Footer } from "./components/Footer.jsx";
import { Contact } from "./pages/Contact.jsx";
import JsonFormatter from "./pages/tools/JsonFormatter.jsx";
import Base64Tool from "./pages/tools/Base64Tool.jsx";
import UuidTool from "./pages/tools/UuidTool.jsx";
import RegexTester from "./pages/tools/RegexTester.jsx";
import JwtDecoder from "./pages/tools/JwtDecoder.jsx";
import About from "./pages/About.jsx";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/DevToolsBox" element={<Home />} />
            <Route path="/DevToolsBox/tools/json-formatter" element={<JsonFormatter />} />
            <Route path="/DevToolsBox/tools/base64" element={<Base64Tool />} />
            <Route path="/DevToolsBox/tools/uuid" element={<UuidTool />} />
            <Route path="/DevToolsBox/tools/regex" element={<RegexTester />} />
            <Route path="/DevToolsBox/tools/jwt" element={<JwtDecoder />} />
            <Route path="/DevToolsBox/about" element={<About />} />
            <Route path="/DevToolsBox/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
