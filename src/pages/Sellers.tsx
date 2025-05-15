
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Seller } from "@/utils/types";
import { Store, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const SellerCard = ({ seller }: { seller: Seller }) => {
  const storeInitials = seller.store_name
    .split(' ')
    .map(word => word[0].toUpperCase())
    .join('')
    .substring(0, 2);

  const locationText = [seller.city, seller.state]
    .filter(Boolean)
    .join(', ');

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-primary">
            <AvatarFallback>{storeInitials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{seller.store_name}</CardTitle>
            {locationText && (
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{locationText}</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-muted-foreground line-clamp-2">
          {seller.bio || "Artisan specializing in handcrafted jewelry and artifacts."}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4 pb-2">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/seller/${seller.id}`}>View Profile</Link>
        </Button>
        <Button size="sm" asChild>
          <Link to={`/seller/${seller.id}/products`}>Shop Products</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const Sellers = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSellers = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('sellers')
          .select('*')
          .eq('verified', true)
          .order('store_name', { ascending: true });

        if (error) throw error;
        
        setSellers(data as unknown as Seller[]);
      } catch (error: any) {
        console.error("Error fetching sellers:", error);
        toast({
          variant: "destructive",
          title: "Failed to load sellers",
          description: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSellers();
  }, [toast]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-serif font-semibold mb-3">Artisan Stores</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover talented artisans from across India, browse their unique collections,
          and place custom orders directly with the creators.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="h-48 animate-pulse bg-secondary/20" />
          ))}
        </div>
      ) : sellers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sellers.map(seller => (
            <SellerCard key={seller.id} seller={seller} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Store className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">No Artisan Stores Found</h3>
          <p className="text-muted-foreground">
            Check back soon as new artisans join our platform.
          </p>
        </div>
      )}
    </div>
  );
};

export default Sellers;
