
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "@/pages/Index";
import AntibioticAdvisor from "@/pages/AntibioticAdvisor";
import AdminDashboard from "@/pages/AdminDashboard";
import Auth from "@/pages/Auth";
import About from "@/pages/About";
import DoctorProfileDashboard from "@/pages/DoctorProfileDashboard"; // Ensure this import exists
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
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/advisor" element={<AntibioticAdvisor />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/about" element={<About />} />
              <Route path="/doctor-dashboard" element={<DoctorProfileDashboard />} />
              <Route path="*" element={<Index />} />
            </Routes>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
