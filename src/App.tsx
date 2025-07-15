
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";

import Subscription from "./pages/Subscription";
import HospitalDashboard from "./pages/HospitalDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import AntibioticAdvisor from "./pages/AntibioticAdvisor";
import ProductionVerificationPage from "./pages/ProductionVerification";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Compliance from "./pages/Compliance";
import Contact from "./pages/Contact";
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

// Super Admin Route Component
const SuperAdminRoute = ({ children }: { children: React.ReactNode }) => {
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
  
  return <>{children}</>;
};

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LanguageProvider>
            <AuthProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <ScrollToTop />
                  <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/advisor" element={<ProtectedRoute><AntibioticAdvisor /></ProtectedRoute>} />
                  
                  <Route path="/production-verification" element={<ProductionVerificationPage />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/compliance" element={<Compliance />} />
                  <Route path="/contact" element={<Contact />} />
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
                  <Route 
                    path="/super-admin" 
                    element={
                      <SuperAdminRoute>
                        <SuperAdminDashboard />
                      </SuperAdminRoute>
                    } 
                  />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
