import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQueryUser } from "@/hooks/useQueryUser";
import { generateAnAvatar } from "@/lib/avatar";
import { signOut, useSession } from "next-auth/react";

export default function ProfileDropdown() {
  const { data } = useSession();
  const { user } = useQueryUser();

  const id = generateAnAvatar(data?.user?.email || "");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="bg-red-100">
          <AvatarImage
            src={`/assets/pokedex/${String(id).padStart(3, "0")}MS.png`}
          />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user?.firstName} {user?.lastName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
