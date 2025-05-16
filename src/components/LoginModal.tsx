
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Loader2, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert"; // Ensure this path is correct
import { supabase } from '@/integrations/supabase/client'; // For Google Sign-In

interface LoginModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onOpenChange }) => {
  const { language } = useLanguage();
  const { signIn, signInWithGoogle } = useAuth(); // Added signInWithGoogle from context
  const [email, setEmail] = useState('kerim.sabic@gmail.com');
  const [password, setPassword] = useState('Nadin123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await signIn(email, password);
      onOpenChange(false); // Close modal on successful sign-in
    } catch (err: any) {
      setError(err.message || (language === 'en' ? 'Failed to sign in. Please check your credentials.' : 'Prijava nije uspjela. Molimo provjerite svoje podatke.'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await signInWithGoogle();
      // onOpenChange(false); // Assuming onAuthStateChange will handle navigation/closing
    } catch (err: any) {
      setError(err.message || (language === 'en' ? 'Google sign-in failed.' : 'Google prijava nije uspjela.'));
    } finally {
      setIsLoading(false); // Might need to keep modal open until redirect
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{language === 'en' ? 'Sign In' : 'Prijava'}</DialogTitle>
          <DialogDescription>
            {language === 'en' ? 'Access your MediScript account.' : 'Pristupite svom MediScript računu.'}
          </DialogDescription>
        </DialogHeader>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSignIn} className="space-y-4 py-4">
          <div>
            <Label htmlFor="modal-email">{language === 'en' ? 'Email Address' : 'Email adresa'}</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="modal-email"
                type="email"
                placeholder="doctor@hospital.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="modal-password">{language === 'en' ? 'Password' : 'Lozinka'}</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="modal-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="pl-10 pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4 gap-2">
             <Button type="button" variant="outline" onClick={handleGoogleSignIn} disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? <Loader2 className="animate-spin" /> : (
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/>
                </svg>
              )}
              {language === 'en' ? 'Sign in with Google' : 'Prijavi se Google računom'}
            </Button>
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {language === 'en' ? 'Sign In' : 'Prijava'}
            </Button>
          </DialogFooter>
        </form>
        <div className="text-center text-sm mt-4">
          {/* Placeholder for Sign Up link - This could open another modal or redirect */}
          <p>
            {language === 'en' ? "Don't have an account? " : "Nemate račun? "}
            <Button variant="link" className="p-0 h-auto" onClick={() => alert('Sign up functionality to be implemented here. This could open a sign-up modal or navigate to a registration page.')}>
              {language === 'en' ? "Sign Up" : "Registrirajte se"}
            </Button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
