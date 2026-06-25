"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ImportAppForm() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imported, setImported] = useState<{ name: string } | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setImported(null);
    const res = await fetch("/api/apps/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "Import failed.");
      return;
    }
    setImported({ name: data.app.name });
    setUrl("");
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-start">
      <Input
        placeholder="Paste App Store URL or app ID..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="sm:w-96"
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Importing..." : "Import app"}
      </Button>
      {error && <p className="text-xs text-red-600 sm:self-center">{error}</p>}
      {imported && <p className="text-xs text-emerald-600 sm:self-center">Imported: {imported.name}</p>}
    </form>
  );
}
