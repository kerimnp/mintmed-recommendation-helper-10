
import React from "react";
import { Routes, Route } from "react-router-dom";
// ThemeProvider, QueryClient, QueryClientProvider, TooltipProvider are now in main.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import Index from "@/pages/Index";
import AntibioticAdvisor from "@/pages/AntibioticAdvisor";
import AdminDashboard from "@/pages/AdminDashboard";
import AuthPage from "@/pages/Auth"; // Renamed to AuthPage
import About from "@/pages/About";
import DoctorProfileDashboard from "@/pages/DoctorProfileDashboard";
import Navbar from "@/components/Navbar"; 

import "./App.css";

// queryClient is now initialized in main.tsx

function App() {
  return (
    // Providers are now in main.tsx.
    // The outer div and ThemeProvider were removed as they are handled in main.tsx.
    <>
      <Navbar />
      <main className="flex-grow pt-16"> {/* Added pt-16 to account for fixed Navbar height */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/advisor" element={<AntibioticAdvisor />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/doctor-dashboard" element={<DoctorProfileDashboard />} />
          <Route path="*" element={<Index />} /> {/* Fallback route */}
        </Routes>
      </main>
      <Toaster />
      <Sonner />
    </>
  );
}

export default App;
