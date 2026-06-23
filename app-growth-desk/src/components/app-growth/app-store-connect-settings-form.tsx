"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function AppStoreConnectSettingsForm() {
  const [issuerId, setIssuerId] = useState("");
  const [keyId, setKeyId] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [saved, setSaved] = useState(false);

  async function save() {
    // Credentials are encrypted server-side before storage; never logged or returned in plain text.
    await fetch("/api/settings/app-store-connect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ issuerId, keyId, privateKey }),
    });
    setSaved(true);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>App Store Connect API</CardTitle>
        <CardDescription>
          Used to fetch your owned apps and edit metadata directly. Credentials are encrypted at rest.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <Label htmlFor="issuerId">Issuer ID</Label>
          <Input id="issuerId" value={issuerId} onChange={(e) => setIssuerId(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="keyId">Key ID</Label>
          <Input id="keyId" value={keyId} onChange={(e) => setKeyId(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="privateKey">Private Key (.p8 contents)</Label>
          <Textarea
            id="privateKey"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            className="min-h-[120px] font-mono text-xs"
            placeholder="-----BEGIN PRIVATE KEY-----"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button size="sm" onClick={save}>Save credentials</Button>
          {saved && <span className="text-xs text-emerald-600">Saved (encrypted).</span>}
        </div>
      </CardContent>
    </Card>
  );
}
