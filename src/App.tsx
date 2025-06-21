
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import AntibioticAdvisor from "./pages/AntibioticAdvisor";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Subscription from "./pages/Subscription";
import AdminDashboard from "./pages/AdminDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";
import HospitalInvitation from "./pages/HospitalInvitation";
import ClinicalDashboard from "./pages/ClinicalDashboard";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/advisor" element={<AntibioticAdvisor />} />
                <Route path="/about" element={<About />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
                <Route path="/hospital-invitation" element={<HospitalInvitation />} />
                <Route path="/clinical" element={<ClinicalDashboard />} />
                <Route path="/auth" element={<Auth />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
