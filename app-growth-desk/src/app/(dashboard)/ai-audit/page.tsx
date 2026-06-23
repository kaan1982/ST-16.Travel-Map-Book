"use client";

import { useState } from "react";
import { MOCK_APPS } from "@/lib/mock-data";
import { COUNTRIES } from "@/lib/countries";
import { AIAuditResult } from "@/types";
import { AIRecommendationPanel } from "@/components/app-growth/ai-recommendation-panel";
import { CountrySelector } from "@/components/app-growth/country-selector";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AIAsoAuditPage() {
  const [appId, setAppId] = useState(MOCK_APPS[0].id);
  const [country, setCountry] = useState(COUNTRIES[0].code);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIAuditResult | null>(null);
  const [source, setSource] = useState<"mock" | "ai" | null>(null);

  async function runAudit() {
    setLoading(true);
    const res = await fetch("/api/ai/audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appId, country }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setResult(data.result);
      setSource(data.source);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">AI ASO Audit</h1>
          <p className="text-sm text-slate-500">Generate a practical, app-specific optimization plan.</p>
        </div>
        <div className="flex items-end gap-2">
          <Select value={appId} onValueChange={setAppId}>
            <SelectTrigger className="w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MOCK_APPS.map((a) => (
                <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <CountrySelector value={country} onChange={setCountry} />
          <Button onClick={runAudit} disabled={loading}>
            {loading ? "Running audit..." : "Run AI audit"}
          </Button>
        </div>
      </div>

      {result ? (
        <>
          {source === "mock" && (
            <p className="text-xs text-amber-600">
              Showing mock audit output — connect AI_API_KEY to generate live results.
            </p>
          )}
          <AIRecommendationPanel result={result} />
        </>
      ) : (
        <Card>
          <CardContent className="py-10 text-center text-sm text-slate-400">
            Run an audit to see the ASO score, metadata rewrite and action plans.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
