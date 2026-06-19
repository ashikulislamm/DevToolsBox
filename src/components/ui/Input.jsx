import React from "react";

export const Input = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  error = "",
  className = "",
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-[11px] font-semibold text-slate-400 font-brand">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full bg-slate-950 border border-slate-800 hover:border-slate-700/80 text-xs text-white placeholder:text-slate-700 rounded-lg px-3.5 py-2.5 outline-none transition-all focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20 ${
          error ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20" : ""
        }`}
        {...props}
      />
      {error && (
        <span className="text-[10px] text-rose-500 font-medium mt-0.5">{error}</span>
      )}
    </div>
  );
};
