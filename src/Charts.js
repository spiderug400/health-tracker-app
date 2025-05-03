
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Charts = ({ entries, tdee }) => {
  const sorted = [...entries].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="max-w-2xl mx-auto bg-white p-4 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold text-center">Progress Charts</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={sorted}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="weight" stroke="#8884d8" name="Weight (lbs)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={sorted}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="calories" stroke="#82ca9d" name="Calories" />
            {tdee && (
              <Line type="monotone" dataKey={() => tdee} stroke="#ff7300" dot={false} name="TDEE" />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={sorted}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="mood" stroke="#f06292" name="Mood (1-5)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
