"use client";

import { Button } from "@/components/ui/button";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full">
      <div className="flex justify-end items-center p-4 border-b border-gray-2--">
        <Button>Logout</Button>
      </div>
      <div className="max-w-[1400px] px-5 w-full mx-auto py-10">
        {children}
      </div>
    </section>
  );
}
