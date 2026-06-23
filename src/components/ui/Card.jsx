import React from "react";

export const Card = ({
  children,
  className = "",
  glow = false,
  ...props
}) => {
  return (
    <div
      className={`bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 rounded-xl p-6 shadow-sm relative overflow-hidden transition-all duration-300 ${
        glow ? "hover:border-neutral-300 dark:hover:border-slate-700 hover:shadow-md" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({
  title,
  icon = null,
  actions = null,
  className = "",
  ...props
}) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 dark:border-slate-800/60 pb-5 mb-5 select-none ${className}`} {...props}>
      <div className="flex items-center gap-3">
        {icon && <span className="text-xl text-neutral-850 dark:text-neutral-300 shrink-0">{icon}</span>}
        <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-brand tracking-tight">{title}</h2>
      </div>
      {actions && <div className="flex flex-wrap gap-2 shrink-0">{actions}</div>}
    </div>
  );
};
