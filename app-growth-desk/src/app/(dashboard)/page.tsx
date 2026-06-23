import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_APPS, MOCK_KEYWORDS, MOCK_ALERTS } from "@/lib/mock-data";
import { COUNTRIES } from "@/lib/countries";
import Link from "next/link";

export default function DashboardHomePage() {
  const totalApps = MOCK_APPS.length;
  const totalKeywords = MOCK_APPS.reduce((sum, a) => sum + a.trackedKeywords, 0);
  const countriesTracked = new Set(MOCK_KEYWORDS.map((k) => k.countryCode)).size;
  const top1 = MOCK_KEYWORDS.filter((k) => k.currentRank === 1).length;
  const top3 = MOCK_KEYWORDS.filter((k) => k.currentRank !== null && k.currentRank <= 3).length;
  const top10 = MOCK_KEYWORDS.filter((k) => k.currentRank !== null && k.currentRank <= 10).length;
  const gains = MOCK_KEYWORDS.filter(
    (k) => k.previousRank !== null && k.currentRank !== null && k.currentRank < k.previousRank
  ).length;
  const losses = MOCK_KEYWORDS.filter(
    (k) => k.previousRank !== null && k.currentRank !== null && k.currentRank > k.previousRank
  ).length;
  const needsUpdate = MOCK_APPS.filter((a) => a.metadataNeedsUpdate).length;

  const cards = [
    { label: "Total apps", value: totalApps },
    { label: "Tracked keywords", value: totalKeywords },
    { label: "Countries tracked", value: `${countriesTracked}/${COUNTRIES.length}` },
    { label: "Top 1 / Top 3 / Top 10", value: `${top1} / ${top3} / ${top10}` },
    { label: "Rank gains today", value: gains, accent: "text-emerald-600" },
    { label: "Rank losses today", value: losses, accent: "text-red-600" },
    { label: "Apps needing metadata update", value: needsUpdate, accent: "text-amber-600" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">Overview across all tracked apps.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardHeader className="pb-1">
              <CardTitle className="text-xs font-medium text-slate-500">{c.label}</CardTitle>
            </CardHeader>
            <CardContent className={`pt-0 text-2xl font-semibold ${c.accent ?? "text-slate-900"}`}>
              {c.value}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent alerts</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {MOCK_ALERTS.map((alert) => (
            <Link
              key={alert.id}
              href={`/apps/${alert.appId}`}
              className="flex items-center justify-between rounded-lg border border-slate-100 p-3 text-sm hover:bg-slate-50"
            >
              <span className="text-slate-700">{alert.message}</span>
              <Badge variant="outline">{alert.type.replace("_", " ").toLowerCase()}</Badge>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
