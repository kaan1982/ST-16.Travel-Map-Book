import { MOCK_APPS } from "@/lib/mock-data";
import { AppCard } from "@/components/app-growth/app-card";
import { ImportAppForm } from "@/components/app-growth/import-app-form";

export default function AppsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Apps</h1>
        <p className="text-sm text-muted">Paste an App Store URL or app ID to import an app.</p>
      </div>

      <ImportAppForm />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_APPS.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}
