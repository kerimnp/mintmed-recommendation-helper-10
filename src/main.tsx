
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from '@/contexts/AuthContext.tsx';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router> {/* Add Router here */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
