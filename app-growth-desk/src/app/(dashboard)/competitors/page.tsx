"use client";

import { useState } from "react";
import { MOCK_COMPETITORS, MOCK_KEYWORDS } from "@/lib/mock-data";
import { CompetitorComparisonCard } from "@/components/app-growth/competitor-comparison-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function CompetitorsPage() {
  const [url, setUrl] = useState("");
  const competitors = MOCK_COMPETITORS["app_water_eject"] ?? [];
  const myKeywords = MOCK_KEYWORDS.filter((k) => k.appId === "app_water_eject");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Competitor Analysis</h1>
        <p className="text-sm text-slate-500">Add competitor App Store URLs to compare metadata and keyword overlap.</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUrl("");
        }}
        className="flex gap-2"
      >
        <Input
          placeholder="Paste competitor App Store URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-96"
        />
        <Button type="submit">Add competitor</Button>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {competitors.map((c) => (
          <CompetitorComparisonCard key={c.id} competitor={c} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Keyword overlap — Water Eject vs Sonic</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Keyword</TableHead>
                <TableHead>My rank</TableHead>
                <TableHead>Competitor status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myKeywords.map((k) => (
                <TableRow key={k.id}>
                  <TableCell>{k.term}</TableCell>
                  <TableCell>{k.currentRank ? `#${k.currentRank}` : "—"}</TableCell>
                  <TableCell>
                    <Badge variant={k.status === "WINNING" ? "success" : "secondary"}>
                      {k.status === "WINNING" ? "You rank better" : "Competitor ranks better"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI explanation</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-700">
          Sonic likely ranks ahead on shared keywords because their subtitle leads with the symptom (&ldquo;muffled sound&rdquo;)
          rather than the mechanism (&ldquo;sound waves&rdquo;), and their keyword field avoids repeating title words. Attack
          &ldquo;remove water from phone&rdquo; and &ldquo;iphone speaker water&rdquo; — both have rising volume with moderate difficulty.
          Avoid &ldquo;speaker cleaner app&rdquo; broad match — competition from category leaders is too high to win quickly.
        </CardContent>
      </Card>
    </div>
  );
}
