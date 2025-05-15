
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
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

const CategoryProducts = () => {
  const { category } = useParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  
  // Get products for this category
  const products = MOCK_PRODUCTS.filter(
    p => p.category === category || !category
  );
  
  // Filter products based on filters
  const filteredProducts = products.filter(product => {
    // Price filter
    const passesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    // Materials filter (if any selected)
    const passesMaterials = selectedMaterials.length === 0 || 
      selectedMaterials.some(m => product.description.toLowerCase().includes(m.toLowerCase()));
    
    return passesPrice && passesMaterials;
  });
  
  // Sample materials for filter
  const materials = ["silver", "gold", "gemstone", "pearl", "copper", "wood"];
  
  // Handle material filter change
  const handleMaterialChange = (material: string) => {
    setSelectedMaterials(prev =>
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
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
      </div>
      
      {/* Category Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-serif font-semibold mb-2 capitalize">
          {category ? `${category}` : "All Products"}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {category 
            ? `Explore our collection of handcrafted ${category} made by talented artisans from around the world.`
            : "Browse our complete collection of handcrafted jewelry and materials."
          }
        </p>
      </div>
      
      {/* Filters and Products */}
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        {/* Desktop Filters */}
        <div className="hidden md:block space-y-6">
          <div>
            <h3 className="font-medium mb-4">Price Range</h3>
            <Slider 
              defaultValue={[0, 100]} 
              max={100} 
              step={1}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mb-6"
            />
            <div className="flex items-center justify-between text-sm">
              <div>${priceRange[0]}</div>
              <div>${priceRange[1]}{priceRange[1] === 100 && "+"}</div>
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
              {["Elena Crafts", "Ocean Treasures", "Silver Stories"].map(artisan => (
                <div key={artisan} className="flex items-center">
                  <Checkbox id={`artisan-${artisan}`} />
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
                  <Checkbox id={`rating-${rating}`} />
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
          
          <Button className="w-full">Clear Filters</Button>
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
                      defaultValue={[0, 100]} 
                      max={100} 
                      step={1}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <div>${priceRange[0]}</div>
                      <div>${priceRange[1]}{priceRange[1] === 100 && "+"}</div>
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
                  
                  <Button className="w-full">Apply Filters</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Sorting and View Options */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div className="text-sm text-muted-foreground mb-4 sm:mb-0">
              Showing {filteredProducts.length} products
            </div>
            <div className="flex items-center gap-4">
              <Select defaultValue="featured">
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
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProducts.map((product) => (
                <ListProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          {/* Pagination */}
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
        </div>
      </div>
    </main>
  );
};

// List View Product Card Component
const ListProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col sm:flex-row overflow-hidden rounded-lg bg-white card-shadow">
      <div className="relative sm:w-1/3">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="h-full w-full object-cover aspect-square sm:aspect-auto"
        />
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
          <div className="font-semibold text-lg">${product.price.toFixed(2)}</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Quick View
            </Button>
            <Button size="sm">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
