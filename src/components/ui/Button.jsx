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
    primary: "bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 text-white dark:text-neutral-900 shadow-sm border border-transparent",
    secondary: "bg-white dark:bg-slate-900 hover:bg-neutral-50 dark:hover:bg-slate-800 text-neutral-900 dark:text-white border border-neutral-900 dark:border-slate-700 shadow-xs",
    danger: "bg-rose-600 hover:bg-rose-700 text-white shadow-sm border border-transparent",
    outline: "bg-transparent border border-neutral-200 dark:border-slate-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-slate-800/60",
    ghost: "bg-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-105 dark:hover:bg-slate-850/60",
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
