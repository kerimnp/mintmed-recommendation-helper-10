
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, LogIn, UserPlus, Mail, Lock, Eye, EyeOff, AlertCircle, Github, Apple } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTheme } from "next-themes";
import { Helmet } from "react-helmet";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";

const Auth = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { user, signIn, signUp, loading, signInWithGoogle, signInWithApple } = useAuth();
  
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  // Check if user is already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validation
    if (!loginForm.email || !loginForm.password) {
      setError(language === "en" 
        ? "Email and password are required" 
        : "Email i lozinka su obavezni");
      return;
    }
    
    try {
      await signIn(loginForm.email, loginForm.password);
    } catch (error) {
      // Error is handled in the signIn function
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validation
    if (!registerForm.name || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
      setError(language === "en" 
        ? "All fields are required" 
        : "Sva polja su obavezna");
      return;
    }
    
    if (registerForm.password !== registerForm.confirmPassword) {
      setError(language === "en" 
        ? "Passwords do not match" 
        : "Lozinke se ne podudaraju");
      return;
    }
    
    if (registerForm.password.length < 8) {
      setError(language === "en" 
        ? "Password must be at least 8 characters long" 
        : "Lozinka mora imati najmanje 8 znakova");
      return;
    }
    
    try {
      await signUp(registerForm.email, registerForm.password, {
        full_name: registerForm.name
      });
    } catch (error) {
      // Error is handled in the signUp function
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      // Error is handled in the signInWithGoogle function
    }
  };

  const handleAppleSignIn = async () => {
    try {
      await signInWithApple();
    } catch (error) {
      // Error is handled in the signInWithApple function
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {activeTab === "login" 
            ? (language === "en" ? "Sign In - Horalix" : "Prijava - Horalix")
            : (language === "en" ? "Sign Up - Horalix" : "Registracija - Horalix")
          }
        </title>
      </Helmet>
      
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-blue-100/50 to-blue-200/50 
        dark:from-medical-bg dark:via-medical-bg-secondary dark:to-medical-bg-tertiary
        flex items-center justify-center p-4">
        
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <LanguageToggle />
        </div>
        
        <Link to="/" className="absolute top-4 left-4 sm:top-8 sm:left-8">
          <Button variant="ghost" className="gap-2 text-gray-600 dark:text-gray-300">
            <ArrowLeft className="h-4 w-4" />
            <span>{language === "en" ? "Back to Home" : "Natrag na Početnu"}</span>
          </Button>
        </Link>
        
        <div className="w-full max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <img 
              src={theme === 'dark' 
                ? "/lovable-uploads/134e4de5-e3af-4097-82b5-25696c1187df.png"
                : "/lovable-uploads/9379e65b-bb1e-43d1-8d21-be1f9263156a.png"
              } 
              alt="Horalix Logo" 
              className="h-12 w-auto"
            />
          </div>
          
          <Tabs 
            defaultValue="login" 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as "login" | "register")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="rounded-l-lg data-[state=active]:bg-medical-primary data-[state=active]:text-white">
                <LogIn className="h-4 w-4 mr-2" />
                {language === "en" ? "Sign In" : "Prijava"}
              </TabsTrigger>
              <TabsTrigger value="register" className="rounded-r-lg data-[state=active]:bg-medical-primary data-[state=active]:text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                {language === "en" ? "Sign Up" : "Registracija"}
              </TabsTrigger>
            </TabsList>
            
            {error && (
              <Alert variant="destructive" className="mb-4 animate-fade-in">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <TabsContent value="login">
              <Card className="border-gray-200 dark:border-gray-700 shadow-lg">
                <CardHeader>
                  <CardTitle>{language === "en" ? "Welcome Back" : "Dobrodošli Natrag"}</CardTitle>
                  <CardDescription>
                    {language === "en" 
                      ? "Enter your credentials to access your account" 
                      : "Unesite svoje podatke za pristup vašem računu"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email" className="text-gray-700 dark:text-gray-300">
                          {language === "en" ? "Email" : "Email"}
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input
                            id="login-email"
                            name="email"
                            type="email"
                            placeholder={language === "en" ? "Enter your email" : "Unesite svoj email"}
                            value={loginForm.email}
                            onChange={handleLoginChange}
                            className="pl-10"
                            autoComplete="email"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="login-password" className="text-gray-700 dark:text-gray-300">
                          {language === "en" ? "Password" : "Lozinka"}
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input
                            id="login-password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder={language === "en" ? "Enter your password" : "Unesite svoju lozinku"}
                            value={loginForm.password}
                            onChange={handleLoginChange}
                            className="pl-10 pr-10"
                            autoComplete="current-password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-gray-400"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full mt-6" disabled={loading}>
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                            {language === "en" ? "Signing in..." : "Prijava..."}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <LogIn className="h-4 w-4" />
                            {language === "en" ? "Sign In" : "Prijava"}
                          </span>
                        )}
                      </Button>
                    </form>
                    
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-background px-2 text-xs text-muted-foreground">
                          {language === "en" ? "OR CONTINUE WITH" : "ILI NASTAVITE S"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      <Button 
                        variant="outline" 
                        type="button" 
                        className="w-full gap-2"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                          <path d="M1 1h22v22H1z" fill="none"/>
                        </svg>
                        {language === "en" ? "Google" : "Google"}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        type="button" 
                        className="w-full gap-2"
                        onClick={handleAppleSignIn}
                        disabled={loading}
                      >
                        <Apple className="h-5 w-5" />
                        {language === "en" ? "Apple" : "Apple"}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        type="button" 
                        className="w-full gap-2"
                        disabled={loading}
                      >
                        <Github className="h-5 w-5" />
                        {language === "en" ? "GitHub" : "GitHub"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-gray-100 dark:border-gray-800 pt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {language === "en" ? "Don't have an account?" : "Nemate račun?"}{" "}
                    <button
                      type="button"
                      onClick={() => setActiveTab("register")}
                      className="text-medical-primary font-medium hover:underline"
                    >
                      {language === "en" ? "Sign Up" : "Registrirajte se"}
                    </button>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card className="border-gray-200 dark:border-gray-700 shadow-lg">
                <CardHeader>
                  <CardTitle>{language === "en" ? "Create an Account" : "Kreirajte Račun"}</CardTitle>
                  <CardDescription>
                    {language === "en" 
                      ? "Enter your details to create a new account" 
                      : "Unesite svoje podatke za kreiranje novog računa"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-name" className="text-gray-700 dark:text-gray-300">
                          {language === "en" ? "Full Name" : "Puno Ime"}
                        </Label>
                        <Input
                          id="register-name"
                          name="name"
                          placeholder={language === "en" ? "Enter your full name" : "Unesite svoje puno ime"}
                          value={registerForm.name}
                          onChange={handleRegisterChange}
                          autoComplete="name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="register-email" className="text-gray-700 dark:text-gray-300">
                          {language === "en" ? "Email" : "Email"}
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input
                            id="register-email"
                            name="email"
                            type="email"
                            placeholder={language === "en" ? "Enter your email" : "Unesite svoj email"}
                            value={registerForm.email}
                            onChange={handleRegisterChange}
                            className="pl-10"
                            autoComplete="email"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="register-password" className="text-gray-700 dark:text-gray-300">
                          {language === "en" ? "Password" : "Lozinka"}
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input
                            id="register-password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder={language === "en" ? "Create a password" : "Kreirajte lozinku"}
                            value={registerForm.password}
                            onChange={handleRegisterChange}
                            className="pl-10 pr-10"
                            autoComplete="new-password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-gray-400"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="register-confirm-password" className="text-gray-700 dark:text-gray-300">
                          {language === "en" ? "Confirm Password" : "Potvrdite Lozinku"}
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input
                            id="register-confirm-password"
                            name="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder={language === "en" ? "Confirm your password" : "Potvrdite svoju lozinku"}
                            value={registerForm.confirmPassword}
                            onChange={handleRegisterChange}
                            className="pl-10"
                            autoComplete="new-password"
                          />
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full mt-6" disabled={loading}>
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                            {language === "en" ? "Creating account..." : "Kreiranje računa..."}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <UserPlus className="h-4 w-4" />
                            {language === "en" ? "Sign Up" : "Registracija"}
                          </span>
                        )}
                      </Button>
                    </form>
                    
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-background px-2 text-xs text-muted-foreground">
                          {language === "en" ? "OR CONTINUE WITH" : "ILI NASTAVITE S"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      <Button 
                        variant="outline" 
                        type="button" 
                        className="w-full gap-2"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                          <path d="M1 1h22v22H1z" fill="none"/>
                        </svg>
                        {language === "en" ? "Google" : "Google"}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        type="button" 
                        className="w-full gap-2"
                        onClick={handleAppleSignIn}
                        disabled={loading}
                      >
                        <Apple className="h-5 w-5" />
                        {language === "en" ? "Apple" : "Apple"}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        type="button" 
                        className="w-full gap-2"
                        disabled={loading}
                      >
                        <Github className="h-5 w-5" />
                        {language === "en" ? "GitHub" : "GitHub"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-gray-100 dark:border-gray-800 pt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {language === "en" ? "Already have an account?" : "Već imate račun?"}{" "}
                    <button
                      type="button"
                      onClick={() => setActiveTab("login")}
                      className="text-medical-primary font-medium hover:underline"
                    >
                      {language === "en" ? "Sign In" : "Prijavite se"}
                    </button>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Auth;
