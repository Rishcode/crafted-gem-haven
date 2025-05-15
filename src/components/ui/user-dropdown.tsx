
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogOut, Store, User as UserIcon } from "lucide-react";

export function UserDropdown() {
  const { user, signOut, isSeller } = useAuth();

  if (!user) {
    return (
      <Button variant="default" asChild>
        <Link to="/auth">Sign In</Link>
      </Button>
    );
  }

  const userEmail = user.email || "";
  const initials = userEmail
    .split("@")[0]
    .substring(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userEmail}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {isSeller && (
          <DropdownMenuItem asChild>
            <Link to="/seller/dashboard" className="flex items-center cursor-pointer">
              <Store className="mr-2 h-4 w-4" />
              <span>Seller Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}
        
        {!isSeller && (
          <DropdownMenuItem asChild>
            <Link to="/seller/register" className="flex items-center cursor-pointer">
              <Store className="mr-2 h-4 w-4" />
              <span>Become a Seller</span>
            </Link>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center cursor-pointer">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="flex items-center cursor-pointer"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
