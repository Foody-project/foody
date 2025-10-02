import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

import { LogOut } from "lucide-react";

interface ConnectedIconProps {
  avatar: string;
}

const userId = 1;

export function ConnectedIcon({ avatar }: ConnectedIconProps) {
  const router = useRouter();

  const favoritesRedirect = () => {
    router.push(`/restaurants/favorites/${userId}`);
  };

  const settingsRedirect = () => {
    router.push(`/settings`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={avatar} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-2" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={favoritesRedirect}>
            Your favorites
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={settingsRedirect}>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            Log out
            <DropdownMenuShortcut>
              <LogOut size={16} color="red" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
