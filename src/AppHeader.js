
import React from "react";
import logo from "./NHTapp_logo.png";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AppHeader = () => (
  <header className="text-center py-4 bg-blue-600 text-white text-2xl font-bold rounded-xl shadow-md mb-6 flex flex-col items-center">
    <img src={logo} alt="NHT App Logo" className="w-12 h-12 mb-2 object-contain" />
    NHTapp
  </header>
);

const TDEECalculator = ({ onSetTDEE }) => {
  const [form, setForm] = React.useState({ age: "", weight: "", height: "", gender: "male", activity: "1.2" });
  const [tdee, setTdee] = React.useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const calculateTDEE = () => {
    const { age, weight, height, gender, activity } = form;
    if (!age || !weight || !height) return;
    const a = +age, w = +weight, h = +height, act = +activity;
    const bmr = gender === "male" ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
    const maintenance = Math.round(bmr * act);
    setTdee({ maintenance });
    onSetTDEE(maintenance);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg max-w-md mx-auto space-y-2">
      <h2 className="text-lg font-semibold text-center">TDEE Calculator</h2>
      {["age", "weight", "height"].map(field => (
        <input key={field} name={field} placeholder={`${field}...`} value={form[field]} onChange={handleChange}
          className="w-full p-2 border rounded" />
      ))}
      <select name="gender" value={form.gender} onChange={handleChange} className="w-full p-2 border rounded">
        <option value="male">Male</option><option value="female">Female</option>
      </select>
      <select name="activity" value={form.activity} onChange={handleChange} className="w-full p-2 border rounded">
        <option value="1.2">Sedentary</option>
        <option value="1.55">Moderate (3-5x/week)</option>
        <option value="1.9">Very Active</option>
      </select>
      <button onClick={calculateTDEE} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Calculate</button>
      {tdee && <div className="text-center mt-2"><strong>TDEE:</strong> {tdee.maintenance} kcal/day</div>}
    </div>
  );
};

const ExportPDFModal = ({ entries, onClose }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    const rows = entries.map(e => [e.date, e.weight, e.calories, e.sleep, e.mood, e.exercise]);
    doc.autoTable({ head: [["Date", "Weight", "Calories", "Sleep", "Mood", "Exercise"]], body: rows });
    doc.save("health_log.pdf");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4">Export to PDF</h3>
        <p className="text-sm mb-2">Choose your export format:</p>
        <button onClick={generatePDF} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-2">📄 Export All Logs</button>
        <button onClick={onClose} className="w-full text-sm text-gray-500 hover:underline">Cancel</button>
      </div>
    </div>
  );
};

export { AppHeader, TDEECalculator, ExportPDFModal };
