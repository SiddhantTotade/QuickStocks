"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface SectorChartProps {
  data: { name: string; value: number }[];
}

const COLORS = ["#565e74", "#006d4a", "#ba1b24", "#717c82", "#4a5268", "#005f40", "#a9081a"];

export default function SectorChart({ data }: SectorChartProps) {
  return (
    <div className="relative w-full aspect-square max-w-[200px] mx-auto mb-6">
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
        <span className="text-xl font-headline font-bold text-on-surface">{data.length}</span>
        <span className="text-[8px] font-bold text-slate-400 uppercase">Sectors</span>
      </div>

      <div className="absolute inset-0 z-10">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              wrapperStyle={{ zIndex: 100, outline: "none" }}
              contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "10px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", opacity: 1 }}
              itemStyle={{ color: "#2a3439", fontWeight: "bold" }}
              formatter={(value: any) => `₹${Number(value).toLocaleString("en-IN")}`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
