
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/utils/types";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Quick view functionality could be added here
  };

  return (
    <div className={cn("group relative overflow-hidden rounded-lg bg-white card-shadow", className)}>
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Favorite Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white"
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">Add to favorites</span>
        </Button>
        
        {/* Tags */}
        <div className="absolute bottom-2 left-2 flex gap-2">
          {product.isNew && (
            <Badge className="bg-primary text-white">New</Badge>
          )}
          {product.isFeatured && (
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">Featured</Badge>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-1 text-xs text-muted-foreground">{product.artisan}</div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium line-clamp-1 hover:underline underline-offset-2">{product.name}</h3>
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <div className="font-semibold flex items-center">
            <IndianRupee className="h-3 w-3 mr-1" />
            {product.price.toLocaleString('en-IN')}
          </div>
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) 
                      ? "text-yellow-400" 
                      : i < product.rating 
                        ? "text-yellow-400/50" 
                        : "text-gray-200"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-xs text-muted-foreground">
              ({product.rating.toFixed(1)})
            </span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="w-full" onClick={handleQuickView}>
            Quick View
          </Button>
          <Button size="sm" className="w-full" onClick={handleAddToCart}>
            <ShoppingBag className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
