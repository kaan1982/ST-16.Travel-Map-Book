import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const LOCAL_KEYWORDS = [
  { country: "United States", term: "water eject", local: "water eject", confidence: 95 },
  { country: "United States", term: "speaker cleaner", local: "speaker cleaner", confidence: 92 },
  { country: "Germany", term: "speaker cleaner", local: "wasser aus lautsprecher", confidence: 81 },
  { country: "Germany", term: "remove water from phone", local: "handy lautsprecher reinigen", confidence: 74 },
  { country: "Brazil", term: "remove water from phone", local: "tirar água do celular", confidence: 88 },
  { country: "Brazil", term: "speaker cleaner", local: "limpar alto falante", confidence: 79 },
];

export default function LocalizationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Localization</h1>
        <p className="text-sm text-muted">
          AI translates intent, not just words — local keyword variants per country with confidence scores.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Localized keyword variants</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Country</TableHead>
                <TableHead>Source keyword</TableHead>
                <TableHead>Localized variant</TableHead>
                <TableHead>Confidence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {LOCAL_KEYWORDS.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>{row.term}</TableCell>
                  <TableCell className="font-medium text-foreground">{row.local}</TableCell>
                  <TableCell>
                    <Badge variant={row.confidence >= 85 ? "success" : "warning"}>{row.confidence}%</Badge>
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
