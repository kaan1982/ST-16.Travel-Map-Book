"use client";

import { useState } from "react";
import { AppLocaleMetadata } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LIMITS = { title: 30, subtitle: 30, keywordsField: 100, promotionalText: 170 };

function CharCounter({ value, limit }: { value: string | null; limit: number }) {
  const len = value?.length ?? 0;
  return (
    <span className={cn("text-[11px]", len > limit ? "text-red-600" : "text-muted")}>
      {len}/{limit}
    </span>
  );
}

function findWarnings(meta: AppLocaleMetadata): string[] {
  const warnings: string[] = [];
  const titleWords = (meta.title ?? "").toLowerCase().split(/\s+/).filter(Boolean);
  const subtitleWords = (meta.subtitle ?? "").toLowerCase().split(/\s+/).filter(Boolean);
  const keywordTerms = (meta.keywordsField ?? "").toLowerCase().split(",").map((s) => s.trim());

  const dupWithSubtitle = titleWords.filter((w) => subtitleWords.includes(w));
  if (dupWithSubtitle.length > 0) {
    warnings.push(`Duplicate word(s) between title and subtitle: ${dupWithSubtitle.join(", ")}`);
  }
  const titleSubtitleWords = new Set([...titleWords, ...subtitleWords]);
  const dupWithKeywords = keywordTerms.filter((t) => titleSubtitleWords.has(t));
  if (dupWithKeywords.length > 0) {
    warnings.push(`Keyword field repeats title/subtitle word(s): ${dupWithKeywords.join(", ")}`);
  }
  if ((meta.keywordsField ?? "").includes(", ")) {
    warnings.push("Keyword field has spaces after commas — wastes character budget.");
  }
  if ((meta.title ?? "").length > LIMITS.title) warnings.push("Title exceeds 30 characters.");
  if ((meta.subtitle ?? "").length > LIMITS.subtitle) warnings.push("Subtitle exceeds 30 characters.");
  if ((meta.keywordsField ?? "").length > LIMITS.keywordsField) warnings.push("Keyword field exceeds 100 characters.");
  if ((meta.promotionalText ?? "").length > LIMITS.promotionalText) warnings.push("Promotional text exceeds 170 characters.");

  return warnings;
}

export function MetadataEditorTable({
  initialMetadata,
  appStoreConnectAvailable = false,
}: {
  initialMetadata: AppLocaleMetadata[];
  appStoreConnectAvailable?: boolean;
}) {
  const [activeLocale, setActiveLocale] = useState(initialMetadata[0]?.localeCode);
  const [metadata, setMetadata] = useState(initialMetadata);

  const current = metadata.find((m) => m.localeCode === activeLocale) ?? metadata[0];
  const warnings = current ? findWarnings(current) : [];

  function update<K extends keyof AppLocaleMetadata>(key: K, value: AppLocaleMetadata[K]) {
    setMetadata((prev) =>
      prev.map((m) => (m.localeCode === activeLocale ? { ...m, [key]: value } : m))
    );
  }

  if (!current) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {metadata.map((m) => (
          <button
            key={m.localeCode}
            onClick={() => setActiveLocale(m.localeCode)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs font-medium",
              m.localeCode === activeLocale
                ? "border-transparent bg-gradient-to-r from-accent to-accent-2 text-white"
                : "border-border-subtle bg-surface text-muted hover:bg-surface-2"
            )}
          >
            {m.localeCode}
          </button>
        ))}
      </div>

      {warnings.length > 0 && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-400">
          <p className="mb-1 font-medium">Warnings</p>
          <ul className="list-inside list-disc space-y-0.5">
            {warnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-muted">App Name</label>
            <CharCounter value={current.title} limit={LIMITS.title} />
          </div>
          <Input value={current.title ?? ""} onChange={(e) => update("title", e.target.value)} />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-muted">Subtitle</label>
            <CharCounter value={current.subtitle} limit={LIMITS.subtitle} />
          </div>
          <Input value={current.subtitle ?? ""} onChange={(e) => update("subtitle", e.target.value)} />
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-muted">Keywords field (comma separated)</label>
            <CharCounter value={current.keywordsField} limit={LIMITS.keywordsField} />
          </div>
          <Textarea
            value={current.keywordsField ?? ""}
            onChange={(e) => update("keywordsField", e.target.value)}
            className="min-h-[60px]"
          />
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-muted">Promotional text</label>
            <CharCounter value={current.promotionalText} limit={LIMITS.promotionalText} />
          </div>
          <Textarea
            value={current.promotionalText ?? ""}
            onChange={(e) => update("promotionalText", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-xs font-medium text-muted">Description</label>
          <Textarea
            value={current.description ?? ""}
            onChange={(e) => update("description", e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-xs font-medium text-muted">Release notes</label>
          <Textarea value={current.releaseNotes ?? ""} onChange={(e) => update("releaseNotes", e.target.value)} />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted">Support URL</label>
          <Input value={current.supportUrl ?? ""} onChange={(e) => update("supportUrl", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted">Marketing URL</label>
          <Input value={current.marketingUrl ?? ""} onChange={(e) => update("marketingUrl", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted">Privacy policy URL</label>
          <Input value={current.privacyUrl ?? ""} onChange={(e) => update("privacyUrl", e.target.value)} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-border-subtle pt-4">
        <Button variant="outline" size="sm">Generate ASO Version</Button>
        <Button variant="outline" size="sm">Translate from English</Button>
        <Button variant="outline" size="sm">Copy from another locale</Button>
        <Button variant="outline" size="sm">Export CSV</Button>
        <Button
          size="sm"
          disabled={!appStoreConnectAvailable}
          title={appStoreConnectAvailable ? undefined : "Connect App Store Connect in Settings first"}
        >
          Push to App Store Connect
        </Button>
      </div>
    </div>
  );
}
