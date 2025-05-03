
import React, { useState } from "react";



const AppHeader = () => (
  <header className="text-center py-4 bg-blue-600 text-white text-xl font-bold rounded-lg shadow-md mb-4 flex flex-col items-center">
    <img src="/NHTapp_logo.png" alt="NHT App Logo" className="w-16 h-16 mb-2" />
    NHTapp
  </header>
);

const TDEECalculator = ({ onSetTDEE }) => {
  const [form, setForm] = useState({
    age: "",
    weight: "",
    height: "",
    gender: "male",
    activity: "1.2"
  });
  const [tdee, setTdee] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateTDEE = () => {
    const { age, weight, height, gender, activity } = form;
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    const act = parseFloat(activity);

    if (!w || !h || !a) return;

    let bmr = gender === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;

    const maintenance = Math.round(bmr * act);
    const deficit = maintenance - 500;
    const surplus = maintenance + 250;

    setTdee({ maintenance, deficit, surplus });
    onSetTDEE(maintenance);
    localStorage.setItem(`calorieTarget_${gender}_${activity}_${age}_${weight}_${height}`, maintenance);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded-xl shadow-lg space-y-3">
      <h2 className="text-xl font-bold text-center">TDEE Calculator</h2>
      <div className="grid gap-2">
        <input name="age" placeholder="Age (years)" className="p-2 border rounded" onChange={handleChange} />
        <input name="weight" placeholder="Weight (kg)" className="p-2 border rounded" onChange={handleChange} />
        <input name="height" placeholder="Height (cm)" className="p-2 border rounded" onChange={handleChange} />
        <select name="gender" className="p-2 border rounded" onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select name="activity" className="p-2 border rounded" onChange={handleChange}>
          <option value="1.2">Sedentary</option>
          <option value="1.375">Light (1-2x/week)</option>
          <option value="1.55">Moderate (3-4x/week)</option>
          <option value="1.725">Active (5-6x/week)</option>
          <option value="1.9">Very Active (daily heavy)</option>
        </select>
        <button onClick={calculateTDEE} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Calculate</button>
      </div>
      {tdee && (
        <div className="bg-gray-100 p-3 rounded mt-3">
          <p><strong>Maintenance:</strong> {tdee.maintenance} kcal/day</p>
          <p><strong>Fat Loss:</strong> {tdee.deficit} kcal/day</p>
          <p><strong>Muscle Gain:</strong> {tdee.surplus} kcal/day</p>
        </div>
      )}
    </div>
  );
};

export { AppHeader, TDEECalculator };
