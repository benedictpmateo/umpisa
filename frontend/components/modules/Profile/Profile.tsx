"use client";

import { useQueryUser } from "@/hooks/useQueryUser";
import EditProfileForm from "./EditProfileForm";

export default function ProfilePage() {
  const { user } = useQueryUser();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-10">Edit Profile</h1>
      {!!user ? <EditProfileForm /> : <p>Please wait...</p>}
    </div>
  );
}
