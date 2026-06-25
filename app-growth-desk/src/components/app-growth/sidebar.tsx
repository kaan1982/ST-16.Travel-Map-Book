"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  AppWindow,
  Search,
  Users,
  FileEdit,
  Sparkles,
  Globe2,
  MessageSquareText,
  Megaphone,
  FileBarChart,
  Settings,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/apps", label: "Apps", icon: AppWindow },
  { href: "/keywords", label: "Keyword Tracker", icon: Search },
  { href: "/competitors", label: "Competitors", icon: Users },
  { href: "/metadata", label: "Metadata Editor", icon: FileEdit },
  { href: "/ai-audit", label: "AI ASO Audit", icon: Sparkles },
  { href: "/localization", label: "Localization", icon: Globe2 },
  { href: "/reviews", label: "Reviews", icon: MessageSquareText },
  { href: "/apple-ads", label: "Apple Ads", icon: Megaphone },
  { href: "/reports", label: "Reports", icon: FileBarChart },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border-subtle bg-surface md:flex">
      <div className="flex h-16 items-center gap-2.5 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-xs font-bold text-white">
          AG
        </div>
        <span className="text-sm font-semibold text-foreground">App Growth Desk</span>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "mb-1 flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-2 hover:text-foreground",
                active && "bg-gradient-to-r from-accent to-accent-2 text-white shadow-lg shadow-accent/20 hover:from-accent hover:to-accent-2 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border-subtle p-3">
        <button
          onClick={logout}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-muted hover:bg-surface-2 hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
