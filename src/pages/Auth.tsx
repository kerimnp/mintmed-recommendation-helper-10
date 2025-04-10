
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Loader2, Mail, Lock, ChevronLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const { signIn, signUp, signInWithGoogle } = useAuth();

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

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: language === "en" ? "Error" : "Greška",
        description: language === "en" ? "Please enter email and password" : "Molimo unesite email i lozinku",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await signIn(email, password);
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: language === "en" ? "Error" : "Greška",
        description: language === "en" ? "Please enter email and password" : "Molimo unesite email i lozinku",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await signUp(email, password);
    } catch (error) {
      console.error("Sign up error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (error) {
      console.error("Google sign in error:", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-medical-bg dark:to-medical-bg-secondary p-4">
      <div className="absolute top-4 left-4">
        <Link to="/">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            <span>{language === "en" ? "Back to Home" : "Natrag na Početnu"}</span>
          </Button>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="ios-card-shadow bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-gray-100 dark:border-gray-800 rounded-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {activeTab === "login" 
                ? (language === "en" ? "Welcome Back" : "Dobrodošli Natrag") 
                : (language === "en" ? "Create Account" : "Stvorite Račun")}
            </CardTitle>
            <CardDescription>
              {activeTab === "login" 
                ? (language === "en" ? "Sign in to your account" : "Prijavite se u svoj račun") 
                : (language === "en" ? "Sign up for a new account" : "Registrirajte se za novi račun")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue="login" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="login">
                  {language === "en" ? "Sign In" : "Prijava"}
                </TabsTrigger>
                <TabsTrigger value="register">
                  {language === "en" ? "Sign Up" : "Registracija"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleEmailSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{language === "en" ? "Email" : "Email"}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder={language === "en" ? "Enter your email" : "Unesite svoj email"}
                        className="pl-10 ios-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">{language === "en" ? "Password" : "Lozinka"}</Label>
                      <Button 
                        variant="link" 
                        className="px-0 h-auto font-normal text-xs text-medical-primary"
                        type="button"
                      >
                        {language === "en" ? "Forgot password?" : "Zaboravili ste lozinku?"}
                      </Button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder={language === "en" ? "••••••••" : "••••••••"}
                        className="pl-10 pr-10 ios-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full ios-button mt-2" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {language === "en" ? "Signing In..." : "Prijava..."}
                      </>
                    ) : (
                      language === "en" ? "Sign In" : "Prijava"
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleEmailSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-email">{language === "en" ? "Email" : "Email"}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder={language === "en" ? "Enter your email" : "Unesite svoj email"}
                        className="pl-10 ios-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">{language === "en" ? "Password" : "Lozinka"}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder={language === "en" ? "••••••••" : "••••••••"}
                        className="pl-10 pr-10 ios-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {language === "en" 
                        ? "Password must be at least 6 characters long"
                        : "Lozinka mora imati najmanje 6 znakova"}
                    </p>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full ios-button mt-2" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {language === "en" ? "Creating Account..." : "Stvaranje Računa..."}
                      </>
                    ) : (
                      language === "en" ? "Create Account" : "Stvori Račun"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                  {language === "en" ? "or continue with" : "ili nastavite s"}
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                className="ios-button-secondary flex items-center justify-center gap-2 w-full"
                onClick={handleGoogleSignIn}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                <span>{language === "en" ? "Sign in with Google" : "Prijavi se s Google računom"}</span>
              </Button>
            </div>
          </CardContent>
          <CardFooter className="text-center text-xs text-gray-500 dark:text-gray-400">
            {language === "en" 
              ? "By continuing, you agree to our Terms of Service and Privacy Policy"
              : "Nastavljanjem, pristajete na naše Uvjete korištenja i Politiku privatnosti"}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;
