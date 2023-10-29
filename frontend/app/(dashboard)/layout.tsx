"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen w-full flex">
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </main>
  );
}
