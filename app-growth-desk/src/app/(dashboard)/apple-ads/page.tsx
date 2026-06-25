import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MOCK_ASA = [
  { keyword: "remove water from phone", country: "US", matchType: "exact", spend: 142.3, taps: 310, installs: 41, cpt: 0.46, roas: 2.1, organicRank: 14 },
  { keyword: "speaker water damage", country: "US", matchType: "exact", spend: 98.1, taps: 205, installs: 22, cpt: 0.48, roas: 1.4, organicRank: null },
  { keyword: "speaker cleaner", country: "US", matchType: "broad", spend: 211.5, taps: 540, installs: 18, cpt: 0.39, roas: 0.6, organicRank: 9 },
];

export default function AppleAdsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Apple Ads</h1>
          <p className="text-sm text-muted">Optional module — organic rank shown beside paid performance.</p>
        </div>
        <Button>Connect Apple Ads API</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Keyword performance</CardTitle>
          <CardDescription>Connect your Apple Ads account in Settings to load live campaign data.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Keyword</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Match type</TableHead>
                <TableHead>Spend</TableHead>
                <TableHead>Taps</TableHead>
                <TableHead>Installs</TableHead>
                <TableHead>CPT</TableHead>
                <TableHead>ROAS</TableHead>
                <TableHead>Organic rank</TableHead>
                <TableHead>AI recommendation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_ASA.map((row) => (
                <TableRow key={row.keyword + row.country}>
                  <TableCell>{row.keyword}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>{row.matchType}</TableCell>
                  <TableCell>${row.spend.toFixed(2)}</TableCell>
                  <TableCell>{row.taps}</TableCell>
                  <TableCell>{row.installs}</TableCell>
                  <TableCell>${row.cpt.toFixed(2)}</TableCell>
                  <TableCell>{row.roas.toFixed(1)}x</TableCell>
                  <TableCell>{row.organicRank ? `#${row.organicRank}` : "not ranking"}</TableCell>
                  <TableCell>
                    <Badge variant={row.roas >= 1.5 ? "success" : row.roas >= 1 ? "warning" : "danger"}>
                      {row.roas >= 1.5 ? "Scale" : row.roas >= 1 ? "Test exact match" : "Pause / lower bid"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
