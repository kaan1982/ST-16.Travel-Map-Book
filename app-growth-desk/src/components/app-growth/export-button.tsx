"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { downloadCsv, toCsv } from "@/lib/csv";

export function ExportButton<T extends object>({
  rows,
  filename,
  label = "Export CSV",
}: {
  rows: T[];
  filename: string;
  label?: string;
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => downloadCsv(filename, toCsv(rows))}
      disabled={rows.length === 0}
    >
      <Download className="h-3.5 w-3.5" />
      {label}
    </Button>
  );
}
