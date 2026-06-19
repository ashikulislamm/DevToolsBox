import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ALL_TOOLS } from "../config/tools.jsx";

export const SEOManager = () => {
  const location = useLocation();

  useEffect(() => {
    const currentTool = ALL_TOOLS.find(t => location.pathname === t.path);
    if (currentTool && currentTool.seo) {
      document.title = currentTool.seo.title;
      updateMeta("description", currentTool.seo.description);
      updateMeta("og:title", currentTool.seo.title, true);
      updateMeta("og:description", currentTool.seo.description, true);
    } else {
      let title = "DevToolsBox - Free Client-Side Developer Utilities";
      let desc = "Safe and secure developer tools box running entirely in-browser. Format JSON, encode Base64, generate UUIDs, test Regex, and more.";
      
      if (location.pathname === "/DevToolsBox/about") {
        title = "About DevToolsBox - Open Source Tools";
        desc = "Discover how DevToolsBox executes secure formatters and encoders client-side.";
      } else if (location.pathname === "/DevToolsBox/contact") {
        title = "Contact DevToolsBox - Support & Feedback";
        desc = "Connect with the developers of DevToolsBox to request features or report bugs.";
      }
      
      document.title = title;
      updateMeta("description", desc);
      updateMeta("og:title", title, true);
      updateMeta("og:description", desc, true);
    }
  }, [location]);

  const updateMeta = (name, content, isProperty = false) => {
    const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let element = document.querySelector(selector);
    if (!element) {
      element = document.createElement("meta");
      if (isProperty) {
        element.setAttribute("property", name);
      } else {
        element.name = name;
      }
      document.head.appendChild(element);
    }
    element.content = content;
  };

  return null;
};
