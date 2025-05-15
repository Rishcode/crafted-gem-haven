
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Categories from "@/components/Categories";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Store, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <main>
      <Hero />
      <Separator />
      <FeaturedProducts />
      
      {/* Artisan Stores Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-semibold mb-4">Meet Our Artisans</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover talented creators from across India and their unique handcrafted collections.
            Shop directly from artisans or request custom-made pieces.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-muted/50 rounded-lg p-8 text-center flex flex-col items-center justify-center">
            <Store className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-medium mb-2">Browse Artisan Stores</h3>
            <p className="text-muted-foreground mb-6">
              Explore our growing community of skilled artisans and their unique creations.
            </p>
            <Button asChild>
              <Link to="/sellers">View All Stores</Link>
            </Button>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-8 text-center flex flex-col items-center justify-center">
            <ShoppingBag className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-medium mb-2">Request Custom Orders</h3>
            <p className="text-muted-foreground mb-6">
              Work directly with artisans to create personalized, one-of-a-kind pieces.
            </p>
            <Button asChild>
              <Link to="/sellers">Find an Artisan</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <Categories />
    </main>
  );
};

export default Index;
