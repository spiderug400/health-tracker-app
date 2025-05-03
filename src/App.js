
import React, { useState, useEffect } from "react";
import { AppHeader, TDEECalculator } from "./AppHeader";

function App() {
  const [user, setUser] = useState("default");
  const [view, setView] = useState("form");
  const [tdeeTarget, setTdeeTarget] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-4 text-gray-900">
      <AppHeader />
      <div className="max-w-md mx-auto mb-4">
        <label className="block mb-1 font-semibold">Current User:</label>
        <input
          className="w-full p-2 border rounded-lg"
          value={user}
          onChange={(e) => setUser(e.target.value.trim() || "default")}
          placeholder="Enter your name or ID"
        />
      </div>
      <nav className="flex justify-center gap-4 mb-4">
        <button className={`px-4 py-2 rounded ${view === "form" ? "bg-blue-600 text-white" : "bg-white border"}`} onClick={() => setView("form")}>New Entry</button>
        <button className={`px-4 py-2 rounded ${view === "log" ? "bg-blue-600 text-white" : "bg-white border"}`} onClick={() => setView("log")}>View Logs</button>
        <button className={`px-4 py-2 rounded ${view === "dashboard" ? "bg-blue-600 text-white" : "bg-white border"}`} onClick={() => setView("dashboard")}>Dashboard</button>
        <button className={`px-4 py-2 rounded ${view === "tdee" ? "bg-blue-600 text-white" : "bg-white border"}`} onClick={() => setView("tdee")}>TDEE</button>
      </nav>

      {view === "tdee" && (
        <TDEECalculator onSetTDEE={(cal) => setTdeeTarget(cal)} />
      )}

      {view !== "tdee" && (
        <div className="text-center mt-4 text-sm text-gray-500">
          <p>Coming soon: Full form, logs, and dashboard views.</p>
        </div>
      )}
    </div>
  );
}

export default App;
