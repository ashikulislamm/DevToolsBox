import React from "react";

export const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  icon = null,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-150 active:scale-98 select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer";
  
  const variants = {
    primary: "bg-[var(--accent-color)] hover:bg-[#9790f9] text-white shadow-sm border border-transparent",
    secondary: "bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700/60 shadow-xs",
    danger: "bg-rose-600 hover:bg-rose-700 text-white shadow-sm border border-transparent",
    outline: "bg-transparent border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800/40",
    ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-slate-850",
  };

  const sizes = {
    sm: "px-3 py-1.75 text-xs gap-1.5",
    md: "px-4 py-2.5 text-xs gap-2",
    lg: "px-6 py-3 text-sm gap-2.5",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
