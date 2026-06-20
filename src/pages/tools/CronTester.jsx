import React, { useState, useEffect } from "react";
import { Card, CardHeader } from "../../components/ui/Card.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { Input } from "../../components/ui/Input.jsx";
import { Select } from "../../components/ui/Select.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { useClipboard } from "../../hooks/useClipboard.js";
import { FaClock, FaTrash, FaInfoCircle, FaCheckCircle, FaTimesCircle, FaCopy, FaCalendarAlt } from "react-icons/fa";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAY_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

// Helper: Format number with leading zero
const pad = (n) => (n < 10 ? `0${n}` : n);

// Custom validation and sets calculator
function getCronSets(cronStr) {
  const fields = cronStr.trim().split(/\s+/);
  if (fields.length !== 5) {
    throw new Error("A cron expression must contain exactly 5 fields (minute, hour, day of month, month, day of week).");
  }

  const parseField = (field, min, max, namesMap = null) => {
    const values = new Set();
    let normalized = field.toLowerCase();
    
    if (namesMap) {
      namesMap.forEach((name, index) => {
        normalized = normalized.replaceAll(name.toLowerCase().substring(0, 3), index);
      });
    }

    if (min === 0 && max === 6) {
      // standard cron treat 7 as Sunday (0)
      normalized = normalized.replaceAll("7", "0");
    }

    const parts = normalized.split(",");
    for (const part of parts) {
      if (part === "*") {
        for (let i = min; i <= max; i++) values.add(i);
      } else if (part.includes("/")) {
        const [range, stepStr] = part.split("/");
        const step = parseInt(stepStr, 10);
        if (isNaN(step) || step <= 0) throw new Error("Invalid step interval");

        let start = min, end = max;
        if (range !== "*") {
          if (range.includes("-")) {
            const [startStr, endStr] = range.split("-");
            start = parseInt(startStr, 10);
            end = parseInt(endStr, 10);
          } else {
            start = parseInt(range, 10);
          }
        }

        if (isNaN(start) || isNaN(end) || start < min || end > max || start > end) {
          throw new Error(`Invalid range/value: ${part}`);
        }

        for (let i = start; i <= end; i += step) {
          values.add(i);
        }
      } else if (part.includes("-")) {
        const [startStr, endStr] = part.split("-");
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (isNaN(start) || isNaN(end) || start < min || end > max || start > end) {
          throw new Error(`Invalid range: ${part}`);
        }
        for (let i = start; i <= end; i++) {
          values.add(i);
        }
      } else {
        const val = parseInt(part, 10);
        if (isNaN(val) || val < min || val > max) {
          throw new Error(`Invalid value: ${part}`);
        }
        values.add(val);
      }
    }
    return values;
  };

  const minutes = parseField(fields[0], 0, 59);
  const hours = parseField(fields[1], 0, 23);
  const dom = parseField(fields[2], 1, 31);
  const months = parseField(fields[3], 1, 12, MONTH_NAMES);
  const dow = parseField(fields[4], 0, 6, WEEKDAY_NAMES);

  const isDOMRestricted = fields[2] !== "*";
  const isDOWRestricted = fields[4] !== "*";

  return { minutes, hours, dom, months, dow, isDOMRestricted, isDOWRestricted };
}

// Next executions calculator
function calculateNextRuns(cronStr, maxCount = 5) {
  const { minutes, hours, dom, months, dow, isDOMRestricted, isDOWRestricted } = getCronSets(cronStr);
  const nextRuns = [];
  const start = new Date();
  start.setSeconds(0);
  start.setMilliseconds(0);

  let current = new Date(start.getTime() + 60 * 1000);
  let count = 0;
  const limit = 2628000; // 5 years check limit
  let checked = 0;

  while (count < maxCount && checked < limit) {
    const month = current.getMonth() + 1;
    if (!months.has(month)) {
      current.setMonth(current.getMonth() + 1);
      current.setDate(1);
      current.setHours(0);
      current.setMinutes(0);
      checked += 60;
      continue;
    }

    const curDom = current.getDate();
    const curDow = current.getDay();

    let dayMatch = false;
    if (isDOMRestricted && isDOWRestricted) {
      dayMatch = dom.has(curDom) || dow.has(curDow);
    } else if (isDOMRestricted) {
      dayMatch = dom.has(curDom);
    } else if (isDOWRestricted) {
      dayMatch = dow.has(curDow);
    } else {
      dayMatch = true;
    }

    if (!dayMatch) {
      current.setDate(current.getDate() + 1);
      current.setHours(0);
      current.setMinutes(0);
      checked += 1440;
      continue;
    }

    const hour = current.getHours();
    if (!hours.has(hour)) {
      current.setHours(current.getHours() + 1);
      current.setMinutes(0);
      checked += 60;
      continue;
    }

    const minute = current.getMinutes();
    if (minutes.has(minute)) {
      nextRuns.push(new Date(current));
      count++;
    }

    current.setTime(current.getTime() + 60 * 1000);
    checked++;
  }

  return nextRuns;
}

// Single-field visual descriptor helpers
function getFieldDescription(field, type, nameMap = null) {
  if (field === "*") {
    if (type === "minute") return "every minute";
    if (type === "hour") return "every hour";
    if (type === "dayOfMonth") return "every day";
    if (type === "month") return "every month";
    return "every day of the week";
  }

  if (field.startsWith("*/")) {
    const step = field.slice(2);
    return `every ${step} ${type === "dayOfMonth" ? "day" : type === "dayOfWeek" ? "day of the week" : type}`;
  }

  const getPartDescription = (part) => {
    if (part.includes("/")) {
      const [range, step] = part.split("/");
      const rangeDesc = getPartDescription(range);
      return `every ${step} ${type}s within ${rangeDesc}`;
    }
    if (part.includes("-")) {
      const [start, end] = part.split("-");
      const startName = nameMap ? nameMap[parseInt(start, 10)] || start : start;
      const endName = nameMap ? nameMap[parseInt(end, 10)] || end : end;
      if (type === "hour") {
        return `from ${formatHour(start)} to ${formatHour(end)}`;
      }
      return `from ${startName} to ${endName}`;
    }
    const val = parseInt(part, 10);
    if (nameMap) {
      return nameMap[val] || part;
    }
    if (type === "hour") {
      return formatHour(val);
    }
    if (type === "minute") {
      return `minute ${val}`;
    }
    return part;
  };

  if (field.includes(",")) {
    const parts = field.split(",");
    const mapped = parts.map(p => getPartDescription(p));
    if (mapped.length > 2) {
      return `${mapped.slice(0, -1).join(", ")}, and ${mapped[mapped.length - 1]}`;
    }
    return mapped.join(" and ");
  }

  return getPartDescription(field);
}

function formatHour(valStr) {
  const val = parseInt(valStr, 10);
  if (isNaN(val)) return valStr;
  const ampm = val >= 12 ? "PM" : "AM";
  const displayHour = val % 12 === 0 ? 12 : val % 12;
  return `${displayHour} ${ampm}`;
}

// Generate complete human sentence
function describeCron(cronStr) {
  const fields = cronStr.trim().split(/\s+/);
  if (fields.length !== 5) return "Invalid cron expression.";

  const [minutes, hours, dom, months, dow] = fields;
  let timeStr = "";

  // Beautify clean exact time configurations like (0 12 * * *)
  const isSimpleMinutes = !minutes.includes(",") && !minutes.includes("-") && !minutes.includes("/") && minutes !== "*";
  const isSimpleHours = !hours.includes(",") && !hours.includes("-") && !hours.includes("/") && hours !== "*";

  if (isSimpleMinutes && isSimpleHours) {
    const m = parseInt(minutes, 10);
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const displayH = h % 12 === 0 ? 12 : h % 12;
    const displayM = pad(m);
    timeStr = `At ${displayH}:${displayM} ${ampm}`;
  } else {
    const mDesc = getFieldDescription(minutes, "minute");
    const hDesc = getFieldDescription(hours, "hour");
    timeStr = `${mDesc} of ${hDesc}`;
  }

  const domDesc = getFieldDescription(dom, "dayOfMonth");
  const monthDesc = getFieldDescription(months, "month", [
    "", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]);
  const dowDesc = getFieldDescription(dow, "dayOfWeek", WEEKDAY_NAMES);

  let sentence = "";
  if (dom === "*" && dow === "*") {
    sentence = `${timeStr}, every day`;
  } else if (dom !== "*" && dow === "*") {
    sentence = `${timeStr}, on ${domDesc}`;
  } else if (dom === "*" && dow !== "*") {
    sentence = `${timeStr}, only on ${dowDesc}`;
  } else {
    sentence = `${timeStr}, on ${domDesc} or ${dowDesc}`;
  }

  if (months !== "*") {
    sentence += `, in ${monthDesc}`;
  } else {
    sentence += `, of every month`;
  }

  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
}

// Convert individual field string to visual state representation
function parseFieldToState(fieldStr, min, max) {
  if (fieldStr === "*") {
    return { mode: "every", step: "1", start: min.toString(), end: min.toString(), values: [] };
  }
  if (fieldStr.startsWith("*/")) {
    const step = fieldStr.slice(2);
    return { mode: "interval", step, start: min.toString(), end: max.toString(), values: [] };
  }
  if (fieldStr.includes("/")) {
    const [range, step] = fieldStr.split("/");
    const [start, end] = range.includes("-") ? range.split("-") : [range, max.toString()];
    return { mode: "interval", step, start, end, values: [] };
  }
  if (fieldStr.includes(",")) {
    const values = fieldStr.split(",").map(v => parseInt(v, 10)).filter(v => !isNaN(v));
    return { mode: "specific", step: "1", start: min.toString(), end: min.toString(), values };
  }
  if (fieldStr.includes("-")) {
    const [start, end] = fieldStr.split("-");
    return { mode: "range", step: "1", start, end, values: [] };
  }
  const singleVal = parseInt(fieldStr, 10);
  if (!isNaN(singleVal)) {
    return { mode: "specific", step: "1", start: min.toString(), end: min.toString(), values: [singleVal] };
  }
  return { mode: "every", step: "1", start: min.toString(), end: min.toString(), values: [] };
}

// Convert visual state back to field string
function stateToFieldStr(state, min, max) {
  const { mode, step, start, end, values } = state;
  if (mode === "every") return "*";
  if (mode === "interval") {
    const stepNum = parseInt(step, 10) || 1;
    if (parseInt(start, 10) === min && parseInt(end, 10) === max) {
      return `*/${stepNum}`;
    }
    return `${start}-${end}/${stepNum}`;
  }
  if (mode === "range") {
    const s = parseInt(start, 10) || min;
    const e = parseInt(end, 10) || max;
    return s > e ? `${e}-${s}` : `${s}-${e}`;
  }
  if (mode === "specific") {
    if (values.length === 0) return "*";
    const sorted = [...values].sort((a, b) => a - b);
    return sorted.join(",");
  }
  return "*";
}

const PRESETS = [
  { label: "Choose a Preset...", value: "" },
  { label: "Every Minute", value: "* * * * *" },
  { label: "Every 5 Minutes", value: "*/5 * * * *" },
  { label: "Every Hour", value: "0 * * * *" },
  { label: "Daily at Midnight (12:00 AM)", value: "0 0 * * *" },
  { label: "Daily at noon (12:00 PM)", value: "0 12 * * *" },
  { label: "Weekly on Sundays at Midnight", value: "0 0 * * 0" },
  { label: "Every Weekday (Mon-Fri) at 9:00 AM", value: "0 9 * * 1-5" },
  { label: "First day of Month at Midnight", value: "0 0 1 * *" }
];

export default function CronTester() {
  const { showToast } = useToast();
  const { copy } = useClipboard();

  const [cronExpression, setCronExpression] = useState("*/5 * * * *");
  const [preset, setPreset] = useState("*/5 * * * *");
  
  const [activeTab, setActiveTab] = useState("minute");
  const [explanation, setExplanation] = useState("");
  const [nextRuns, setNextRuns] = useState([]);
  const [error, setError] = useState("");

  // Detailed visual state map for each of the 5 fields
  const [visualStates, setVisualStates] = useState({
    minute: { mode: "interval", step: "5", start: "0", end: "59", values: [] },
    hour: { mode: "every", step: "1", start: "0", end: "23", values: [] },
    dom: { mode: "every", step: "1", start: "1", end: "31", values: [] },
    month: { mode: "every", step: "1", start: "1", end: "12", values: [] },
    dow: { mode: "every", step: "1", start: "0", end: "6", values: [] }
  });

  // Re-calculate explanation and next runs on cron expression change
  useEffect(() => {
    if (!cronExpression.trim()) {
      setError("Expression is empty.");
      setExplanation("");
      setNextRuns([]);
      return;
    }

    try {
      setError("");
      const desc = describeCron(cronExpression);
      setExplanation(desc);

      const runs = calculateNextRuns(cronExpression);
      setNextRuns(runs);
    } catch (err) {
      setError(err.message);
      setExplanation("");
      setNextRuns([]);
    }
  }, [cronExpression]);

  // Synchronize visual state when text expression changes
  const syncVisualFromExpression = (expr) => {
    const fields = expr.trim().split(/\s+/);
    if (fields.length !== 5) return;

    setVisualStates({
      minute: parseFieldToState(fields[0], 0, 59),
      hour: parseFieldToState(fields[1], 0, 23),
      dom: parseFieldToState(fields[2], 1, 31),
      month: parseFieldToState(fields[3], 1, 12),
      dow: parseFieldToState(fields[4], 0, 6)
    });
  };

  // Run initial synchronisation
  useEffect(() => {
    syncVisualFromExpression(cronExpression);
  }, []);

  const handleTextChange = (e) => {
    const val = e.target.value;
    setCronExpression(val);
    setPreset(""); // Clear preset on manual typing
    syncVisualFromExpression(val);
  };

  const handlePresetChange = (e) => {
    const val = e.target.value;
    setPreset(val);
    if (val) {
      setCronExpression(val);
      syncVisualFromExpression(val);
      showToast("Preset loaded!", "success");
    }
  };

  // Update visual state and rebuild text string
  const updateVisualFieldState = (fieldKey, updatedState) => {
    const newStates = {
      ...visualStates,
      [fieldKey]: { ...visualStates[fieldKey], ...updatedState }
    };
    setVisualStates(newStates);

    // Build fields
    const m = stateToFieldStr(newStates.minute, 0, 59);
    const h = stateToFieldStr(newStates.hour, 0, 23);
    const domVal = stateToFieldStr(newStates.dom, 1, 31);
    const mon = stateToFieldStr(newStates.month, 1, 12);
    const dowVal = stateToFieldStr(newStates.dow, 0, 6);

    const fullExpr = `${m} ${h} ${domVal} ${mon} ${dowVal}`;
    setCronExpression(fullExpr);
    setPreset("");
  };

  const toggleSpecificValue = (fieldKey, val, limit) => {
    const currentVals = visualStates[fieldKey].values;
    let newVals = [];
    if (currentVals.includes(val)) {
      newVals = currentVals.filter(v => v !== val);
    } else {
      newVals = [...currentVals, val];
    }
    updateVisualFieldState(fieldKey, { values: newVals });
  };

  const copyExpr = () => {
    copy(cronExpression, "Cron Expression");
  };

  const clearAll = () => {
    setCronExpression("* * * * *");
    setPreset("* * * * *");
    setVisualStates({
      minute: { mode: "every", step: "1", start: "0", end: "59", values: [] },
      hour: { mode: "every", step: "1", start: "0", end: "23", values: [] },
      dom: { mode: "every", step: "1", start: "1", end: "31", values: [] },
      month: { mode: "every", step: "1", start: "1", end: "12", values: [] },
      dow: { mode: "every", step: "1", start: "0", end: "6", values: [] }
    });
    showToast("Cleared workspace to * * * * *", "success");
  };

  // Field characteristics configuration
  const fieldConfig = {
    minute: { label: "Minutes", min: 0, max: 59 },
    hour: { label: "Hours", min: 0, max: 23 },
    dom: { label: "Day of Month", min: 1, max: 31 },
    month: { label: "Month", min: 1, max: 12 },
    dow: { label: "Day of Week", min: 0, max: 6 }
  };

  const currentField = fieldConfig[activeTab];
  const currentState = visualStates[activeTab];

  // Helper arrays for populating ranges
  const rangeNumbers = Array.from({ length: currentField.max - currentField.min + 1 }, (_, i) => currentField.min + i);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <Card glow={true}>
        <CardHeader
          title="Cron Expression Builder & Tester"
          icon={<FaClock />}
          actions={
            <>
              <Button onClick={copyExpr} variant="secondary" size="sm" icon={<FaCopy />} disabled={!!error}>
                Copy Expression
              </Button>
              <Button onClick={clearAll} variant="danger" size="sm" icon={<FaTrash />}>
                Reset
              </Button>
            </>
          }
        />

        {/* Setup and Presets */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <Input
              label="Cron Expression (Minute Hour Day-of-Month Month Day-of-Week):"
              id="cron-expr-input"
              value={cronExpression}
              onChange={handleTextChange}
              placeholder="e.g. */5 * * * *"
              className="font-mono text-sm tracking-widest text-indigo-400"
            />
          </div>
          <div>
            <Select
              label="Choose a Template Preset:"
              id="cron-preset"
              value={preset}
              onChange={handlePresetChange}
              options={PRESETS}
            />
          </div>
        </div>

        {/* Builder / Visual Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Visual Builder Section */}
          <div className="col-span-12 lg:col-span-8 bg-[#0a0f1d] border border-slate-900 rounded-xl overflow-hidden shadow-inner">
            {/* Tabs Headers */}
            <div className="flex border-b border-slate-900 bg-slate-950/40 text-xs font-semibold text-slate-400 select-none">
              {Object.keys(fieldConfig).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex-1 py-3.5 text-center cursor-pointer transition-all border-b-2 ${
                    activeTab === key
                      ? "text-[var(--accent-color)] border-[var(--accent-color)] bg-slate-900/40"
                      : "border-transparent hover:text-slate-200 hover:bg-slate-900/10"
                  }`}
                >
                  {fieldConfig[key].label}
                </button>
              ))}
            </div>

            {/* Tab Body */}
            <div className="p-6 space-y-6">
              {/* Builder Mode Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/50 p-1.5 rounded-lg border border-slate-900">
                {["every", "interval", "specific", "range"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => updateVisualFieldState(activeTab, { mode })}
                    className={`py-2 px-3 text-[11px] font-bold rounded-md capitalize cursor-pointer transition-all ${
                      currentState.mode === mode
                        ? "bg-[var(--accent-color)] text-white shadow-md"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
                    }`}
                  >
                    {mode === "every" ? `Every ${currentField.label.replace("s", "")}` : mode}
                  </button>
                ))}
              </div>

              {/* Mode-Specific Settings */}
              <div className="p-4 bg-slate-950/20 border border-slate-900/80 rounded-xl min-h-[160px] flex items-center justify-center">
                
                {/* EVERY MODE */}
                {currentState.mode === "every" && (
                  <div className="text-center space-y-2 select-none">
                    <FaInfoCircle className="w-6 h-6 text-slate-500 mx-auto" />
                    <p className="text-slate-400 text-xs font-medium">
                      Runs on every single value of <span className="text-[var(--accent-color)] font-semibold">{currentField.label.toLowerCase()}</span>.
                    </p>
                  </div>
                )}

                {/* INTERVAL MODE */}
                {currentState.mode === "interval" && (
                  <div className="w-full space-y-4">
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1.5 font-brand">Step Value:</label>
                        <input
                          type="number"
                          min="1"
                          max={currentField.max}
                          value={currentState.step}
                          onChange={(e) => updateVisualFieldState(activeTab, { step: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700/80 text-xs text-white rounded-lg px-3 py-2 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1.5 font-brand">Start Range:</label>
                        <select
                          value={currentState.start}
                          onChange={(e) => updateVisualFieldState(activeTab, { start: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700/80 text-xs text-white rounded-lg px-3 py-2 outline-none cursor-pointer"
                        >
                          {rangeNumbers.map(n => (
                            <option key={n} value={n}>
                              {activeTab === "month" ? MONTH_NAMES[n-1] : activeTab === "dow" ? WEEKDAY_NAMES[n] : n}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1.5 font-brand">End Range:</label>
                        <select
                          value={currentState.end}
                          onChange={(e) => updateVisualFieldState(activeTab, { end: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700/80 text-xs text-white rounded-lg px-3 py-2 outline-none cursor-pointer"
                        >
                          {rangeNumbers.map(n => (
                            <option key={n} value={n}>
                              {activeTab === "month" ? MONTH_NAMES[n-1] : activeTab === "dow" ? WEEKDAY_NAMES[n] : n}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 italic">
                      Runs every {currentState.step} {currentField.label.toLowerCase()} between {currentState.start} and {currentState.end}.
                    </p>
                  </div>
                )}

                {/* RANGE MODE */}
                {currentState.mode === "range" && (
                  <div className="w-full grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1.5 font-brand">From:</label>
                      <select
                        value={currentState.start}
                        onChange={(e) => updateVisualFieldState(activeTab, { start: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700/80 text-xs text-white rounded-lg px-3 py-2 outline-none cursor-pointer"
                      >
                        {rangeNumbers.map(n => (
                          <option key={n} value={n}>
                            {activeTab === "month" ? MONTH_NAMES[n-1] : activeTab === "dow" ? WEEKDAY_NAMES[n] : n}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1.5 font-brand">To:</label>
                      <select
                        value={currentState.end}
                        onChange={(e) => updateVisualFieldState(activeTab, { end: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700/80 text-xs text-white rounded-lg px-3 py-2 outline-none cursor-pointer"
                      >
                        {rangeNumbers.map(n => (
                          <option key={n} value={n}>
                            {activeTab === "month" ? MONTH_NAMES[n-1] : activeTab === "dow" ? WEEKDAY_NAMES[n] : n}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* SPECIFIC SELECTION */}
                {currentState.mode === "specific" && (
                  <div className="w-full py-2">
                    <div className={`grid gap-2 ${
                      activeTab === "minute" ? "grid-cols-6 sm:grid-cols-10" :
                      activeTab === "hour" ? "grid-cols-6 sm:grid-cols-8" :
                      activeTab === "dom" ? "grid-cols-5 sm:grid-cols-7" :
                      activeTab === "month" ? "grid-cols-3 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-4"
                    }`}>
                      {rangeNumbers.map((num) => {
                        const isChecked = currentState.values.includes(num);
                        let displayLabel = num.toString();
                        if (activeTab === "month") displayLabel = MONTH_NAMES[num-1].substring(0, 3);
                        if (activeTab === "dow") displayLabel = WEEKDAY_NAMES[num].substring(0, 3);

                        return (
                          <button
                            key={num}
                            onClick={() => toggleSpecificValue(activeTab, num, currentField.max)}
                            className={`py-1.5 px-1 rounded text-[10px] font-semibold font-mono cursor-pointer transition-all border ${
                              isChecked
                                ? "bg-[var(--accent-color)] text-white border-transparent shadow-sm"
                                : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                            }`}
                          >
                            {displayLabel}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* Tester / Output Summary */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            
            {/* Live Status Description */}
            <div className="bg-[#0a0f1d] border border-slate-900 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-300 font-brand flex items-center gap-2">
                {error ? (
                  <FaTimesCircle className="text-rose-500 w-4 h-4" />
                ) : (
                  <FaCheckCircle className="text-emerald-500 w-4 h-4" />
                )}
                Status: {error ? "Invalid Syntax" : "Valid Expression"}
              </h3>
              
              <div className="bg-slate-950 rounded-lg p-3 border border-slate-900/60 min-h-[90px] flex items-center justify-center">
                {error ? (
                  <p className="text-rose-400 text-xs font-mono select-text text-center">{error}</p>
                ) : (
                  <p className="text-indigo-200 text-xs leading-relaxed select-text font-medium text-center">
                    {explanation || "Generating translation..."}
                  </p>
                )}
              </div>
            </div>

            {/* Next Executions */}
            <div className="bg-[#0a0f1d] border border-slate-900 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-300 font-brand flex items-center gap-2">
                <FaCalendarAlt className="text-[var(--accent-color)] w-4 h-4" />
                Next 5 Execution Runs
              </h3>

              <div className="bg-slate-950 rounded-lg overflow-hidden border border-slate-900/60">
                {error ? (
                  <div className="p-6 text-center text-xs italic text-slate-600">
                    Fix expression errors to view run times.
                  </div>
                ) : nextRuns.length > 0 ? (
                  <div className="divide-y divide-slate-900/80 font-mono text-[10px] text-slate-300">
                    {nextRuns.map((run, i) => (
                      <div key={i} className="px-4 py-3 flex justify-between items-center hover:bg-slate-900/20">
                        <span className="text-slate-500">Run #{i + 1}</span>
                        <span className="text-slate-200 text-right">
                          {run.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} at{" "}
                          <span className="text-indigo-400 font-semibold">
                            {run.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', hour12: true })}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs italic text-slate-600">
                    No matching runs found in the next 5 years.
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </Card>
    </div>
  );
}
