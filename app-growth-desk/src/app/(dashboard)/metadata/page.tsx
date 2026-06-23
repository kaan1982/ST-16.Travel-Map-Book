"use client";

import { MOCK_APPS, MOCK_LOCALE_METADATA } from "@/lib/mock-data";
import { MetadataEditorTable } from "@/components/app-growth/metadata-editor-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function MetadataEditorPage() {
  const [appId, setAppId] = useState(MOCK_APPS[0].id);
  const metadata = MOCK_LOCALE_METADATA[appId];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Metadata Editor</h1>
          <p className="text-sm text-slate-500">Spreadsheet-style editor across all locales.</p>
        </div>
        <Select value={appId} onValueChange={setAppId}>
          <SelectTrigger className="w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MOCK_APPS.map((a) => (
              <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Locales</CardTitle>
        </CardHeader>
        <CardContent>
          {metadata && metadata.length > 0 ? (
            <MetadataEditorTable initialMetadata={metadata} appStoreConnectAvailable={false} />
          ) : (
            <p className="py-8 text-center text-sm text-slate-400">
              No metadata fetched for this app yet — data unavailable.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
