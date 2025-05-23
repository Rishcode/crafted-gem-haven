
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Check, X } from "lucide-react";

type VerificationSeller = {
  id: string;
  store_name: string;
  created_at: string;
  user_id: string;
  verification_status: string;
  userEmail?: string;
  documents: {
    id: string;
    document_type: string;
    file_path: string;
  }[];
};

const AdminSellerVerification = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sellers, setSellers] = useState<VerificationSeller[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  // Check if user is admin - For now, we'll consider the first registered user as admin
  // In a real app, you would have proper admin roles
  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    // This is a placeholder - in a real app, you would check admin status differently
    const checkAdminStatus = async () => {
      // For demo purposes, we just proceed with fetching seller data
      fetchPendingSellers();
    };

    checkAdminStatus();
  }, [user, navigate]);

  const fetchPendingSellers = async () => {
    try {
      // Fetch sellers with pending verification status
      const { data: sellersData, error: sellersError } = await supabase
        .from("sellers")
        .select("*")
        .eq("verification_status", "pending");

      if (sellersError) throw sellersError;

      // Fetch documents for each seller
      const sellersWithDocs = await Promise.all(
        (sellersData || []).map(async (seller) => {
          // Get documents
          const { data: docsData, error: docsError } = await supabase
            .from("seller_documents")
            .select("*")
            .eq("seller_id", seller.id);

          if (docsError) throw docsError;

          // Get user email (in a real app, you'd have a better way to link sellers to user emails)
          const { data: userData, error: userError } = await supabase.auth.admin.getUserById(seller.user_id);
          
          let userEmail = "Email not found";
          if (!userError && userData) {
            userEmail = userData.user.email || "No email provided";
          }

          return {
            ...seller,
            userEmail,
            documents: docsData || [],
          };
        })
      );

      setSellers(sellersWithDocs);
    } catch (error) {
      console.error("Error fetching pending sellers:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load pending sellers.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (sellerId: string, approved: boolean) => {
    setLoadingAction(sellerId);
    try {
      // Update seller verification status
      const { error } = await supabase
        .from("sellers")
        .update({
          verification_status: approved ? "verified" : "rejected",
          updated_at: new Date().toISOString(),
        })
        .eq("id", sellerId);

      if (error) throw error;

      // Update UI
      setSellers(sellers.filter((seller) => seller.id !== sellerId));

      toast({
        title: `Seller ${approved ? "Approved" : "Rejected"}`,
        description: `The seller has been ${approved ? "verified" : "rejected"} successfully.`,
      });

      // In a real app, you would send a notification to the seller
    } catch (error) {
      console.error(`Error ${approved ? "approving" : "rejecting"} seller:`, error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${approved ? "approve" : "reject"} seller.`,
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const getDocumentTypeDisplay = (type: string) => {
    switch (type) {
      case "id_proof":
        return "ID Proof";
      case "business_license":
        return "Business License";
      case "tax_certificate":
        return "Tax Certificate";
      default:
        return type.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
    }
  };

  if (loading) {
    return (
      <div className="container py-12 flex justify-center">
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle>Seller Verification</CardTitle>
            <CardDescription>Loading pending seller verifications...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Seller Verification Dashboard</CardTitle>
          <CardDescription>
            Review and verify seller documents. Approved sellers will be automatically listed on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sellers.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-lg font-medium">No pending verifications</h3>
              <p className="text-muted-foreground mt-2">
                All sellers have been verified. Check back later for new registrations.
              </p>
            </div>
          ) : (
            <Table>
              <TableCaption>List of sellers awaiting verification</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Store Name</TableHead>
                  <TableHead>Seller Email</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sellers.map((seller) => (
                  <TableRow key={seller.id}>
                    <TableCell className="font-medium">{seller.store_name}</TableCell>
                    <TableCell>{seller.userEmail}</TableCell>
                    <TableCell>{new Date(seller.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-2">
                        {seller.documents.length > 0 ? (
                          seller.documents.map((doc) => (
                            <a
                              key={doc.id}
                              href={doc.file_path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline flex items-center"
                            >
                              {getDocumentTypeDisplay(doc.document_type)}
                            </a>
                          ))
                        ) : (
                          <span className="text-red-500">No documents uploaded</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              size="sm" 
                              className="flex items-center gap-1"
                              disabled={loadingAction === seller.id}
                            >
                              <Check className="h-4 w-4" />
                              Approve
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirm Approval</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to approve {seller.store_name}? This will make their store active and visible to all users.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleVerification(seller.id, true)}
                              >
                                Approve Seller
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              className="flex items-center gap-1"
                              disabled={loadingAction === seller.id}
                            >
                              <X className="h-4 w-4" />
                              Reject
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirm Rejection</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to reject {seller.store_name}? They will need to re-submit their verification documents.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                variant="destructive"
                                onClick={() => handleVerification(seller.id, false)}
                              >
                                Reject Seller
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <Button 
                          variant="outline" 
                          size="sm"
                          asChild
                        >
                          <Link to={`/seller/${seller.id}`}>View Profile</Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSellerVerification;
