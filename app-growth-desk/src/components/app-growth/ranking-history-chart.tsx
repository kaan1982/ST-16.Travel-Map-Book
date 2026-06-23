"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export function RankingHistoryChart({
  history,
}: {
  history: { date: string; rank: number | null }[];
}) {
  const data = history.map((h) => ({ date: h.date.slice(5), rank: h.rank ?? null }));
  const maxRank = Math.max(...data.map((d) => d.rank ?? 0), 10);

  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#94a3b8" />
        <YAxis
          reversed
          domain={[1, maxRank]}
          tick={{ fontSize: 10 }}
          stroke="#94a3b8"
          width={24}
        />
        <Tooltip
          formatter={(value) => [`#${value}`, "Rank"]}
          labelClassName="text-xs"
          contentStyle={{ fontSize: 12, borderRadius: 8 }}
        />
        <Line type="monotone" dataKey="rank" stroke="#0f172a" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
