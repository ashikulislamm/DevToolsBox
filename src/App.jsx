import { useState, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar.jsx";
import { Home } from "./pages/Home.jsx";
import { Footer } from "./components/Footer.jsx";
import { Contact } from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import { WorkspaceLayout } from "./components/WorkspaceLayout.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ErrorBoundary } from "./components/ErrorBoundary.jsx";
import { SEOManager } from "./components/SEOManager.jsx";
import { ALL_TOOLS } from "./config/tools.jsx";

// High-fidelity skeleton loader for chunk fetching states
const ToolSkeleton = () => (
  <div className="flex-1 flex flex-col p-6 animate-pulse space-y-6 min-h-[450px] bg-bg-main">
    <div className="flex justify-between items-center pb-5 border-b border-border-subtle">
      <div className="h-8 bg-slate-200 rounded-lg w-1/3"></div>
      <div className="h-8 bg-slate-200 rounded-lg w-1/4"></div>
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="h-72 bg-bg-card rounded-xl border border-border-subtle"></div>
      <div className="h-72 bg-bg-card rounded-xl border border-border-subtle"></div>
    </div>
  </div>
);

function AppContent() {
  const location = useLocation();
  const isToolPage = location.pathname.startsWith("/DevToolsBox/tools");

  return (
    <div className="min-h-screen flex flex-col bg-bg-main">
      <SEOManager />
      <Navbar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          {/* Main Pages */}
          <Route path="/DevToolsBox" element={<Home />} />
          <Route path="/DevToolsBox/about" element={<About />} />
          <Route path="/DevToolsBox/contact" element={<Contact />} />

          {/* Nested Tool Workspace Routing */}
          <Route element={<WorkspaceLayout />}>
            {ALL_TOOLS.map((tool) => {
              const ToolComponent = tool.component;
              return (
                <Route
                  key={tool.id}
                  path={tool.path}
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<ToolSkeleton />}>
                        <ToolComponent />
                      </Suspense>
                    </ErrorBoundary>
                  }
                />
              );
            })}
          </Route>
        </Routes>
      </main>
      {!isToolPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <AppContent />
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
