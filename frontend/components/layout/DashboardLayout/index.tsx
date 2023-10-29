"use client";
import { usePathname } from "next/navigation";
import ProfileDropdown from "./ProfileDropdown";
import { cn } from "@/lib/utils";
import Link from "next/link";

const LINKS = [
  { label: "Dashboard", url: "/" },
  { label: "Escape or Catch", url: "/catch-pokemon" },
  { label: "My Pokemons", url: "/my-pokemons" },
  { label: "Rankings", url: "/rankings" },
];

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const path = usePathname();
  return (
    <section className="w-full">
      <div className="border-b border-border h-[64px] px-4">
        <div className="flex justify-between items-center max-w-[1400px] w-full mx-auto h-full">
          <div className="flex items-center gap-x-4">
            {LINKS.map((item) => (
              <Link key={item.url} href={item.url}>
                <p
                  className={cn(
                    "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                    {
                      "text-primary": path.includes(item.url),
                    }
                  )}
                >
                  {item.label}
                </p>
              </Link>
            ))}
          </div>
          <ProfileDropdown />
        </div>
      </div>
      <div className="px-5 min-h-[calc(100vh-64px)]">
        <div className="max-w-[1400px] w-full mx-auto py-10">{children}</div>
      </div>
    </section>
  );
};
