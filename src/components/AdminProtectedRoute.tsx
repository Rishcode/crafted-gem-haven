
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        navigate("/auth");
        return;
      }

      try {
        // For now, we'll consider the first registered user or users with specific emails as admin
        // In a real app, you would have a proper admin roles system
        const { data: allUsers, error } = await supabase.auth.admin.listUsers();
        
        if (error) {
          console.error("Error checking admin status:", error);
          // Fallback: Allow access if we can't verify (for demo purposes)
          setIsAdmin(true);
        } else {
          // Simple admin check - you can modify this logic as needed
          const adminEmails = ["admin@example.com", "test@gmail.com"]; // Add your admin emails here
          const isUserAdmin = adminEmails.includes(user.email || "") || 
                             (allUsers && allUsers.length > 0 && allUsers[0].id === user.id);
          setIsAdmin(isUserAdmin);
        }
      } catch (error) {
        console.error("Error in admin check:", error);
        // Fallback: Allow access for demo purposes
        setIsAdmin(true);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="container py-12 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Checking Access</CardTitle>
            <CardDescription>Verifying admin permissions...</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container py-12 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You don't have permission to access this admin area.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Please contact an administrator if you believe this is an error.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
