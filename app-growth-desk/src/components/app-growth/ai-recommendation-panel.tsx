import { AIAuditResult } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ASOScoreCard } from "@/components/app-growth/aso-score-card";

export function AIRecommendationPanel({ result }: { result: AIAuditResult }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        <ASOScoreCard label="ASO Score" score={result.asoScore} />
        <ASOScoreCard label="Metadata" score={result.metadataScore} />
        <ASOScoreCard label="Keyword Opp." score={result.keywordOpportunityScore} />
        <ASOScoreCard label="Conversion Risk" score={result.conversionRiskScore} />
        <ASOScoreCard label="Screenshots" score={result.screenshotScore} />
        <ASOScoreCard label="Localization" score={result.localizationScore} />
        <ASOScoreCard label="Competitor Pressure" score={result.competitorPressureScore} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Diagnosis</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-foreground">{result.diagnosis}</CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Metadata rewrite</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            <div>
              <span className="text-xs font-medium text-muted">Title</span>
              <p className="font-medium text-foreground">{result.metadataRewrite.title}</p>
            </div>
            <div>
              <span className="text-xs font-medium text-muted">Subtitle</span>
              <p className="font-medium text-foreground">{result.metadataRewrite.subtitle}</p>
            </div>
            <div>
              <span className="text-xs font-medium text-muted">Keyword field (100 chars)</span>
              <p className="font-mono text-xs text-foreground">{result.keywordField}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Keyword opportunity</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {result.keywordOpportunity.map((k) => (
              <Badge key={k} variant="info">{k}</Badge>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Country-specific notes</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-foreground">{result.countryNotes}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Competitor insight</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-foreground">{result.competitorInsight}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Apple Ads exact match test list</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {result.appleAdsExactMatchList.map((k) => (
              <Badge key={k} variant="secondary">{k}</Badge>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What not to do</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-inside list-disc space-y-1 text-sm text-foreground">
              {result.whatNotToDo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7-day test plan</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-inside list-decimal space-y-1 text-sm text-foreground">
              {result.sevenDayPlan.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>30-day growth plan</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-inside list-decimal space-y-1 text-sm text-foreground">
              {result.thirtyDayPlan.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
