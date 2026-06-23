import { notFound } from "next/navigation";
import {
  MOCK_APPS,
  MOCK_LOCALE_METADATA,
  MOCK_KEYWORDS,
  MOCK_COMPETITORS,
} from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScreenshotPreviewGrid } from "@/components/app-growth/screenshot-preview-grid";
import { KeywordRankTable } from "@/components/app-growth/keyword-rank-table";
import { CompetitorComparisonCard } from "@/components/app-growth/competitor-comparison-card";
import { Star } from "lucide-react";
import Link from "next/link";

export default async function AppDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const app = MOCK_APPS.find((a) => a.id === id);
  if (!app) notFound();

  const metadata = MOCK_LOCALE_METADATA[id]?.[0];
  const keywords = MOCK_KEYWORDS.filter((k) => k.appId === id);
  const competitors = MOCK_COMPETITORS[id] ?? [];

  const topKeywords = keywords.filter((k) => k.currentRank !== null && k.currentRank <= 10);
  const lostKeywords = keywords.filter(
    (k) => k.previousRank !== null && k.currentRank !== null && k.currentRank > k.previousRank
  );
  const newKeywords = keywords.filter((k) => k.previousRank === null && k.currentRank !== null);
  const rankedKeywords = keywords.filter((k) => k.currentRank !== null);
  const avgRank = rankedKeywords.length
    ? Math.round(rankedKeywords.reduce((s, k) => s + (k.currentRank ?? 0), 0) / rankedKeywords.length)
    : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-xl font-semibold text-slate-500">
          {app.name.charAt(0)}
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-slate-900">{app.name}</h1>
          <p className="text-sm text-slate-500">
            {app.bundleId} · App Store ID {app.appStoreId} · {app.category} · {app.developerName}
          </p>
          <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {app.ratingAverage} ({app.ratingCount?.toLocaleString()})
            </span>
            <span>v{app.currentVersion}</span>
            {app.metadataNeedsUpdate && <Badge variant="warning">Metadata needs update</Badge>}
          </div>
        </div>
        <Link href={`/metadata?appId=${app.id}`}>
          <Badge variant="outline" className="cursor-pointer">Edit metadata</Badge>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <Card>
          <CardHeader className="pb-1"><CardTitle className="text-xs text-slate-500">Top keywords</CardTitle></CardHeader>
          <CardContent className="pt-0 text-xl font-semibold">{topKeywords.length}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1"><CardTitle className="text-xs text-slate-500">Lost keywords</CardTitle></CardHeader>
          <CardContent className="pt-0 text-xl font-semibold text-red-600">{lostKeywords.length}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1"><CardTitle className="text-xs text-slate-500">New keywords</CardTitle></CardHeader>
          <CardContent className="pt-0 text-xl font-semibold text-emerald-600">{newKeywords.length}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1"><CardTitle className="text-xs text-slate-500">Average rank</CardTitle></CardHeader>
          <CardContent className="pt-0 text-xl font-semibold">{avgRank ?? "—"}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1"><CardTitle className="text-xs text-slate-500">Visibility score</CardTitle></CardHeader>
          <CardContent className="pt-0 text-xl font-semibold">{Math.min(100, keywords.length * 4)}</CardContent>
        </Card>
      </div>

      {metadata ? (
        <Card>
          <CardHeader><CardTitle>Current metadata ({metadata.localeCode})</CardTitle></CardHeader>
          <CardContent className="grid gap-3 text-sm sm:grid-cols-2">
            <div><span className="text-xs text-slate-500">Title</span><p>{metadata.title}</p></div>
            <div><span className="text-xs text-slate-500">Subtitle</span><p>{metadata.subtitle}</p></div>
            <div className="sm:col-span-2"><span className="text-xs text-slate-500">Keyword field</span><p className="font-mono text-xs">{metadata.keywordsField}</p></div>
            <div className="sm:col-span-2"><span className="text-xs text-slate-500">Promotional text</span><p>{metadata.promotionalText}</p></div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-6 text-center text-sm text-slate-400">
            Metadata not fetched yet — data unavailable.
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle>Screenshots</CardTitle></CardHeader>
        <CardContent>
          <ScreenshotPreviewGrid urls={metadata?.screenshotUrls ?? []} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Keyword ranking</CardTitle></CardHeader>
        <CardContent>
          <KeywordRankTable rows={keywords} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Top competitors</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {competitors.length > 0 ? (
            competitors.map((c) => <CompetitorComparisonCard key={c.id} competitor={c} />)
          ) : (
            <p className="text-sm text-slate-400">No competitors added yet.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>AI action plan</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {["Fix title", "Move high-intent keyword to subtitle", "Remove duplicate keyword", "Add long-tail keyword", "Test screenshot headline"].map(
            (action) => (
              <Badge key={action} variant="info">{action}</Badge>
            )
          )}
          <Link href={`/ai-audit?appId=${app.id}`} className="ml-2 text-xs font-medium text-slate-700 underline">
            Run full AI ASO audit →
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
