
import React, { useState, useEffect } from "react";
import { AppHeader, TDEECalculator, ExportPDFModal } from "./AppHeader";

function App() {
  const [user, setUser] = useState("default");
  const [view, setView] = useState("dashboard");
  const [entries, setEntries] = useState([]);
  const [tdeeTarget, setTdeeTarget] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`healthEntries_${user}`);
    setEntries(saved ? JSON.parse(saved) : []);
  }, [user]);

  const renderDashboard = () => {
    if (entries.length === 0) {
      return <p className="text-center">No data available for dashboard.</p>;
    }

    const avg = (key) => {
      const valid = entries.filter(e => !isNaN(parseFloat(e[key])));
      const total = valid.reduce((sum, cur) => sum + parseFloat(cur[key] || 0), 0);
      return (total / valid.length).toFixed(1);
    };

    return (
      <main className="max-w-md mx-auto bg-white p-4 rounded-xl shadow-lg space-y-3">
        <h2 className="text-xl font-semibold text-center">Weekly Averages</h2>
        <p><strong>Weight:</strong> {avg("weight")} lbs</p>
        <p><strong>Calories:</strong> {avg("calories")} kcal</p>
        <p><strong>Protein:</strong> {avg("protein")} g</p>
        <p><strong>Carbs:</strong> {avg("carbs")} g</p>
        <p><strong>Fats:</strong> {avg("fats")} g</p>
        <p><strong>Sleep:</strong> {avg("sleep")} hrs</p>
        <p><strong>Pain Level:</strong> {avg("pain")}/10</p>
        <p><strong>Mood:</strong> {avg("mood")}/5</p>
        <button
          className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-700 transition"
          onClick={() => setShowExportModal(true)}
        >
          📤 Export to PDF
        </button>
        {showExportModal && (
          <ExportPDFModal entries={entries} onClose={() => setShowExportModal(false)} />
        )}
      </main>
    );
  };

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
        <button className={`px-4 py-2 rounded ${view === "dashboard" ? "bg-blue-600 text-white" : "bg-white border"}`} onClick={() => setView("dashboard")}>Dashboard</button>
        <button className={`px-4 py-2 rounded ${view === "tdee" ? "bg-blue-600 text-white" : "bg-white border"}`} onClick={() => setView("tdee")}>TDEE</button>
      </nav>

      {view === "dashboard" && renderDashboard()}
      {view === "tdee" && <TDEECalculator onSetTDEE={(cal) => setTdeeTarget(cal)} />}
    </div>
  );
}

export default App;
