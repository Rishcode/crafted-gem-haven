
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload } from "lucide-react";

// Define document types that need to be uploaded
const requiredDocuments = [
  {
    type: "aadhar",
    label: "Aadhar Card",
    description: "Upload a clear scan or photo of your Aadhar card"
  },
  {
    type: "pan",
    label: "PAN Card",
    description: "Upload a clear scan or photo of your PAN card"
  },
  {
    type: "store_photo",
    label: "Store/Workshop Photo",
    description: "Upload a clear photo of your store or workshop"
  },
  {
    type: "self_photo",
    label: "Self Photo",
    description: "Upload a recent photo of yourself"
  }
];

const SellerVerification = () => {
  const { sellerId } = useParams<{ sellerId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState<Record<string, boolean>>({});

  // Check if the user owns this seller account
  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const checkSellerOwnership = async () => {
      if (!sellerId) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Seller ID is missing",
        });
        navigate("/");
        return;
      }

      try {
        const { data: seller, error } = await supabase
          .from("sellers")
          .select("user_id")
          .eq("id", sellerId)
          .single();

        if (error || !seller) {
          toast({
            variant: "destructive",
            title: "Access denied",
            description: "You do not have permission to access this page",
          });
          navigate("/");
          return;
        }

        if (seller.user_id !== user.id) {
          toast({
            variant: "destructive",
            title: "Access denied",
            description: "You do not have permission to access this seller account",
          });
          navigate("/");
          return;
        }

        // Check which documents are already uploaded
        const { data: documents } = await supabase
          .from("seller_documents")
          .select("document_type")
          .eq("seller_id", sellerId);

        if (documents && documents.length > 0) {
          const uploaded: Record<string, boolean> = {};
          documents.forEach(doc => {
            uploaded[doc.document_type] = true;
          });
          setUploadedDocuments(uploaded);
        }
      } catch (error) {
        console.error("Error checking seller ownership:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to verify seller account",
        });
        navigate("/");
      }
    };

    checkSellerOwnership();
  }, [user, sellerId, navigate]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, documentType: string) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${documentType}-${Date.now()}.${fileExt}`;
    const filePath = `${sellerId}/${fileName}`;

    setIsLoading(true);

    try {
      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('seller_documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Save document record in database
      const { error: dbError } = await supabase
        .from('seller_documents')
        .insert([
          {
            seller_id: sellerId,
            document_type: documentType,
            file_path: filePath
          }
        ]);

      if (dbError) throw dbError;

      setUploadedDocuments(prev => ({
        ...prev,
        [documentType]: true
      }));

      toast({
        title: "Document uploaded",
        description: `Your ${documentType} document has been uploaded successfully.`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message || "Failed to upload document",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Determine if all documents are uploaded
  const allDocumentsUploaded = requiredDocuments.every(doc => uploadedDocuments[doc.type]);

  const handleSubmitVerification = async () => {
    if (!allDocumentsUploaded) {
      toast({
        variant: "destructive",
        title: "Incomplete submission",
        description: "Please upload all required documents before submitting",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Update the seller status
      await supabase
        .from('sellers')
        .update({ verification_status: 'pending' })
        .eq('id', sellerId);

      toast({
        title: "Verification submitted",
        description: "Your documents have been submitted for verification. We will review them and get back to you soon.",
      });

      navigate("/seller/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: error.message || "Failed to submit verification",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-12">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Document Verification</CardTitle>
          <CardDescription>
            Please upload the following documents to verify your seller account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {requiredDocuments.map((doc) => (
            <Card key={doc.type} className={`border-2 ${uploadedDocuments[doc.type] ? 'border-green-500' : 'border-gray-200'}`}>
              <CardHeader>
                <CardTitle className="text-lg">{doc.label}</CardTitle>
                <CardDescription>{doc.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileUpload(e, doc.type)}
                    disabled={isLoading || uploadedDocuments[doc.type]}
                    className="max-w-sm"
                  />
                  {uploadedDocuments[doc.type] && (
                    <div className="text-green-600 font-medium">
                      Uploaded ✓
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmitVerification} 
            disabled={isLoading || !allDocumentsUploaded}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Submit for Verification
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SellerVerification;
