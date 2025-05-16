
import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { 
  ChevronDown,
  Filter,
  Grid2X2,
  LayoutList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { MOCK_PRODUCTS, Product } from "@/utils/types";
import ProductCard from "@/components/ProductCard";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CategorySelector from "@/components/CategorySelector";
import SearchBar from "@/components/SearchBar";

const CategoryProducts = () => {
  const { category } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q') || "";

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedArtisans, setSelectedArtisans] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [sortOption, setSortOption] = useState<string>("featured");
  
  // Get all products
  const allProducts = MOCK_PRODUCTS;
  
  // Extract unique artisans for the filter
  const artisans = Array.from(new Set(allProducts.map(product => product.artisan)));
  
  // Materials for filtering (common keywords)
  const materials = ["silver", "gold", "gemstone", "pearl", "copper", "wood", "glass", "brass"];
  
  // Filter products based on all filters and search query
  const filteredProducts = allProducts.filter(product => {
    // Category filter (if category is specified)
    const passesCategory = !category || product.category === category.toLowerCase();
    
    // Price filter
    const passesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    // Materials filter (if any selected)
    const passesMaterials = selectedMaterials.length === 0 || 
      selectedMaterials.some(m => 
        product.description.toLowerCase().includes(m.toLowerCase()) || 
        product.name.toLowerCase().includes(m.toLowerCase())
      );
    
    // Artisan filter (if any selected)
    const passesArtisans = selectedArtisans.length === 0 || 
      selectedArtisans.includes(product.artisan);
    
    // Rating filter (if any selected)
    const passesRatings = selectedRatings.length === 0 || 
      selectedRatings.some(r => product.rating >= r);
    
    // Search query filter
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.artisan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return passesCategory && passesPrice && passesMaterials && passesArtisans && passesRatings && matchesSearch;
  });

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low-high":
        return a.price - b.price;
      case "price-high-low":
        return b.price - a.price;
      case "newest":
        return a.isNew ? -1 : b.isNew ? 1 : 0;
      case "rating":
        return b.rating - a.rating;
      case "featured":
      default:
        return b.isFeatured ? 1 : a.isFeatured ? -1 : 0;
    }
  });
  
  // Handle material filter change
  const handleMaterialChange = (material: string) => {
    setSelectedMaterials(prev =>
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };
  
  // Handle artisan filter change
  const handleArtisanChange = (artisan: string) => {
    setSelectedArtisans(prev =>
      prev.includes(artisan)
        ? prev.filter(a => a !== artisan)
        : [...prev, artisan]
    );
  };
  
  // Handle rating filter change
  const handleRatingChange = (rating: number) => {
    setSelectedRatings(prev =>
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };
  
  // Handle clear filters
  const handleClearFilters = () => {
    setPriceRange([0, 10000]);
    setSelectedMaterials([]);
    setSelectedArtisans([]);
    setSelectedRatings([]);
  };
  
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground capitalize">
          {category || "All Products"}
        </span>
        {searchQuery && (
          <>
            <span className="mx-2">/</span>
            <span className="text-foreground">Search: "{searchQuery}"</span>
          </>
        )}
      </div>
      
      {/* Category Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-serif font-semibold mb-2 capitalize">
          {searchQuery 
            ? `Search Results for "${searchQuery}"` 
            : category 
              ? `${category}` 
              : "All Products"}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {searchQuery 
            ? `Showing ${sortedProducts.length} results for "${searchQuery}"`
            : category 
              ? `Explore our collection of handcrafted ${category} made by talented artisans from around the world.`
              : "Browse our complete collection of handcrafted jewelry and materials."
          }
        </p>
      </div>

      {/* Search and Category Selector */}
      <div className="mb-8 grid gap-4">
        <div className="w-full max-w-md mx-auto">
          <SearchBar />
        </div>
        <CategorySelector />
      </div>
      
      {/* Filters and Products */}
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        {/* Desktop Filters */}
        <div className="hidden md:block space-y-6">
          <div>
            <h3 className="font-medium mb-4">Price Range</h3>
            <Slider 
              defaultValue={[0, 10000]} 
              max={10000} 
              step={100}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mb-6"
            />
            <div className="flex items-center justify-between text-sm">
              <div>₹{priceRange[0]}</div>
              <div>₹{priceRange[1]}{priceRange[1] === 10000 && "+"}</div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-4">Materials</h3>
            <div className="space-y-3">
              {materials.map(material => (
                <div key={material} className="flex items-center">
                  <Checkbox 
                    id={`material-${material}`}
                    checked={selectedMaterials.includes(material)}
                    onCheckedChange={() => handleMaterialChange(material)}
                  />
                  <label
                    htmlFor={`material-${material}`}
                    className="ml-2 text-sm capitalize"
                  >
                    {material}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-4">Artisan</h3>
            <div className="space-y-3">
              {artisans.map(artisan => (
                <div key={artisan} className="flex items-center">
                  <Checkbox 
                    id={`artisan-${artisan}`} 
                    checked={selectedArtisans.includes(artisan)}
                    onCheckedChange={() => handleArtisanChange(artisan)}
                  />
                  <label
                    htmlFor={`artisan-${artisan}`}
                    className="ml-2 text-sm"
                  >
                    {artisan}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-4">Rating</h3>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map(rating => (
                <div key={rating} className="flex items-center">
                  <Checkbox 
                    id={`rating-${rating}`}
                    checked={selectedRatings.includes(rating)}
                    onCheckedChange={() => handleRatingChange(rating)}
                  />
                  <label
                    htmlFor={`rating-${rating}`}
                    className="ml-2 text-sm flex items-center"
                  >
                    <div className="flex mr-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${
                            i < rating ? "text-yellow-400" : "text-gray-200"
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
                    & Above
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <Button className="w-full" onClick={handleClearFilters}>Clear Filters</Button>
        </div>
        
        {/* Products Section */}
        <div>
          {/* Mobile Filters */}
          <div className="md:hidden mb-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter Products
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="space-y-6 py-4">
                  <div>
                    <h3 className="font-medium mb-4">Price Range</h3>
                    <Slider 
                      defaultValue={[0, 10000]} 
                      max={10000} 
                      step={100}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <div>₹{priceRange[0]}</div>
                      <div>₹{priceRange[1]}{priceRange[1] === 10000 && "+"}</div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-4">Materials</h3>
                    <div className="space-y-3">
                      {materials.map(material => (
                        <div key={material} className="flex items-center">
                          <Checkbox 
                            id={`mobile-material-${material}`}
                            checked={selectedMaterials.includes(material)}
                            onCheckedChange={() => handleMaterialChange(material)}
                          />
                          <label
                            htmlFor={`mobile-material-${material}`}
                            className="ml-2 text-sm capitalize"
                          >
                            {material}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-4">Artisan</h3>
                    <div className="space-y-3">
                      {artisans.slice(0, 5).map(artisan => (
                        <div key={artisan} className="flex items-center">
                          <Checkbox 
                            id={`mobile-artisan-${artisan}`}
                            checked={selectedArtisans.includes(artisan)}
                            onCheckedChange={() => handleArtisanChange(artisan)}
                          />
                          <label
                            htmlFor={`mobile-artisan-${artisan}`}
                            className="ml-2 text-sm"
                          >
                            {artisan}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <Button className="w-full" onClick={handleClearFilters}>Apply Filters</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Sorting and View Options */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div className="text-sm text-muted-foreground mb-4 sm:mb-0">
              Showing {sortedProducts.length} products
            </div>
            <div className="flex items-center gap-4">
              <Select 
                value={sortOption}
                onValueChange={(value) => setSortOption(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest Arrivals</SelectItem>
                  <SelectItem value="rating">Best Rating</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="hidden sm:flex border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-muted" : ""}
                >
                  <Grid2X2 className="h-4 w-4" />
                  <span className="sr-only">Grid view</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-muted" : ""}
                >
                  <LayoutList className="h-4 w-4" />
                  <span className="sr-only">List view</span>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Product Grid */}
          {sortedProducts.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {sortedProducts.map((product) => (
                  <ListProductCard key={product.id} product={product} />
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No Products Found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search terms.
              </p>
              <Button onClick={handleClearFilters}>Clear All Filters</Button>
            </div>
          )}
          
          {/* Pagination - only show if we have more than a few products */}
          {sortedProducts.length > 9 && (
            <div className="flex justify-center mt-12">
              <nav>
                <ul className="flex">
                  <li>
                    <Button variant="outline" size="icon" className="rounded-r-none">
                      <ChevronDown className="h-4 w-4 rotate-90" />
                      <span className="sr-only">Previous</span>
                    </Button>
                  </li>
                  <li>
                    <Button variant="outline" size="sm" className="rounded-none bg-primary text-white hover:bg-primary/90 hover:text-white">
                      1
                    </Button>
                  </li>
                  <li>
                    <Button variant="outline" size="sm" className="rounded-none">
                      2
                    </Button>
                  </li>
                  <li>
                    <Button variant="outline" size="sm" className="rounded-none">
                      3
                    </Button>
                  </li>
                  <li>
                    <Button variant="outline" size="icon" className="rounded-l-none">
                      <ChevronDown className="h-4 w-4 -rotate-90" />
                      <span className="sr-only">Next</span>
                    </Button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

// List View Product Card Component
const ListProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="flex flex-col sm:flex-row overflow-hidden rounded-lg bg-white card-shadow">
      <div className="relative sm:w-1/3">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="h-full w-full object-cover aspect-square sm:aspect-auto"
          />
        </Link>
        {/* Tags */}
        <div className="absolute bottom-2 left-2 flex gap-2">
          {product.isNew && (
            <span className="bg-primary text-white px-2 py-1 text-xs font-medium rounded">
              New
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-white/80 backdrop-blur-sm px-2 py-1 text-xs font-medium rounded border">
              Featured
            </span>
          )}
        </div>
      </div>
      
      <div className="flex flex-col p-4 sm:w-2/3">
        <div className="mb-1 text-xs text-muted-foreground">{product.artisan}</div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium hover:underline underline-offset-2">{product.name}</h3>
        </Link>
        
        <div className="flex items-center mt-1 mb-2">
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
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{product.description}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="font-semibold text-lg flex items-center">
            <IndianRupee className="h-4 w-4 mr-1" />
            {product.price.toLocaleString('en-IN')}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/product/${product.id}`}>View Details</Link>
            </Button>
            <Button size="sm" onClick={handleAddToCart}>
              <ShoppingBag className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add necessary imports at the top
import { useCart } from "@/contexts/CartContext";
import { IndianRupee, ShoppingBag } from "lucide-react";

export default CategoryProducts;
