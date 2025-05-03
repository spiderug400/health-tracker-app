
import React, { useState, useEffect } from "react";
import { AppHeader, TDEECalculator, ExportPDFModal } from "./AppHeader";
import LogEntry from "./LogEntry";
import LogViewer from "./LogViewer";
import Charts from "./Charts";
import ProgressGallery from "./ProgressGallery";

function App() {
  const [user, setUser] = useState("default");
  const [view, setView] = useState("dashboard");
  const [entries, setEntries] = useState([]);
  const [tdeeTarget, setTdeeTarget] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`healthEntries_${user}`);
    setEntries(saved ? JSON.parse(saved) : []);
    const savedTDEE = localStorage.getItem(`tdeeTarget_${user}`);
    setTdeeTarget(savedTDEE ? parseInt(savedTDEE) : null);
  }, [user]);

  const renderDashboard = () => {
    if (entries.length === 0) return <p className="text-center">No data yet.</p>;
    const avg = (key) => {
      const values = entries.map(e => parseFloat(e[key])).filter(v => !isNaN(v));
      const sum = values.reduce((acc, v) => acc + v, 0);
      return (sum / values.length).toFixed(1);
    };
    return (
      <div className="space-y-2">
        <p><strong>Avg Weight:</strong> {avg("weight")} lbs</p>
        <p><strong>Avg Calories:</strong> {avg("calories")} kcal</p>
        <p><strong>TDEE:</strong> {tdeeTarget || "Not set"} kcal</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <AppHeader />
      <div className="max-w-md mx-auto mb-4">
        <input
          className="w-full p-2 border rounded"
          value={user}
          onChange={(e) => setUser(e.target.value.trim() || "default")}
          placeholder="Enter your username"
        />
      </div>
      <div className="flex justify-center gap-2 mb-4 flex-wrap">
        {["dashboard", "log", "entries", "charts", "gallery", "tdee"].map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${view === tab ? "bg-blue-600 text-white" : "bg-white border"}`}
            onClick={() => setView(tab)}
          >
            {tab === "log" ? "New Entry" :
             tab === "entries" ? "Log" :
             tab[0].toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {view === "dashboard" && renderDashboard()}
      {view === "log" && <LogEntry user={user} onSave={(updated) => setEntries(updated)} />}
      {view === "entries" && (
        <>
          <div className="flex justify-end max-w-md mx-auto mb-2">
            <button onClick={() => setShowExportModal(true)} className="text-sm text-white bg-green-600 px-3 py-1 rounded hover:bg-green-700">📤 Export</button>
          </div>
          <LogViewer entries={entries} user={user} setEntries={setEntries} />
          {showExportModal && (
            <ExportPDFModal entries={entries} onClose={() => setShowExportModal(false)} />
          )}
        </>
      )}
      {view === "charts" && <Charts entries={entries} tdee={tdeeTarget} />}
      {view === "gallery" && <ProgressGallery user={user} />}
      {view === "tdee" && (
        <TDEECalculator onSetTDEE={(cal) => {
          setTdeeTarget(cal);
          localStorage.setItem(`tdeeTarget_${user}`, cal);
        }} />
      )}
    </div>
  );
}

export default App;
