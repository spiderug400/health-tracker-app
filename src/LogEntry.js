
import React, { useState } from "react";

const LogEntry = ({ user, onSave }) => {
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    weight: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    sleep: "",
    pain: "",
    mood: "",
    exercise: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const saved = localStorage.getItem(`healthEntries_${user}`);
    const logs = saved ? JSON.parse(saved) : [];
    logs.push(form);
    localStorage.setItem(`healthEntries_${user}`, JSON.stringify(logs));
    onSave(logs);
    setForm({ ...form, weight: "", calories: "", protein: "", carbs: "", fats: "", sleep: "", pain: "", mood: "", exercise: "" });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg space-y-3">
      <h2 className="text-xl font-bold text-center">New Log Entry</h2>
      {Object.entries(form).map(([key, val]) => (
        <input
          key={key}
          name={key}
          value={val}
          onChange={handleChange}
          placeholder={key[0].toUpperCase() + key.slice(1)}
          className="w-full p-2 border rounded text-sm"
        />
      ))}
      <button onClick={handleSubmit} className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Save Entry</button>
    </div>
  );
};

export default LogEntry;
