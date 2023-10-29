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
import { createPokemonAvatarUrl, generateAnAvatar } from "@/lib/avatar";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfileDropdown() {
  const router = useRouter()
  const { user } = useQueryUser();

  const id = generateAnAvatar(user?.email || "");

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="bg-red-100">
          <AvatarImage
            src={createPokemonAvatarUrl(id)}
          />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user?.firstName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/profile')}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
