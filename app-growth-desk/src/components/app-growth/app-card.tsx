import Link from "next/link";
import { AppSummary } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export function AppCard({ app }: { app: AppSummary }) {
  return (
    <Link href={`/apps/${app.id}`}>
      <Card className="transition-shadow hover:shadow-md">
        <CardContent className="flex flex-col gap-3 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-lg font-semibold text-muted">
              {app.name.charAt(0)}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="truncate text-sm font-semibold text-foreground">{app.name}</div>
              <div className="truncate text-xs text-muted">{app.category}</div>
            </div>
            {app.metadataNeedsUpdate && <Badge variant="warning">Metadata</Badge>}
          </div>
          <div className="flex items-center justify-between text-xs text-muted">
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {app.ratingAverage ?? "—"} ({app.ratingCount?.toLocaleString() ?? 0})
            </span>
            <span>{app.trackedKeywords} keywords</span>
          </div>
          <div className="flex gap-2 text-xs">
            <Badge variant="success">{app.top10Keywords} in Top 10</Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
