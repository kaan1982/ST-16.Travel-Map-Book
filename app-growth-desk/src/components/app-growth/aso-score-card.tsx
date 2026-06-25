import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function scoreColor(score: number) {
  if (score >= 75) return "text-emerald-600";
  if (score >= 50) return "text-amber-600";
  return "text-red-600";
}

export function ASOScoreCard({ label, score }: { label: string; score: number }) {
  return (
    <Card>
      <CardHeader className="pb-1">
        <CardTitle className="text-xs font-medium text-muted">{label}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className={cn("text-2xl font-semibold", scoreColor(score))}>{score}</div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
          <div
            className={cn(
              "h-full rounded-full",
              score >= 75 ? "bg-emerald-500" : score >= 50 ? "bg-amber-500" : "bg-red-500"
            )}
            style={{ width: `${score}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
