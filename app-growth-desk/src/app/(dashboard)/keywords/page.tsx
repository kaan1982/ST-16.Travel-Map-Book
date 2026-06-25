"use client";

import { useMemo, useState } from "react";
import { MOCK_KEYWORDS } from "@/lib/mock-data";
import { KeywordRankTable } from "@/components/app-growth/keyword-rank-table";
import { ExportButton } from "@/components/app-growth/export-button";
import { RankingHistoryChart } from "@/components/app-growth/ranking-history-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "top1", label: "Top 1" },
  { id: "top3", label: "Top 3" },
  { id: "top10", label: "Top 10" },
  { id: "top50", label: "Top 50" },
  { id: "none", label: "Not ranking" },
] as const;

export default function KeywordTrackerPage() {
  const [filter, setFilter] = useState<typeof FILTERS[number]["id"]>("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(MOCK_KEYWORDS[0]?.id);

  const filtered = useMemo(() => {
    return MOCK_KEYWORDS.filter((k) => {
      if (search && !k.term.toLowerCase().includes(search.toLowerCase())) return false;
      if (filter === "all") return true;
      if (filter === "none") return k.currentRank === null;
      if (k.currentRank === null) return false;
      if (filter === "top1") return k.currentRank <= 1;
      if (filter === "top3") return k.currentRank <= 3;
      if (filter === "top10") return k.currentRank <= 10;
      if (filter === "top50") return k.currentRank <= 50;
      return true;
    });
  }, [filter, search]);

  const selected = MOCK_KEYWORDS.find((k) => k.id === selectedId);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Keyword Tracker</h1>
          <p className="text-sm text-muted">Daily ranking across all tracked apps and countries.</p>
        </div>
        <ExportButton rows={filtered} filename="keywords.csv" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <Button
            key={f.id}
            size="sm"
            variant={filter === f.id ? "default" : "outline"}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </Button>
        ))}
        <Input
          placeholder="Search keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-56"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardContent className="p-0">
            <div onClick={(e) => {
              const row = (e.target as HTMLElement).closest("tr");
              const term = row?.querySelector("td")?.textContent;
              const match = MOCK_KEYWORDS.find((k) => k.term === term);
              if (match) setSelectedId(match.id);
            }}>
              <KeywordRankTable rows={filtered} />
            </div>
          </CardContent>
        </Card>

        <Card className={cn(!selected && "opacity-50")}>
          <CardHeader>
            <CardTitle>{selected ? `History — ${selected.term}` : "Select a keyword"}</CardTitle>
          </CardHeader>
          <CardContent>
            {selected ? <RankingHistoryChart history={selected.history} /> : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
