import React, { Component } from "react";
import { FaSyncAlt, FaExclamationTriangle } from "react-icons/fa";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an exception:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#0F172A] text-white min-h-[400px]">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-center space-y-5">
            <div className="bg-rose-950/40 w-12 h-12 rounded-full flex items-center justify-center mx-auto border border-rose-900">
              <FaExclamationTriangle className="text-rose-500 w-5 h-5" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white font-brand">Tool Execution Crash</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Something went wrong while executing this tool. This is usually caused by parsing malformed input structures.
              </p>
              {this.state.error && (
                <div className="text-[10px] bg-slate-950 border border-slate-800 p-2.5 rounded text-rose-400 font-mono text-left overflow-x-auto select-text mt-3">
                  {this.state.error.message}
                </div>
              )}
            </div>

            <div>
              <button
                onClick={this.handleReset}
                className="inline-flex items-center gap-1.5 bg-[var(--accent-color)] hover:bg-[#9790f9] text-white px-4 py-2.5 rounded-lg text-xs font-semibold shadow-md transition-all cursor-pointer"
              >
                <FaSyncAlt className="w-3 h-3" />
                <span>Reload Workspace</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
