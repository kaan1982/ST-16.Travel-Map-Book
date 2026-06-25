import { AppStoreConnectSettingsForm } from "@/components/app-growth/app-store-connect-settings-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-muted">Private workspace — single owner account.</p>
      </div>

      <AppStoreConnectSettingsForm />

      <Card>
        <CardHeader>
          <CardTitle>Apple Ads</CardTitle>
          <CardDescription>Optional — connect to import exact match keywords and ASA performance.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted">Not connected.</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ranking provider</CardTitle>
          <CardDescription>
            Set via RANKING_PROVIDER env var: apple_lookup, third_party_aso_api, or internal_crawler.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted">
          Currently using: <code>{process.env.RANKING_PROVIDER ?? "apple_lookup"}</code>
        </CardContent>
      </Card>
    </div>
  );
}
