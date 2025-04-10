
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "@/pages/Index";
import AdminDashboard from "@/pages/AdminDashboard";
import Auth from "@/pages/Auth";
import { AuthProvider } from "@/contexts/AuthContext";
import "./App.css";

const queryClient = new QueryClient();

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
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/auth" element={<Auth />} />
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
