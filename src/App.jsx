import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar.jsx";
import { Home } from "./pages/Home.jsx";
import { Footer } from "./components/Footer.jsx";
import { Contact } from "./pages/Contact.jsx";
import JsonFormatter from "./pages/tools/JsonFormatter.jsx";
import Base64Tool from "./pages/tools/Base64Tool.jsx";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools/json-formatter" element={<JsonFormatter />} />
        <Route path="/tools/base64" element={<Base64Tool />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
