import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

export function RankChangeBadge({
  current,
  previous,
}: {
  current: number | null;
  previous: number | null;
}) {
  if (current === null) {
    return <Badge variant="outline">Not ranking</Badge>;
  }
  if (previous === null) {
    return <Badge variant="info">New</Badge>;
  }
  const delta = previous - current; // positive = improved (lower rank number is better)
  if (delta > 0) {
    return (
      <Badge variant="success" className="gap-0.5">
        <ArrowUp className="h-3 w-3" /> {delta}
      </Badge>
    );
  }
  if (delta < 0) {
    return (
      <Badge variant="danger" className="gap-0.5">
        <ArrowDown className="h-3 w-3" /> {Math.abs(delta)}
      </Badge>
    );
  }
  return (
    <Badge variant="secondary" className="gap-0.5">
      <Minus className="h-3 w-3" /> 0
    </Badge>
  );
}
