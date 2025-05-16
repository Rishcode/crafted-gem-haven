
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { Product, MOCK_PRODUCTS } from "@/utils/types";

const FeaturedProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? MOCK_PRODUCTS.filter(product => product.category === selectedCategory)
    : MOCK_PRODUCTS.filter(product => product.isFeatured);

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-serif font-semibold mb-2">Featured Treasures</h2>
          <p className="text-muted-foreground">Discover our curated selection of handcrafted jewelry</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <Button 
            variant={selectedCategory === null ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          <Button 
            variant={selectedCategory === "necklaces" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedCategory("necklaces")}
          >
            Necklaces
          </Button>
          <Button 
            variant={selectedCategory === "earrings" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedCategory("earrings")}
          >
            Earrings
          </Button>
          <Button 
            variant={selectedCategory === "bracelets" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedCategory("bracelets")}
          >
            Bracelets
          </Button>
          <Button 
            variant={selectedCategory === "rings" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedCategory("rings")}
          >
            Rings
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <div className="mt-10 flex justify-center">
        <Button asChild className="font-medium px-8">
          <Link to="/all-products">View All Products</Link>
        </Button>
      </div>
    </section>
  );
};

export default FeaturedProducts;
