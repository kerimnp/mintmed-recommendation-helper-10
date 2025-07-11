
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import Pricing from "./pages/Pricing";
import Subscription from "./pages/Subscription";
import HospitalDashboard from "./pages/HospitalDashboard";
import AntibioticAdvisor from "./pages/AntibioticAdvisor";
import { Loader2 } from "lucide-react";

const queryClient = new QueryClient();

// Protected Route Component for Individual Doctors
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Redirect hospital admins to their dashboard when accessing individual doctor routes
  if (user.user_metadata?.account_type === 'hospital_admin') {
    return <Navigate to="/hospital-dashboard" replace />;
  }
  
  return <>{children}</>;
};

// Hospital Admin Route Component
const HospitalAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  if (user.user_metadata?.account_type !== 'hospital_admin') {
    return <Navigate to="/admin" replace />;
  }
  
  return <>{children}</>;
};

// Admin Dashboard Route Component (for individual doctors and authorized users)
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  // Redirect hospital admins to their specific dashboard
  if (user.user_metadata?.account_type === 'hospital_admin') {
    return <Navigate to="/hospital-dashboard" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <LanguageProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/advisor" element={<AntibioticAdvisor />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route 
                    path="/admin" 
                    element={
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/subscription" 
                    element={
                      <ProtectedRoute>
                        <Subscription />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/hospital-dashboard" 
                    element={
                      <HospitalAdminRoute>
                        <HospitalDashboard />
                      </HospitalAdminRoute>
                    } 
                  />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
