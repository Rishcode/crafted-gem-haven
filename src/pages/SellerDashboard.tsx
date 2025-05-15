
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Seller } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { user, seller: authSeller } = useAuth();
  const [seller, setSeller] = useState<Seller | null>(authSeller);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    if (!seller) {
      fetchSellerData();
    }
  }, [user]);

  const fetchSellerData = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("sellers")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      
      setSeller(data);
    } catch (error: any) {
      console.error("Error fetching seller data:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load seller information",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'verified':
        return 'default'; // Green
      case 'pending':
        return 'secondary'; // Gray
      case 'rejected':
        return 'destructive'; // Red
      default:
        return 'outline';
    }
  };

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // If seller data is not available, show registration option
  if (!seller) {
    return (
      <div className="container py-12">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Become a Seller</CardTitle>
            <CardDescription>
              Register as a seller to start showcasing and selling your handcrafted jewelry and artisan goods
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="text-center mb-6">
              Join our community of artisans and reach customers who appreciate handcrafted quality
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate("/seller/register")}
            >
              Register as a Seller
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Seller Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-3">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">{seller.store_name}</CardTitle>
                <CardDescription>Joined {new Date(seller.created_at).toLocaleDateString()}</CardDescription>
              </div>
              <Badge variant={getStatusBadgeVariant(seller.verification_status)}>
                {seller.verification_status.charAt(0).toUpperCase() + seller.verification_status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {seller.verification_status === "pending" && (
              <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6">
                <h3 className="text-lg font-medium text-yellow-800">Verification Pending</h3>
                <p className="text-yellow-700">
                  Your seller account is under review. We will notify you once the verification is complete.
                </p>
              </div>
            )}
            
            {seller.verification_status === "rejected" && (
              <div className="bg-red-50 border border-red-200 rounded p-4 mb-6">
                <h3 className="text-lg font-medium text-red-800">Verification Rejected</h3>
                <p className="text-red-700">
                  Your seller verification was not approved. Please contact support for more information.
                </p>
                <Button variant="outline" className="mt-2" onClick={() => navigate(`/seller/verification/${seller.id}`)}>
                  Re-submit Documents
                </Button>
              </div>
            )}
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Business Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div>
                      <dt className="font-medium text-muted-foreground">Phone</dt>
                      <dd>{seller.phone_number || "Not provided"}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-muted-foreground">Business Description</dt>
                      <dd>{seller.bio || "Not provided"}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <address className="not-italic">
                    <p>{seller.address}</p>
                    <p>{seller.city}, {seller.state} {seller.pin_code}</p>
                    <p>{seller.country}</p>
                  </address>
                </CardContent>
              </Card>
            </div>
            
            {seller.verification_status === "verified" && (
              <div className="mt-6">
                <Button onClick={() => navigate("/seller/products")}>
                  Manage Products
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellerDashboard;
