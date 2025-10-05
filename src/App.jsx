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
import About from "./pages/About.jsx";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools/json-formatter" element={<JsonFormatter />} />
            <Route path="/tools/base64" element={<Base64Tool />} />
            <Route path="/tools/uuid" element={<UuidTool />} />
            <Route path="/tools/regex" element={<RegexTester />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
