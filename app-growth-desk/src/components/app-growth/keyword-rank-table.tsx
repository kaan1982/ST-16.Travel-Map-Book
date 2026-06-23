"use client";

import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
} from "@tanstack/react-table";
import { KeywordRow } from "@/types";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RankChangeBadge } from "@/components/app-growth/rank-change-badge";
import { ArrowUpDown } from "lucide-react";

const statusVariant: Record<KeywordRow["status"], "success" | "danger" | "info" | "outline"> = {
  WINNING: "success",
  FALLING: "danger",
  OPPORTUNITY: "info",
  NOT_RANKING: "outline",
};

const intentLabel: Record<KeywordRow["intent"], string> = {
  HIGH_INTENT: "High intent",
  BROAD: "Broad",
  COMPETITOR: "Competitor",
  BRANDED: "Branded",
  PROBLEM: "Problem",
};

const columnHelper = createColumnHelper<KeywordRow>();

export function KeywordRankTable({ rows }: { rows: KeywordRow[] }) {
  const [sorting, setSorting] = useState<SortingState>([{ id: "currentRank", desc: false }]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("term", { header: "Keyword" }),
      columnHelper.accessor("countryCode", { header: "Country" }),
      columnHelper.accessor("localeCode", { header: "Locale" }),
      columnHelper.accessor("currentRank", {
        header: "Rank",
        cell: (info) => (info.getValue() ? `#${info.getValue()}` : "—"),
        sortUndefined: "last",
      }),
      columnHelper.accessor((row) => row, {
        id: "change",
        header: "Change",
        cell: (info) => (
          <RankChangeBadge current={info.row.original.currentRank} previous={info.row.original.previousRank} />
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("bestRank", {
        header: "Best",
        cell: (info) => (info.getValue() ? `#${info.getValue()}` : "—"),
      }),
      columnHelper.accessor("difficultyScore", { header: "Difficulty" }),
      columnHelper.accessor("volumeScore", { header: "Volume" }),
      columnHelper.accessor("intent", {
        header: "Intent",
        cell: (info) => <Badge variant="secondary">{intentLabel[info.getValue()]}</Badge>,
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => <Badge variant={statusVariant[info.getValue()]}>{info.getValue().replace("_", " ")}</Badge>,
      }),
    ],
    []
  );

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((hg) => (
          <TableRow key={hg.id}>
            {hg.headers.map((header) => (
              <TableHead
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
                className={header.column.getCanSort() ? "cursor-pointer select-none" : undefined}
              >
                <span className="inline-flex items-center gap-1">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getCanSort() && <ArrowUpDown className="h-3 w-3 text-slate-300" />}
                </span>
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
          </TableRow>
        ))}
        {table.getRowModel().rows.length === 0 && (
          <TableRow>
            <TableCell colSpan={columns.length} className="py-8 text-center text-slate-400">
              No keywords match the current filters.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
