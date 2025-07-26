"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { subject: "Math", average: 78 },
  { subject: "Physics", average: 65 },
  { subject: "Chemistry", average: 72 },
  { subject: "Biology", average: 81 },
  { subject: "History", average: 69 },
]

export function ClassPerformance() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="subject" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="average" fill="hsl(var(--primary))" />
      </BarChart>
    </ResponsiveContainer>
  )
}
