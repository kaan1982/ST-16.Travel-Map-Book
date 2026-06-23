"use client";

import { MOCK_APPS } from "@/lib/mock-data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useParams } from "next/navigation";

export function AppSwitcher() {
  const router = useRouter();
  const params = useParams<{ id?: string }>();

  return (
    <Select
      value={params?.id ?? undefined}
      onValueChange={(id) => router.push(`/apps/${id}`)}
    >
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Switch app..." />
      </SelectTrigger>
      <SelectContent>
        {MOCK_APPS.map((app) => (
          <SelectItem key={app.id} value={app.id}>
            {app.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
