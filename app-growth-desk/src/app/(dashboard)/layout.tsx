import { Sidebar } from "@/components/app-growth/sidebar";
import { AppSwitcher } from "@/components/app-growth/app-switcher";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border-subtle bg-surface px-6">
          <div className="text-sm text-muted">Private workspace</div>
          <AppSwitcher />
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
