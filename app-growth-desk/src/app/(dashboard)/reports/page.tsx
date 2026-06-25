import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MOCK_APPS } from "@/lib/mock-data";

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Reports</h1>
          <p className="text-sm text-muted">Weekly ASO report per app.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export CSV</Button>
          <Button>Export PDF</Button>
        </div>
      </div>

      {MOCK_APPS.map((app) => (
        <Card key={app.id}>
          <CardHeader>
            <CardTitle>{app.name} — week of {new Date().toISOString().slice(0, 10)}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <p className="font-medium text-foreground">Ranking gains</p>
              <p className="text-muted">&ldquo;water eject&rdquo; held #1, &ldquo;remove water from phone&rdquo; up 7 spots.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Ranking losses</p>
              <p className="text-muted">&ldquo;speaker cleaner&rdquo; dropped from #4 to #9 in the US.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Best / worst countries</p>
              <p className="text-muted">Best: US. Worst: Germany — localized keywords under-targeted.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Next actions</p>
              <p className="text-muted">Refresh subtitle, add German localized keyword cluster.</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
