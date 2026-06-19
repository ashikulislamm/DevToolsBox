import React from "react";

export const Card = ({
  children,
  className = "",
  glow = false,
  ...props
}) => {
  return (
    <div
      className={`bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden transition-all duration-300 ${
        glow ? "hover:border-slate-700 hover:shadow-xl hover:shadow-[#847cfa]/5" : ""
      } ${className}`}
      {...props}
    >
      {glow && (
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-color)]/5 rounded-full blur-3xl pointer-events-none" />
      )}
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
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-5 mb-5 select-none ${className}`} {...props}>
      <div className="flex items-center gap-3">
        {icon && <span className="text-xl text-[var(--accent-color)] shrink-0">{icon}</span>}
        <h2 className="text-lg font-bold text-white font-brand tracking-tight">{title}</h2>
      </div>
      {actions && <div className="flex flex-wrap gap-2 shrink-0">{actions}</div>}
    </div>
  );
};
