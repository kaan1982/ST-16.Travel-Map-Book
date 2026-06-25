import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_APPS, MOCK_KEYWORDS, MOCK_ALERTS } from "@/lib/mock-data";
import { COUNTRIES } from "@/lib/countries";
import Link from "next/link";
import { AppWindow, Search, Globe2, TrendingUp, TrendingDown, FileEdit } from "lucide-react";
import { cn } from "@/lib/utils";

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
    { label: "Total apps", value: totalApps, icon: AppWindow },
    { label: "Tracked keywords", value: totalKeywords, icon: Search },
    { label: "Countries tracked", value: `${countriesTracked}/${COUNTRIES.length}`, icon: Globe2 },
    { label: "Top 1 / Top 3 / Top 10", value: `${top1} / ${top3} / ${top10}`, icon: TrendingUp },
    { label: "Rank gains today", value: gains, icon: TrendingUp, tone: "success" as const },
    { label: "Rank losses today", value: losses, icon: TrendingDown, tone: "danger" as const },
    { label: "Apps needing metadata update", value: needsUpdate, icon: FileEdit, tone: "warning" as const },
  ];

  const toneClasses: Record<string, string> = {
    success: "from-emerald-500 to-emerald-400",
    danger: "from-rose-500 to-rose-400",
    warning: "from-amber-500 to-amber-400",
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="flex flex-1 flex-col gap-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted">Overview across all tracked apps.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Card key={c.label}>
                <CardContent className="flex flex-col gap-3 p-4">
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br text-white",
                      c.tone ? toneClasses[c.tone] : "from-accent to-accent-2"
                    )}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-foreground">{c.value}</p>
                    <p className="text-xs text-muted">{c.label}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Card className="w-full lg:w-80 lg:shrink-0">
        <CardHeader>
          <CardTitle>Recent alerts</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {MOCK_ALERTS.map((alert) => (
            <Link
              key={alert.id}
              href={`/apps/${alert.appId}`}
              className="flex flex-col gap-1.5 rounded-xl border border-border-subtle p-3 text-sm hover:bg-surface-2"
            >
              <span className="text-foreground">{alert.message}</span>
              <Badge variant="outline" className="w-fit">
                {alert.type.replace("_", " ").toLowerCase()}
              </Badge>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
