import React, { useState } from 'react';

function HealthTrackerApp() {
  const [log, setLog] = useState({
    date: '', weight: '', pain: '', calories: '', protein: '', carbs: '', fats: '', sleep: '', mood: '', exercise: '', notes: ''
  });

  const handleChange = (e) => {
    setLog({ ...log, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Log saved! (This would go to storage or cloud in full version.)");
    console.log(log);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>Daily Health Tracker</h1>
      {Object.keys(log).map((field) => (
        <div key={field} style={{ marginBottom: '10px' }}>
          <input
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={log[field]}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
          />
        </div>
      ))}
      <button onClick={handleSave} style={{ width: '100%', padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>Save Log</button>
    </div>
  );
}

export default HealthTrackerApp;
