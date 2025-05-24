import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Check, X, Eye, Download, Calendar, Store, Mail, FileText } from "lucide-react";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";

type VerificationSeller = {
  id: string;
  store_name: string;
  created_at: string;
  user_id: string;
  verification_status: string;
  bio?: string;
  phone_number?: string;
  address?: string;
  city?: string;
  state?: string;
  pin_code?: string;
  country: string;
  userEmail?: string;
  documents: {
    id: string;
    document_type: string;
    file_path: string;
  }[];
};

const AdminSellerVerification = () => {
  // ... keep existing code (useState and useEffect for sellers and loading)
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sellers, setSellers] = useState<VerificationSeller[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [selectedSeller, setSelectedSeller] = useState<VerificationSeller | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchPendingSellers();
  }, [user, navigate]);

  const fetchPendingSellers = async () => {
    try {
      // Fetch sellers with pending verification status
      const { data: sellersData, error: sellersError } = await supabase
        .from("sellers")
        .select("*")
        .eq("verification_status", "pending")
        .order("created_at", { ascending: false });

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

          // For demo purposes, we'll use a mock email
          const userEmail = `seller-${seller.id.substring(0, 6)}@example.com`;

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
          verified: approved,
          updated_at: new Date().toISOString(),
        })
        .eq("id", sellerId);

      if (error) throw error;

      // Update UI
      setSellers(sellers.filter((seller) => seller.id !== sellerId));

      toast({
        title: `Seller ${approved ? "Approved" : "Rejected"}`,
        description: `The seller has been ${approved ? "verified and their store is now active" : "rejected"} successfully.`,
      });

      // In a real app, you would send a notification to the seller here
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
      case "aadhar":
        return "Aadhar Card";
      case "pan":
        return "PAN Card";
      case "store_photo":
        return "Store Photo";
      case "self_photo":
        return "Self Photo";
      default:
        return type.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
    }
  };

  const DocumentViewer = ({ seller }: { seller: VerificationSeller }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Eye className="h-4 w-4" />
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            {seller.store_name} - Verification Details
          </DialogTitle>
          <DialogDescription>
            Review seller information and submitted documents
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6">
          {/* Seller Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Contact Information
              </h3>
              <div className="text-sm space-y-1">
                <p><strong>Email:</strong> {seller.userEmail}</p>
                <p><strong>Phone:</strong> {seller.phone_number || "Not provided"}</p>
                <p><strong>Store Name:</strong> {seller.store_name}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Registration Details
              </h3>
              <div className="text-sm space-y-1">
                <p><strong>Registration Date:</strong> {new Date(seller.created_at).toLocaleDateString()}</p>
                <p><strong>Status:</strong> 
                  <Badge variant="secondary" className="ml-2">
                    {seller.verification_status}
                  </Badge>
                </p>
              </div>
            </div>
          </div>

          {/* Address Information */}
          {(seller.address || seller.city) && (
            <div className="space-y-2">
              <h3 className="font-semibold">Address Information</h3>
              <div className="text-sm">
                <p>{seller.address}</p>
                <p>{seller.city}, {seller.state} {seller.pin_code}</p>
                <p>{seller.country}</p>
              </div>
            </div>
          )}

          {/* Business Description */}
          {seller.bio && (
            <div className="space-y-2">
              <h3 className="font-semibold">Business Description</h3>
              <p className="text-sm text-muted-foreground">{seller.bio}</p>
            </div>
          )}

          {/* Documents */}
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Submitted Documents
            </h3>
            <div className="grid gap-2">
              {seller.documents.length > 0 ? (
                seller.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">{getDocumentTypeDisplay(doc.document_type)}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={doc.file_path} target="_blank" rel="noopener noreferrer">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={doc.file_path} download>
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </a>
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-red-500">No documents uploaded</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  if (loading) {
    // ... keep existing code (loading state)
    return (
      <AdminProtectedRoute>
        <div className="container py-12 flex justify-center">
          <Card className="w-full max-w-4xl">
            <CardHeader>
              <CardTitle>Seller Verification</CardTitle>
              <CardDescription>Loading pending seller verifications...</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </AdminProtectedRoute>
    );
  }

  return (
    <AdminProtectedRoute>
      <div className="container py-12">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Store className="h-6 w-6" />
              Seller Verification Dashboard
            </CardTitle>
            <CardDescription>
              Review and verify seller documents. Approved sellers will be automatically listed on the platform with active stores.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sellers.length === 0 ? (
              <div className="text-center py-8">
                <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Check className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No pending verifications</h3>
                <p className="text-muted-foreground mt-2">
                  All sellers have been verified. Check back later for new registrations.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">
                    {sellers.length} Seller{sellers.length !== 1 ? 's' : ''} Pending Verification
                  </h3>
                  <Badge variant="outline">
                    {sellers.length} pending
                  </Badge>
                </div>
                
                <Table>
                  <TableCaption>List of sellers awaiting verification</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Store Information</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Registration</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sellers.map((seller) => (
                      <TableRow key={seller.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{seller.store_name}</div>
                            {seller.city && (
                              <div className="text-sm text-muted-foreground">
                                {seller.city}, {seller.state}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">{seller.userEmail}</div>
                            {seller.phone_number && (
                              <div className="text-sm text-muted-foreground">{seller.phone_number}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {new Date(seller.created_at).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge variant={seller.documents.length > 0 ? "default" : "destructive"}>
                              {seller.documents.length} docs
                            </Badge>
                            <DocumentViewer seller={seller} />
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
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
                                    Are you sure you want to approve <strong>{seller.store_name}</strong>? 
                                    This will make their store active and visible to all users on the platform.
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
                                    Are you sure you want to reject <strong>{seller.store_name}</strong>? 
                                    They will need to re-submit their verification documents.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleVerification(seller.id, false)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminProtectedRoute>
  );
};

export default AdminSellerVerification;
