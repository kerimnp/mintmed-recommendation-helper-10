
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: { [key: string]: any }) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { language } = useLanguage();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed:', event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (event === 'SIGNED_IN' && currentSession) {
          console.log('User signed in:', currentSession.user);
          toast({
            title: language === 'en' ? 'Signed in successfully!' : 'Uspješna prijava!',
            description: language === 'en' 
              ? 'Welcome back to the application.'
              : 'Dobrodošli natrag u aplikaciju.',
          });
          
          // Only navigate if on auth page to avoid unnecessary redirects
          if (window.location.pathname === '/auth') {
            navigate('/');
          }
        }
        
        if (event === 'SIGNED_OUT') {
          console.log('User signed out');
          toast({
            title: language === 'en' ? 'Signed out' : 'Odjavljeni ste',
            description: language === 'en' 
              ? 'You have been signed out of the application.'
              : 'Odjavljeni ste iz aplikacije.',
          });
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast, language]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        throw error;
      }
      
      // Don't need to handle success here as the onAuthStateChange listener will do that
    } catch (error: any) {
      toast({
        title: language === 'en' ? 'Error signing in' : 'Greška pri prijavi',
        description: error.message || (language === 'en' 
          ? 'There was an error signing in. Please try again.'
          : 'Došlo je do pogreške prilikom prijave. Molimo pokušajte ponovno.'),
        variant: 'destructive',
      });
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, metadata?: { [key: string]: any }) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: metadata,
          emailRedirectTo: `${window.location.origin}/auth`,
        }
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: language === 'en' ? 'Verification email sent' : 'Verifikacijski email poslan',
        description: language === 'en'
          ? 'Please check your email for a verification link.'
          : 'Molimo provjerite svoj email za verifikacijski link.',
      });
    } catch (error: any) {
      toast({
        title: language === 'en' ? 'Error signing up' : 'Greška pri registraciji',
        description: error.message || (language === 'en'
          ? 'There was an error creating your account. Please try again.'
          : 'Došlo je do pogreške pri stvaranju vašeg računa. Molimo pokušajte ponovno.'),
        variant: 'destructive',
      });
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      // Handled by onAuthStateChange listener
    } catch (error: any) {
      toast({
        title: language === 'en' ? 'Error signing out' : 'Greška pri odjavi',
        description: error.message || (language === 'en'
          ? 'There was an error signing out. Please try again.'
          : 'Došlo je do pogreške prilikom odjave. Molimo pokušajte ponovno.'),
        variant: 'destructive',
      });
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth`,
        }
      });
      
      if (error) throw error;
      
    } catch (error: any) {
      toast({
        title: language === 'en' ? 'Google sign-in failed' : 'Google prijava nije uspjela',
        description: error.message || (language === 'en'
          ? 'There was an error signing in with Google.'
          : 'Došlo je do pogreške prilikom prijave putem Googlea.'),
        variant: 'destructive',
      });
      console.error('Google sign in error:', error);
      setLoading(false);
    }
  };

  const signInWithApple = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}/auth`,
        }
      });
      
      if (error) throw error;
      
    } catch (error: any) {
      toast({
        title: language === 'en' ? 'Apple sign-in failed' : 'Apple prijava nije uspjela',
        description: error.message || (language === 'en'
          ? 'There was an error signing in with Apple.'
          : 'Došlo je do pogreške prilikom prijave putem Applea.'),
        variant: 'destructive',
      });
      console.error('Apple sign in error:', error);
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    signIn,
    signUp,
    signOut,
    loading,
    signInWithGoogle,
    signInWithApple,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
