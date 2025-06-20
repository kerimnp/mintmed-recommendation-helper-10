
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
  signUp: (email: string, password: string, metadata: { first_name?: string, last_name?: string, [key: string]: any }) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
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
        console.log('Auth state changed:', event, currentSession);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (event === 'INITIAL_SESSION' && currentSession) {
          console.log('Initial session established:', currentSession.user);
        }
        
        if (event === 'SIGNED_IN' && currentSession) {
          console.log('User signed in:', currentSession.user);
          toast({
            title: language === 'en' ? 'Signed in successfully!' : 'Uspješna prijava!',
            description: language === 'en' 
              ? 'Welcome to Antibiotic Advisor.'
              : 'Dobrodošli u Antibiotic Advisor.',
          });
          
          // Redirect based on user account type
          const accountType = currentSession.user.user_metadata?.account_type;
          console.log('Account type:', accountType);
          
          if (accountType === 'hospital_admin') {
            // Redirect hospital admins to subscription page to choose a plan
            navigate('/subscription');
          } else if (window.location.pathname === '/auth') {
            // Redirect individual users to home page
            navigate('/');
          }
        }
        
        if (event === 'SIGNED_OUT') {
          console.log('User signed out');
          setUser(null);
          setSession(null);
          toast({
            title: language === 'en' ? 'Signed out' : 'Odjavljeni ste',
            description: language === 'en' 
              ? 'You have been signed out successfully.'
              : 'Uspješno ste odjavljeni.',
          });
          navigate('/auth'); // Navigate to auth page on sign out
        }
        
        if (event === 'PASSWORD_RECOVERY') {
          console.log('Password recovery event');
          // Handle password recovery flow, e.g., redirect to a password reset page
        }

        if (event === 'USER_UPDATED') {
            console.log('User details updated:', currentSession?.user);
            setUser(currentSession?.user ?? null);
        }

        if (event === 'TOKEN_REFRESHED') {
          console.log('Token refreshed:', currentSession);
          setSession(currentSession); // Ensure session is updated with new token
        }

      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log('getSession response:', currentSession);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    }).catch(error => {
      console.error('Error getting session:', error);
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
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, metadata: { first_name?: string, last_name?: string, [key: string]: any }) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: metadata, // Pass metadata here
          emailRedirectTo: `${window.location.origin}/`, // Redirect to home after email confirm
        }
      });
      
      if (error) {
        console.error('Sign up Supabase error:', error);
        throw error;
      }

      if (data.user && data.user.identities && data.user.identities.length === 0) {
        // This case can happen if "Confirm email" is turned on in Supabase settings
        // and the email is already in use but not confirmed.
        // Supabase might return a user object but it's not a "real" new user.
        toast({
            title: language === 'en' ? 'Email already registered' : 'Email je već registriran',
            description: language === 'en'
              ? 'This email address is already in use. If you haven\'t confirmed your email, please check your inbox. Otherwise, try signing in.'
              : 'Ova email adresa je već u upotrebi. Ako niste potvrdili svoj email, molimo provjerite svoj inbox. U suprotnom, pokušajte se prijaviti.',
            variant: 'default',
        });
        // No explicit error throw here, as it's not a system failure but a user input issue.
        // The user is informed via toast.
        return; // Exit early
      }
      
      toast({
        title: language === 'en' ? 'Account created successfully' : 'Račun uspješno kreiran',
        description: language === 'en'
          ? 'Please check your email for verification instructions.'
          : 'Molimo provjerite svoj email za upute o verifikaciji.',
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
      throw error; // Re-throw to be caught by form handler if necessary
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        throw error;
      }
      // State updates (setUser(null), setSession(null)) and navigation are handled by onAuthStateChange
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
      // Fix: Use the current window location for the redirect URL
      const currentUrl = window.location.origin;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${currentUrl}/` // Redirect to home after Google sign in
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
      throw error;
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
