import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const MOCK_REVIEWS = [
  {
    id: "r1",
    country: "US",
    rating: 5,
    body: "Saved my phone speaker after I dropped it in the pool!",
    sentiment: "praise",
    version: "3.4.1",
  },
  {
    id: "r2",
    country: "DE",
    rating: 2,
    body: "App crashes every time I open settings.",
    sentiment: "bugs",
    version: "3.4.0",
  },
  {
    id: "r3",
    country: "US",
    rating: 3,
    body: "Wish there was a pro version without ads for a one-time price.",
    sentiment: "pricing",
    version: "3.4.1",
  },
];

const sentimentVariant: Record<string, "danger" | "success" | "warning" | "info"> = {
  bugs: "danger",
  praise: "success",
  pricing: "warning",
  feature_request: "info",
  ux: "warning",
};

export default function ReviewsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Reviews</h1>
        <p className="text-sm text-muted">Sentiment analysis and AI-generated reply drafts.</p>
      </div>

      <div className="flex flex-col gap-3">
        {MOCK_REVIEWS.map((r) => (
          <Card key={r.id}>
            <CardContent className="flex flex-col gap-3 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span className="flex items-center gap-0.5">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </span>
                  <span>{r.country}</span>
                  <span>v{r.version}</span>
                </div>
                <Badge variant={sentimentVariant[r.sentiment] ?? "secondary"}>{r.sentiment}</Badge>
              </div>
              <p className="text-sm text-foreground">{r.body}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Generate friendly reply</Button>
                <Button size="sm" variant="outline">Generate professional reply</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connect App Store Connect</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted">
          Connect your App Store Connect API credentials in Settings to fetch live reviews and publish replies.
        </CardContent>
      </Card>
    </div>
  );
}
