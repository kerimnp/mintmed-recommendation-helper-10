import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Loader2, Mail, Lock, ChevronLeft, AlertCircle, Stethoscope, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Auth = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("kerim.sabic@gmail.com");
  const [password, setPassword] = useState("Nadin123");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [error, setError] = useState<string | null>(null); // General form error
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const { signIn, signUp } = useAuth(); // Removed signInWithGoogle temporarily to simplify focus

  const validateEmail = (value: string) => {
    if (!value) return language === "en" ? "Email is required" : "Email je obavezan";
    if (!/\S+@\S+\.\S+/.test(value)) return language === "en" ? "Invalid email format" : "Nevažeći format emaila";
    return null;
  };

  const validatePassword = (value: string) => {
    if (!value) return language === "en" ? "Password is required" : "Lozinka je obavezna";
    if (value.length < 8) return language === "en" ? "Password must be at least 8 characters" : "Lozinka mora imati najmanje 8 znakova";
    return null;
  };

  const handleEmailBlur = () => {
    setEmailError(validateEmail(email));
  };

  const handlePasswordBlur = () => {
    setPasswordError(validatePassword(password));
  };

  useEffect(() => {
    setError(null);
    setEmailError(null);
    setPasswordError(null);
    // Keep pre-filled credentials when switching tabs or on initial load for login
    if (activeTab === "login") {
      setEmail("kerim.sabic@gmail.com");
      setPassword("Nadin123");
    } else {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  }, [activeTab, language]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          navigate("/");
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handlePasswordKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.getModifierState) {
      setIsCapsLockOn(event.getModifierState("CapsLock"));
    }
  };
  
  const handlePasswordKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.getModifierState) {
      setIsCapsLockOn(event.getModifierState("CapsLock"));
    }
  };


  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setEmailError(null);
    setPasswordError(null);

    const currentEmailError = validateEmail(email);
    const currentPasswordError = validatePassword(password);

    setEmailError(currentEmailError);
    setPasswordError(currentPasswordError);

    if (currentEmailError || currentPasswordError) {
      return;
    }

    setIsLoading(true);
    try {
      await signIn(email, password);
      // Successful login is handled by the auth state change listener
    } catch (error: any) {
      console.error("Sign in error:", error);
      setError(error.message || (language === "en" 
        ? "Failed to sign in. Please check your credentials." 
        : "Prijava nije uspjela. Molimo provjerite svoje podatke."));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Basic validation for sign up
    if (!email || !password || !confirmPassword) {
      setError(language === "en" ? "All fields are required" : "Sva polja su obavezna");
      return;
    }
    if (password !== confirmPassword) {
      setError(language === "en" ? "Passwords do not match" : "Lozinke se ne podudaraju");
      return;
    }
    if (password.length < 6) { // Keeping original 6 for signup for now, can be unified
      setError(language === "en" ? "Password must be at least 6 characters long" : "Lozinka mora imati najmanje 6 znakova");
      return;
    }

    setIsLoading(true);
    try {
      await signUp(email, password);
      toast({
        title: language === "en" ? "Account created" : "Račun stvoren",
        description: language === "en" 
          ? "Please check your email to confirm your account" 
          : "Molimo provjerite svoj email za potvrdu računa",
      });
    } catch (error: any) {
      console.error("Sign up error:", error);
      setError(error.message || (language === "en" 
        ? "Failed to create account. This email might already be in use." 
        : "Neuspjelo stvaranje računa. Ovaj email možda već postoji."));
    } finally {
      setIsLoading(false);
    }
  };

  // Simplified Google Sign-In for brevity, can be re-added fully later
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const currentOrigin = window.location.origin;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${currentOrigin}/auth` }
      });
      if (error) throw error;
    } catch (error: any) {
      console.error("Google sign in error:", error);
      setError(error.message || "Failed to sign in with Google.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4">
      <div className="absolute top-4 left-4 z-10">
        <Link to="/">
          <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
            <ChevronLeft className="h-4 w-4" />
            <span>{language === "en" ? "Back to Home" : "Natrag na Početnu"}</span>
          </Button>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-[90vw] sm:w-full sm:max-w-[400px]"
      >
        <Card className="bg-white shadow-lg rounded-2xl">
          <CardHeader className="items-center text-center p-6 pt-8">
            <div className="flex items-center text-blue-600 mb-4">
              <Stethoscope size={32} className="mr-2" />
              <span className="text-2xl font-bold">MediScript</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              {language === "en" ? "Sign In to Your Account" : "Prijavite se na svoj račun"}
            </h2>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {error && (
              <Alert variant="destructive" className="mb-4 rounded-lg">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {/* Simplified to focus on Sign-In form as per request, Tabs can be re-evaluated */}
            <form onSubmit={handleEmailSignIn} className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  {language === "en" ? "Email Address" : "Email adresa"}
                </Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={language === "en" ? "doctor@hospital.com" : "doktor@bolnica.com"}
                    className={`w-full pl-10 pr-3 py-3 text-base sm:text-sm rounded-lg border ${emailError ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500`}
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(null); }}
                    onBlur={handleEmailBlur}
                    disabled={isLoading}
                    aria-invalid={!!emailError}
                    aria-describedby="email-error"
                  />
                </div>
                {emailError && <p id="email-error" className="mt-1 text-xs text-red-600" role="alert">{emailError}</p>}
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  {language === "en" ? "Password" : "Lozinka"}
                </Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-10 py-3 text-base sm:text-sm rounded-lg border ${passwordError ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500`}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setPasswordError(null); }}
                    onBlur={handlePasswordBlur}
                    onKeyDown={handlePasswordKeyDown}
                    onKeyUp={handlePasswordKeyUp}
                    disabled={isLoading}
                    aria-invalid={!!passwordError}
                    aria-describedby="password-error password-caps-warning"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    aria-label={showPassword ? (language === "en" ? "Hide password" : "Sakrij lozinku") : (language === "en" ? "Show password" : "Prikaži lozinku")}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {passwordError && <p id="password-error" className="mt-1 text-xs text-red-600" role="alert">{passwordError}</p>}
                {isCapsLockOn && (
                  <p id="password-caps-warning" className="mt-1 text-xs text-yellow-600 flex items-center" role="alert">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    {language === "en" ? "Caps Lock is ON" : "Caps Lock je UKLJUČEN"}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox 
                    id="remember-me" 
                    checked={rememberMe} 
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    disabled={isLoading}
                  />
                  <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    {language === "en" ? "Remember me" : "Zapamti me"}
                  </Label>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg text-sm sm:text-base transition-colors h-auto"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {language === "en" ? "Signing In..." : "Prijava..."}
                  </>
                ) : (
                  language === "en" ? "Sign In" : "Prijava"
                )}
              </Button>
              <div className="text-center">
                <Button 
                  variant="link" 
                  className="text-sm text-gray-600 hover:text-blue-600 p-0 h-auto font-normal"
                  type="button"
                  onClick={() => {/* Implement forgot password logic or navigation */}}
                >
                  {language === "en" ? "Forgot Password?" : "Zaboravili ste lozinku?"}
                </Button>
              </div>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {language === "en" ? "Or continue with" : "Ili nastavite s"}
                </span>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
                <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 py-3 border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm sm:text-base"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      <path d="M1 1h22v22H1z" fill="none"/>
                    </svg>
                    {language === "en" ? "Sign in with Google" : "Prijavi se Google računom"}
                </Button>
                 {/* Placeholder for other sign-in methods if any, like Sign Up link */}
            </div>
          </CardContent>
          <CardFooter className="p-6 pt-4 text-center">
            <p className="text-sm text-gray-600">
              {language === "en" ? "Don't have an account?" : "Nemate račun?"}{" "}
              <Button 
                variant="link" 
                className="font-medium text-blue-600 hover:text-blue-700 p-0 h-auto"
                onClick={() => { 
                  setActiveTab("register");
                  // Consider if this should navigate or change view within this component
                  // For now, it implies a conceptual switch that would typically load a different form or UI state
                  // Since we simplified away from Tabs for the primary view, this needs a clearer target.
                  // For now, this button could trigger a navigation to a dedicated /register route or open a modal.
                  // Or, we can re-introduce minimal tabs if needed. Let's keep it as a conceptual switch.
                  toast({ title: "Switched to Sign Up (Conceptual)", description: "Implement navigation or modal for Sign Up."});
                }}
              >
                {language === "en" ? "Sign Up" : "Registrirajte se"}
              </Button>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;
