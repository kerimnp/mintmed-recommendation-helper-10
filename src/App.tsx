
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Index"; // Changed from ./pages/Home
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner"; // Changed from Toast to Toaster
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DoctorProfileDashboard from "./pages/DoctorProfileDashboard";

function App() {
  const { loading } = useAuth(); // Changed from isLoading to loading

  if (loading) { // Changed from isLoading to loading
    return <div>Loading...</div>;
  }

  return (
    <LanguageProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Toaster />
          <SonnerToaster position="bottom-right" />
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/doctor-dashboard" element={
                <ProtectedRoute>
                  <DoctorProfileDashboard />
                </ProtectedRoute>
              }/>
              <Route path="/admin" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }/>
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;

