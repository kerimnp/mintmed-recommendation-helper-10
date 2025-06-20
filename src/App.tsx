
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "@/pages/Index";
import AntibioticAdvisor from "@/pages/AntibioticAdvisor";
import AdminDashboard from "@/pages/AdminDashboard";
import ClinicalDashboard from "@/pages/ClinicalDashboard";
import Auth from "@/pages/Auth";
import About from "@/pages/About";
import Profile from "@/pages/Profile";
import Pricing from "@/pages/Pricing";
import Subscription from "@/pages/Subscription";
import { AuthProvider } from "@/contexts/AuthContext";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

function App() {
  return (
    <div className="w-full h-full overflow-auto">
      <BrowserRouter>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <AuthProvider>
              <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/advisor" element={<AntibioticAdvisor />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/clinical" element={<ClinicalDashboard />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/subscription" element={<Subscription />} />
                    <Route path="*" element={<Index />} />
                  </Routes>
                  <Toaster />
                  <Sonner />
                </TooltipProvider>
              </QueryClientProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
