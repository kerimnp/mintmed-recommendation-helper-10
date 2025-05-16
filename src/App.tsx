
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes"; // This might be in main.tsx now
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // This might be in main.tsx now
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip"; // This might be in main.tsx now

import Index from "@/pages/Index";
import AntibioticAdvisor from "@/pages/AntibioticAdvisor";
import AdminDashboard from "@/pages/AdminDashboard";
import AuthPage from "@/pages/Auth"; // Renamed to AuthPage to avoid conflict if Auth context is used directly
import About from "@/pages/About";
import DoctorProfileDashboard from "@/pages/DoctorProfileDashboard";
import Navbar from "@/components/Navbar"; // Import the Navbar

import "./App.css";

// QueryClient might be initialized in main.tsx if QueryClientProvider is there
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
    // Assuming ThemeProvider, AuthProvider, LanguageProvider, QueryClientProvider, BrowserRouter, TooltipProvider
    // are now in main.tsx wrapping <App />.
    // If not, they need to be here. For now, let's assume they are in main.tsx based on previous errors.
    // The outer div and ThemeProvider might be redundant if handled in main.tsx.
    // Let's structure this for clarity assuming providers are externalized.
    <>
      <Navbar />
      <main className="flex-grow"> {/* Add flex-grow if Navbar is part of a flex column layout */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/advisor" element={<AntibioticAdvisor />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/auth" element={<AuthPage />} /> {/* Login modal is new primary, this page might be for deep links/fallback */}
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
