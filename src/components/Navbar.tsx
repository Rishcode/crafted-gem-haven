
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose 
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import SearchBar from "./SearchBar";
import { UserDropdown } from "./ui/user-dropdown";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Add scroll event listener
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <SheetClose asChild>
                  <Link to="/" className="px-4 py-2 hover:bg-secondary rounded-md">Home</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/category/necklaces" className="px-4 py-2 hover:bg-secondary rounded-md">Necklaces</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/category/earrings" className="px-4 py-2 hover:bg-secondary rounded-md">Earrings</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/category/bracelets" className="px-4 py-2 hover:bg-secondary rounded-md">Bracelets</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/category/rings" className="px-4 py-2 hover:bg-secondary rounded-md">Rings</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/category/materials" className="px-4 py-2 hover:bg-secondary rounded-md">Materials</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/sellers" className="px-4 py-2 hover:bg-secondary rounded-md">Artisan Stores</Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-xl md:text-2xl font-serif font-bold">Kala Connect</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className="text-sm font-medium hover:text-primary hover:underline underline-offset-4"
            >
              Home
            </Link>
            <Link 
              to="/category/necklaces" 
              className="text-sm font-medium hover:text-primary hover:underline underline-offset-4"
            >
              Necklaces
            </Link>
            <Link 
              to="/category/earrings" 
              className="text-sm font-medium hover:text-primary hover:underline underline-offset-4"
            >
              Earrings
            </Link>
            <Link 
              to="/category/bracelets" 
              className="text-sm font-medium hover:text-primary hover:underline underline-offset-4"
            >
              Bracelets
            </Link>
            <Link 
              to="/category/rings" 
              className="text-sm font-medium hover:text-primary hover:underline underline-offset-4"
            >
              Rings
            </Link>
            <Link 
              to="/sellers" 
              className="text-sm font-medium hover:text-primary hover:underline underline-offset-4"
            >
              Artisan Stores
            </Link>
          </nav>

          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <Link to="/favorites">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Favorites</span>
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                  0
                </span>
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            <UserDropdown />
          </div>
        </div>
      </div>
      
      <div className="border-b md:hidden"></div>
      <div className="flex justify-center p-2 md:hidden">
        <SearchBar />
      </div>
    </header>
  );
};

export default Navbar;
