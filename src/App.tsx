import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toast as SonnerToaster } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DoctorProfileDashboard from "./pages/DoctorProfileDashboard"; // Added import

function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
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
