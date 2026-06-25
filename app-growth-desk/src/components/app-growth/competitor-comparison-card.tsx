import { CompetitorApp } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export function CompetitorComparisonCard({ competitor }: { competitor: CompetitorApp }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-3 pb-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-sm font-semibold text-muted">
          {competitor.name.charAt(0)}
        </div>
        <div className="flex-1">
          <CardTitle>{competitor.name}</CardTitle>
          <p className="text-xs text-muted">{competitor.subtitle}</p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {competitor.ratingAverage} ({competitor.ratingCount.toLocaleString()})
          </span>
          <span>{competitor.category}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{competitor.sharedKeywords} shared keywords</Badge>
          <Badge variant="danger">{competitor.betterRankCount} they rank better</Badge>
          <Badge variant="info">{competitor.missedKeywords} you&apos;re missing</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
