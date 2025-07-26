"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Excellent (80-100%)", value: 35, color: "#22c55e" },
  { name: "Good (60-79%)", value: 45, color: "#3b82f6" },
  { name: "Needs Help (<60%)", value: 20, color: "#ef4444" },
]

export function TopicPerformance() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}
