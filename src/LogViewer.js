
import React, { useState } from "react";

const LogViewer = ({ entries, user, setEntries }) => {
  const [filter, setFilter] = useState("");

  const handleDelete = (index) => {
    const updated = [...entries];
    updated.splice(index, 1);
    localStorage.setItem(`healthEntries_${user}`, JSON.stringify(updated));
    setEntries(updated);
  };

  const filtered = entries.filter(e =>
    Object.values(e).some(val => val && val.toString().toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg space-y-4">
      <h2 className="text-xl font-bold text-center">Log Viewer</h2>
      <input
        placeholder="Search logs..."
        className="w-full p-2 border rounded"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {filtered.length === 0 && <p className="text-center text-gray-500">No matching entries</p>}
      {filtered.slice().reverse().map((entry, i) => (
        <div key={i} className="border-b border-gray-200 pb-2 mb-2 text-sm space-y-1">
          <p><strong>Date:</strong> {entry.date}</p>
          <p><strong>Weight:</strong> {entry.weight} lbs</p>
          <p><strong>Calories:</strong> {entry.calories}</p>
          <p><strong>Sleep:</strong> {entry.sleep} hrs</p>
          <p><strong>Mood:</strong> {entry.mood}</p>
          <p><strong>Exercise:</strong> {entry.exercise}</p>
          <button onClick={() => handleDelete(entries.length - 1 - i)} className="text-red-600 text-xs underline">🗑️ Delete</button>
        </div>
      ))}
    </div>
  );
};

export default LogViewer;
