
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
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

const customOrderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  budget: z.string().optional(),
  deadline: z.string().optional(),
});

type CustomOrderFormValues = z.infer<typeof customOrderSchema>;

interface CustomOrderFormProps {
  sellerId: string;
  sellerName: string;
}

const CustomOrderForm = ({ sellerId, sellerName }: CustomOrderFormProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CustomOrderFormValues>({
    resolver: zodResolver(customOrderSchema),
    defaultValues: {
      name: user?.user_metadata?.full_name || "",
      email: user?.email || "",
      phone: "",
      description: "",
      budget: "",
      deadline: "",
    },
  });

  const onSubmit = async (values: CustomOrderFormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to request a custom order",
        variant: "destructive",
      });
      
      navigate("/auth", { state: { returnTo: window.location.pathname } });
      return;
    }

    setIsSubmitting(true);

    try {
      // This is a mock submission - in a real app, you would send this to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Custom order request submitted!",
        description: `Your request has been sent to ${sellerName}. They will contact you soon.`,
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error submitting request",
        description: "There was a problem submitting your custom order request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description of Custom Item</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe what you're looking for in detail (materials, size, style, etc.)" 
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget Range (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., ₹1,000 - ₹2,000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deadline (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="When do you need this by?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Request Custom Order"}
        </Button>
      </form>
    </Form>
  );
};

export default CustomOrderForm;
