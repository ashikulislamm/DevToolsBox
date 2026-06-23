import React from "react";

export const Select = ({
  label,
  id,
  value,
  onChange,
  options = [],
  required = false,
  className = "",
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 font-brand">
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-white dark:bg-slate-950 border border-neutral-200 dark:border-slate-800 hover:border-neutral-300 dark:hover:border-slate-700 text-xs text-neutral-900 dark:text-white rounded-lg px-3.5 py-2.5 outline-none transition-all focus:border-neutral-900 dark:focus:border-white focus:ring-2 focus:ring-neutral-900/5 dark:focus:ring-white/5 cursor-pointer"
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-white dark:bg-slate-900 text-neutral-900 dark:text-white">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
