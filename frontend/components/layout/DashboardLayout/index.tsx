"use client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { generateAnAvatar } from "@/lib/avatar";
import { useQueryUser } from "@/hooks/useQueryUser";
import ProfileDropdown from "./ProfileDropdown";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const onLogout = () => {
    signOut();
  };


  return (
    <section className="w-full">
      <div className="flex justify-end items-center p-4 border-b border-gray-2--">
        <ProfileDropdown />
        <Button onClick={onLogout}>Logout</Button>
      </div>
      <div className="max-w-[1400px] px-5 w-full mx-auto py-10">{children}</div>
    </section>
  );
};
