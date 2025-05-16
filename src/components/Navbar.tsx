
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import { useAuth } from "@/contexts/AuthContext";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Cart from "./Cart";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const { user, isSeller, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // UserButton component inline
  const UserButton = () => {
    const userEmail = user?.email || "";
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
                <span>Seller Dashboard</span>
              </Link>
            </DropdownMenuItem>
          )}
          
          {!isSeller && (
            <DropdownMenuItem asChild>
              <Link to="/seller/register" className="flex items-center cursor-pointer">
                <span>Become a Seller</span>
              </Link>
            </DropdownMenuItem>
          )}
          
          <DropdownMenuItem asChild>
            <Link to="/profile" className="flex items-center cursor-pointer">
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="flex items-center cursor-pointer"
            onClick={() => signOut()}
          >
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full ${
        isScrolled
          ? "bg-white shadow-sm"
          : "bg-white/80 backdrop-blur-sm"
      } transition-all duration-200`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-primary"
          >
            <span className="hidden sm:inline-block">Kala Connect</span>
            <span className="sm:hidden">KC</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link
              to="/all-products"
              className="text-sm font-medium hover:text-primary"
            >
              Shop
            </Link>
            <Link
              to="/sellers"
              className="text-sm font-medium hover:text-primary"
            >
              Artisans
            </Link>
            {user && isSeller && (
              <Link
                to="/seller/dashboard"
                className="text-sm font-medium hover:text-primary"
              >
                Seller Dashboard
              </Link>
            )}
          </nav>

          {/* Search, User, and Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block w-64">
              <SearchBar />
            </div>
            
            {/* Cart */}
            <Cart />

            {/* User Account */}
            {user ? (
              <UserButton />
            ) : (
              <Button onClick={() => navigate("/auth")}>Sign In</Button>
            )}

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col gap-4 mt-8">
                    <div className="mb-4">
                      <SearchBar />
                    </div>
                    <SheetClose asChild>
                      <Link
                        to="/"
                        className="block py-2 px-4 hover:bg-secondary rounded-md"
                      >
                        Home
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        to="/all-products"
                        className="block py-2 px-4 hover:bg-secondary rounded-md"
                      >
                        Shop
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        to="/sellers"
                        className="block py-2 px-4 hover:bg-secondary rounded-md"
                      >
                        Artisans
                      </Link>
                    </SheetClose>
                    {user && isSeller && (
                      <SheetClose asChild>
                        <Link
                          to="/seller/dashboard"
                          className="block py-2 px-4 hover:bg-secondary rounded-md"
                        >
                          Seller Dashboard
                        </Link>
                      </SheetClose>
                    )}
                    <div className="mt-4">
                      {!user && (
                        <SheetClose asChild>
                          <Button
                            onClick={() => navigate("/auth")}
                            className="w-full"
                          >
                            Sign In
                          </Button>
                        </SheetClose>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
