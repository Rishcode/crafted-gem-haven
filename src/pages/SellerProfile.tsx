
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Seller, Product } from "@/utils/types";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Store, MapPin, Phone, Mail, Star } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import CustomOrderForm from "@/components/CustomOrderForm";
import { MOCK_PRODUCTS } from "@/utils/types";

const SellerProfile = () => {
  const { sellerId } = useParams();
  const { toast } = useToast();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSellerProfile = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('sellers')
          .select('*')
          .eq('id', sellerId)
          .eq('verified', true)
          .single();

        if (error) throw error;
        
        if (data) {
          setSeller(data as unknown as Seller);
          
          // For now, just filtering the mock products by seller
          // In a real app, we would fetch the seller's products from the database
          setProducts(
            MOCK_PRODUCTS.filter(p => p.artisan === data.store_name).length > 0
              ? MOCK_PRODUCTS.filter(p => p.artisan === data.store_name)
              : MOCK_PRODUCTS.slice(0, 4) // Just show some random products if none match
          );
        }
      } catch (error: any) {
        console.error("Error fetching seller profile:", error);
        toast({
          variant: "destructive",
          title: "Failed to load seller profile",
          description: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (sellerId) {
      fetchSellerProfile();
    }
  }, [sellerId, toast]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-32 bg-secondary/20 rounded-lg"></div>
          <div className="h-8 w-1/3 bg-secondary/20 rounded"></div>
          <div className="h-4 w-2/3 bg-secondary/20 rounded"></div>
          <div className="h-4 w-1/2 bg-secondary/20 rounded"></div>
          <div className="h-64 bg-secondary/20 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Store className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-3xl font-serif font-semibold mb-4">Seller Not Found</h1>
        <p className="text-muted-foreground mb-6">
          Sorry, the seller you are looking for does not exist or is not verified yet.
        </p>
        <Button asChild>
          <Link to="/sellers">View All Sellers</Link>
        </Button>
      </div>
    );
  }

  const storeInitials = seller.store_name
    .split(' ')
    .map(word => word[0].toUpperCase())
    .join('')
    .substring(0, 2);

  const locationText = [seller.city, seller.state, seller.country]
    .filter(Boolean)
    .join(', ');

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/sellers" className="hover:text-primary">Artisan Stores</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{seller.store_name}</span>
      </div>

      {/* Seller Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8 items-center md:items-start">
        <Avatar className="h-24 w-24 border-2 border-primary">
          <AvatarFallback className="text-2xl">{storeInitials}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-serif font-semibold">{seller.store_name}</h1>
          
          <div className="flex flex-wrap gap-4 mt-3 justify-center md:justify-start">
            {locationText && (
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{locationText}</span>
              </div>
            )}
            
            <div className="flex items-center text-sm">
              <Star className="h-4 w-4 mr-1 text-yellow-400" />
              <span>4.8 (24 reviews)</span>
            </div>
          </div>
          
          <p className="mt-4 text-muted-foreground">
            {seller.bio || "Artisan specializing in handcrafted jewelry and artifacts."}
          </p>
          
          <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
            <Button>Shop Products</Button>
            <Button variant="outline">Contact Seller</Button>
          </div>
        </div>
      </div>
      
      <Separator className="my-8" />
      
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-8">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="custom">Custom Order</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {products.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No Products Available</h3>
              <p className="text-muted-foreground">
                This artisan hasn't added any products yet.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="custom">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-serif font-semibold mb-3">Request Custom Order</h2>
              <p className="text-muted-foreground">
                Have a specific design in mind? Fill out the form below to request a custom piece
                from {seller.store_name}.
              </p>
            </div>
            <CustomOrderForm sellerId={seller.id} sellerName={seller.store_name} />
          </div>
        </TabsContent>
        
        <TabsContent value="about">
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-semibold mb-4">About {seller.store_name}</h2>
              <p className="text-muted-foreground">
                {seller.bio || `${seller.store_name} is an artisan store specializing in handcrafted jewelry and artifacts. Each piece is carefully crafted with attention to detail and quality.`}
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-3">Contact Information</h3>
              <div className="space-y-3">
                {seller.phone_number && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{seller.phone_number}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>contact@{seller.store_name.toLowerCase().replace(/\s+/g, '')}.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-3">Location</h3>
              <address className="not-italic text-muted-foreground">
                {seller.address && <p>{seller.address}</p>}
                {seller.city && seller.state && (
                  <p>{seller.city}, {seller.state} {seller.pin_code}</p>
                )}
                {seller.country && <p>{seller.country}</p>}
              </address>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default SellerProfile;
