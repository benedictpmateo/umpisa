"use client";
import { STORAGE_KEY } from "@/utils/constant";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();
    authCheck(url);
  }, [pathname, searchParams]);

  async function authCheck(url: string) {
    const PUBLIC_PATH = ["/login", "/signup"];
    const token = localStorage.getItem(STORAGE_KEY.TOKEN);

    let path = url.split("?")[0];
    if (path) {
      path = path.split("#")[0];
    }

    if (!PUBLIC_PATH.includes(path) && !token) {
      router.replace("/login");
    }
    if (PUBLIC_PATH.includes(path) && token) {
      router.replace("/");
    }
  }

  return children;
};
