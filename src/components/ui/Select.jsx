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
        <label htmlFor={id} className="block text-[11px] font-semibold text-slate-400 font-brand">
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700/80 text-xs text-white rounded-lg px-3.5 py-2.5 outline-none transition-all focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/25 cursor-pointer"
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#0F172A] text-white">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
