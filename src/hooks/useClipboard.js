import { useCallback } from "react";
import { useToast } from "../context/ToastContext.jsx";

export const useClipboard = () => {
  const { showToast } = useToast();

  const copy = useCallback(async (text, label = "Content") => {
    if (!text || text.trim() === "") {
      showToast(`❌ No ${label.toLowerCase()} to copy!`, "error");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      showToast(`📋 ${label} copied to clipboard!`, "success");
      return true;
    } catch (err) {
      console.error("Clipboard copy failure:", err);
      showToast(`❌ Failed to copy ${label.toLowerCase()} to clipboard`, "error");
      return false;
    }
  }, [showToast]);

  return { copy };
};
