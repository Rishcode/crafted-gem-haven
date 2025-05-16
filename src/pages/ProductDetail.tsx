import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, Share, ShoppingBag, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { MOCK_PRODUCTS } from "@/utils/types";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/contexts/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  // Find the product based on the id
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  
  // Fallback if product not found
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-serif font-semibold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">
          Sorry, the product you are looking for does not exist.
        </p>
        <Button asChild>
          <Link to="/">Return Home</Link>
        </Button>
      </div>
    );
  }
  
  // Sample images for the gallery (in a real app, these would come from the product)
  const images = [
    product.imageUrl,
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80"
  ];
  
  // Find related products (same category)
  const relatedProducts = MOCK_PRODUCTS.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const handleAddToFavorites = () => {
    // ... keep existing code
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link to={`/category/${product.category}`} className="hover:text-primary capitalize">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </div>
      
      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-secondary/20">
            <img 
              src={images[selectedImage]} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                className={`aspect-square rounded-md overflow-hidden border-2 ${
                  selectedImage === index ? "border-primary" : "border-transparent"
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img 
                  src={image} 
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <div className="mb-1 text-sm text-muted-foreground">
            By <Link to={`/seller/${product.artisan}`} className="hover:text-primary">{product.artisan}</Link>
          </div>
          <h1 className="text-3xl font-serif font-semibold mb-2">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-5 w-5 ${
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
            <span className="ml-2 text-sm text-muted-foreground">
              {product.rating.toFixed(1)} (24 reviews)
            </span>
          </div>
          
          {/* Price */}
          <div className="text-2xl font-semibold mb-4 flex items-center">
            <IndianRupee className="h-5 w-5 mr-1" />
            {product.price.toLocaleString('en-IN')}
          </div>
          
          {/* Short Description */}
          <p className="text-muted-foreground mb-6">{product.description}</p>
          
          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <span className="mr-4 font-medium">Quantity:</span>
            <div className="flex border rounded-md">
              <button
                className="px-3 py-1 border-r"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button
                className="px-3 py-1 border-l"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              size="lg" 
              className="flex-1"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="flex-1"
              onClick={handleAddToFavorites}
            >
              <Heart className="mr-2 h-4 w-4" />
              Add to Favorites
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex"
            >
              <Share className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
          
          {/* Additional Info */}
          <div className="space-y-4 text-sm">
            <div className="flex gap-2">
              <span className="font-medium">Category:</span>
              <Link to={`/category/${product.category}`} className="text-primary capitalize hover:underline">
                {product.category}
              </Link>
            </div>
            <div className="flex gap-2">
              <span className="font-medium">Artisan:</span>
              <Link to={`/seller/${product.artisan}`} className="text-primary hover:underline">
                {product.artisan}
              </Link>
            </div>
            <div className="flex gap-2">
              <span className="font-medium">Ships Within:</span>
              <span>1-2 business days</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs with additional information */}
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews (24)</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <p className="mb-4">
                {product.description}
              </p>
              <p className="mb-4">
                Each piece is carefully handcrafted by skilled artisans using traditional techniques passed down through generations.
                The unique character of handmade items means that no two pieces are exactly alike, making your jewelry truly one-of-a-kind.
              </p>
              <p>
                Our artisans take pride in their work, focusing on quality, craftsmanship, and sustainable practices.
                By purchasing this item, you're supporting independent artisans and traditional crafting techniques.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="details" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium mb-2">Materials</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Ethically sourced gemstones</li>
                  <li>Recycled sterling silver</li>
                  <li>Tarnish-resistant coating</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Dimensions</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Length: 18 inches</li>
                  <li>Pendant: 0.75 × 0.5 inches</li>
                  <li>Weight: 12 grams</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Care Instructions</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Store in a cool, dry place</li>
                  <li>Clean with a soft polishing cloth</li>
                  <li>Avoid contact with perfumes and chemicals</li>
                  <li>Remove before swimming or bathing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Shipping & Returns</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Ships within 1-2 business days</li>
                  <li>Free shipping on orders over $75</li>
                  <li>Returns accepted within 30 days</li>
                  <li>See our <Link to="/returns" className="text-primary hover:underline">return policy</Link> for details</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Customer Reviews</h3>
                <Button>Write a Review</Button>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <div className="font-medium">Sarah M.</div>
                      <span className="mx-2">•</span>
                      <span className="text-muted-foreground text-sm">May 10, 2025</span>
                    </div>
                    <div className="flex my-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="h-4 w-4 text-yellow-400"
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
                  </div>
                  <div className="text-sm text-muted-foreground">Verified Purchase</div>
                </div>
                <h4 className="font-medium mt-2 mb-1">Absolutely stunning!</h4>
                <p className="text-muted-foreground">
                  This piece is even more beautiful in person than in the photos. The craftsmanship is exceptional,
                  and it's obvious that a lot of care went into making it. I've received so many compliments already!
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <div className="font-medium">Michael T.</div>
                      <span className="mx-2">•</span>
                      <span className="text-muted-foreground text-sm">April 28, 2025</span>
                    </div>
                    <div className="flex my-1">
                      {[...Array(4)].map((_, i) => (
                        <svg
                          key={i}
                          className="h-4 w-4 text-yellow-400"
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
                      {[...Array(1)].map((_, i) => (
                        <svg
                          key={i}
                          className="h-4 w-4 text-gray-200"
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
                  </div>
                  <div className="text-sm text-muted-foreground">Verified Purchase</div>
                </div>
                <h4 className="font-medium mt-2 mb-1">Great gift</h4>
                <p className="text-muted-foreground">
                  Bought this as a gift for my wife and she absolutely loves it. The quality is excellent 
                  and the packaging was beautiful too. Shipping was a bit slower than expected, but worth the wait.
                </p>
              </div>
              
              <Button variant="outline" className="w-full">Load More Reviews</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-serif font-semibold mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
