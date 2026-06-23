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
        <label htmlFor={id} className="block text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 font-brand">
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
        className={`w-full bg-white dark:bg-slate-950 border border-neutral-200 dark:border-slate-800 hover:border-neutral-300 dark:hover:border-slate-700 text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 rounded-lg px-3.5 py-2.5 outline-none transition-all focus:border-neutral-900 dark:focus:border-white focus:ring-2 focus:ring-neutral-900/5 dark:focus:ring-white/5 ${
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
