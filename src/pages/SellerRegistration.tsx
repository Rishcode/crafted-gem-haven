
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const sellerFormSchema = z.object({
  store_name: z.string()
    .min(2, {
      message: "Store name must be at least 2 characters.",
    })
    .max(50, {
      message: "Store name must not be longer than 50 characters.",
    }),
  bio: z.string().optional(),
  phone_number: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pin_code: z.string().optional(),
  account_holder_name: z.string().optional(),
  bank_account_number: z.string().optional(),
  bank_name: z.string().optional(),
  ifsc_code: z.string().optional(),
});

type SellerFormValues = z.infer<typeof sellerFormSchema>;

const SellerRegistration = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SellerFormValues>({
    resolver: zodResolver(sellerFormSchema),
    defaultValues: {
      store_name: "",
      bio: "",
      phone_number: "",
      address: "",
      city: "",
      state: "",
      pin_code: "",
      account_holder_name: "",
      bank_account_number: "",
      bank_name: "",
      ifsc_code: "",
    },
  });

  const onSubmit = async (values: SellerFormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to register as a seller",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Fix: Pass a single object and ensure store_name is required
      const { data, error } = await supabase
        .from('sellers')
        .insert({
          ...values,
          store_name: values.store_name, // Ensure this is required
          user_id: user.id 
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Registration successful!",
        description: "Your seller account has been created. Please complete verification.",
      });

      // Redirect to verification page
      navigate(`/seller/verification/${data.id}`);
    } catch (error: any) {
      console.error("Error registering seller:", error);
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-semibold mb-2">Become a Seller on Kala Connect</h1>
          <p className="text-muted-foreground">
            Join our community of skilled artisans and start selling your handcrafted goods.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-medium">Store Information</h2>
              
              <FormField
                control={form.control}
                name="store_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your store name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About Your Store</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about your store and the items you create" 
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Your contact number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-medium">Address</h2>
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Street address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="pin_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PIN Code</FormLabel>
                    <FormControl>
                      <Input placeholder="PIN code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-medium">Bank Details</h2>
              <p className="text-sm text-muted-foreground">
                This information will be used for payments. We'll verify these details during the approval process.
              </p>
              
              <FormField
                control={form.control}
                name="account_holder_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Holder Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name as on bank account" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bank_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Bank name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="bank_account_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Account number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="ifsc_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>IFSC Code</FormLabel>
                      <FormControl>
                        <Input placeholder="IFSC code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Registering..." : "Register as Seller"}
              </Button>
              <p className="text-sm text-muted-foreground text-center mt-4">
                After submission, you'll need to complete verification by uploading required documents.
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SellerRegistration;
