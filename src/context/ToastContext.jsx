import React, { createContext, useState, useContext, useCallback } from "react";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from "react-icons/fa";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    
    setToasts((prev) => [...prev, { id, message, type }]);

    // Automatically dismiss toast after 3 seconds
    setTimeout(() => {
      dismissToast(id);
    }, 3000);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      
      {/* Toast Alert View Overlay Container */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none select-none">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Isolated individual animated item component
const ToastItem = ({ toast, onDismiss }) => {
  const { id, message, type } = toast;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />;
      case "error":
        return <FaExclamationCircle className="w-4 h-4 text-rose-400 shrink-0" />;
      default:
        return <FaInfoCircle className="w-4 h-4 text-sky-400 shrink-0" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "success": return "bg-[#061B14] border-emerald-950/80";
      case "error": return "bg-[#250E12] border-rose-950/80";
      default: return "bg-[#091523] border-sky-950/80";
    }
  };

  const getTextColor = () => {
    switch (type) {
      case "success": return "text-emerald-300";
      case "error": return "text-rose-300";
      default: return "text-sky-300";
    }
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border pointer-events-auto shadow-xl animate-slide-in-right ${getBgColor()} ${getTextColor()}`}
    >
      <div className="mt-0.5">{getIcon()}</div>
      <p className="text-xs font-semibold leading-relaxed flex-1">{message}</p>
      <button
        onClick={() => onDismiss(id)}
        className="text-slate-400 hover:text-white transition-colors p-0.5 rounded cursor-pointer shrink-0"
      >
        <FaTimes className="w-3 h-3" />
      </button>
    </div>
  );
};
