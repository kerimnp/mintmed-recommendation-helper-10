import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Loader2, Mail, Lock, ChevronLeft, AlertCircle, User as UserIcon, Building2, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

const Auth = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user: authUser, signIn, signUp, signInWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [accountType, setAccountType] = useState<"individual" | "hospital_admin">("individual");
  const [hospitalName, setHospitalName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [error, setError] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  useEffect(() => {
    setError(null);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setAccountType("individual");
    setHospitalName("");
    setShowForgotPassword(false);
    setForgotPasswordEmail("");
  }, [activeTab]);

  useEffect(() => {
    if (authUser) {
      // Check if user is hospital admin and redirect accordingly
      const isHospitalAdmin = authUser.user_metadata?.account_type === 'hospital_admin';
      if (isHospitalAdmin) {
        navigate("/hospital-dashboard");
      } else {
        navigate("/advisor");
      }
    }
  }, [authUser, navigate]);

  const clearSignUpForms = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setAccountType("individual");
    setHospitalName("");
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !password) {
      setError(language === "en" ? "Please enter email and password" : "Molimo unesite email i lozinku");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) {
        throw error;
      }
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
    
    if (!email || !password || !firstName || !lastName) {
      setError(language === "en" ? "Please fill in all fields" : "Molimo popunite sva polja");
      return;
    }

    if (accountType === "hospital_admin" && !hospitalName.trim()) {
      setError(language === "en" ? "Please enter hospital/clinic name" : "Molimo unesite naziv bolnice/klinike");
      return;
    }

    if (password !== confirmPassword) {
      setError(language === "en" ? "Passwords do not match" : "Lozinke se ne podudaraju");
      return;
    }

    if (password.length < 6) {
      setError(language === "en" ? "Password must be at least 6 characters long" : "Lozinka mora imati najmanje 6 znakova");
      return;
    }

    setIsLoading(true);
    try {
      const metadata = { 
        first_name: firstName, 
        last_name: lastName,
        account_type: accountType,
        ...(accountType === "hospital_admin" && { hospital_name: hospitalName })
      };
      
      const { error } = await signUp(email, password, metadata);
      if (error) {
        throw error;
      }
      
      // Show success notification
      toast({
        title: language === "en" ? "Account created successfully!" : "Račun je uspješno stvoren!",
        description: language === "en" 
          ? "Please check your email to verify your account."
          : "Molimo provjerite svoj email da biste potvrdili račun.",
      });

      // Clear forms and switch to sign-in tab
      clearSignUpForms();
      setActiveTab("login");
      
    } catch (error: any) {
      console.error("Sign up error:", error);
      setError(error.message || (language === "en" 
        ? "Failed to create account. This email might already be in use or another error occurred." 
        : "Neuspjelo stvaranje računa. Ovaj email možda već postoji ili je došlo do druge greške."));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!forgotPasswordEmail) {
      setError(language === "en" ? "Please enter your email address" : "Molimo unesite vašu email adresu");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(forgotPasswordEmail, {
        redirectTo: `${window.location.origin}/auth?reset=true`,
      });

      if (error) {
        throw error;
      }

      toast({
        title: language === "en" ? "Password reset email sent" : "Email za resetiranje lozinke je poslat",
        description: language === "en" 
          ? "Please check your email for password reset instructions."
          : "Molimo provjerite svoj email za upute o resetiranju lozinke.",
      });

      setShowForgotPassword(false);
      setForgotPasswordEmail("");
    } catch (error: any) {
      console.error("Password reset error:", error);
      setError(error.message || (language === "en" 
        ? "Failed to send password reset email. Please try again." 
        : "Neuspjelo slanje email-a za resetiranje lozinke. Molimo pokušajte ponovno."));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsLoading(true);
    
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error("Google sign in error:", error);
      setError(error.message || (language === "en" 
        ? "Failed to sign in with Google. Please try again." 
        : "Prijava putem Google-a nije uspjela. Molimo pokušajte ponovno."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-medical-bg dark:to-medical-bg-secondary p-4">
      <div className="absolute top-4 left-4 z-10">
        <Link to="/">
          <Button variant="ghost" size="sm" className="flex items-center gap-2 rounded-full">
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
        <Card className="ios-card-shadow bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-medical-primary">
              {showForgotPassword 
                ? (language === "en" ? "Reset Password" : "Resetiranje Lozinke")
                : activeTab === "login" 
                  ? (language === "en" ? "Welcome Back" : "Dobrodošli Natrag") 
                  : (language === "en" ? "Create Account" :  "Stvorite Račun")}
            </CardTitle>
            <CardDescription>
              {showForgotPassword 
                ? (language === "en" ? "Enter your email to reset your password" : "Unesite svoj email za resetiranje lozinke")
                : activeTab === "login" 
                  ? (language === "en" ? "Sign in to your account" : "Prijavite se u svoj račun") 
                  : (language === "en" ? "Sign up for a new account" : "Registrirajte se za novi račun")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4 rounded-xl">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {showForgotPassword ? (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email" className="text-sm font-medium">
                    {language === "en" ? "Email" : "Email"}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder={language === "en" ? "Enter your email" : "Unesite svoj email"}
                      className="pl-10 py-6 rounded-xl border-gray-200 dark:border-gray-700"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-medical-primary hover:bg-medical-primary-hover mt-4 py-6 rounded-xl h-12 text-sm font-medium transition-all" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {language === "en" ? "Sending..." : "Slanje..."}
                    </>
                  ) : (
                    language === "en" ? "Send Reset Email" : "Pošaljite Email za Resetiranje"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => setShowForgotPassword(false)}
                >
                  <ArrowLeft className="h-4 w-4" />
                  {language === "en" ? "Back to Sign In" : "Natrag na Prijavu"}
                </Button>
              </form>
            ) : (
              <Tabs 
                defaultValue="login" 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 mb-6 w-full rounded-full p-1 bg-gray-100 dark:bg-gray-800">
                  <TabsTrigger value="login" className="text-sm font-medium rounded-full px-0 py-2.5">
                    {language === "en" ? "Sign In" : "Prijava"}
                  </TabsTrigger>
                  <TabsTrigger value="register" className="text-sm font-medium rounded-full px-0 py-2.5">
                    {language === "en" ? "Sign Up" : "Registracija"}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleEmailSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">{language === "en" ? "Email" : "Email"}</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder={language === "en" ? "Enter your email" : "Unesite svoj email"}
                          className="pl-10 py-6 rounded-xl border-gray-200 dark:border-gray-700"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-sm font-medium">{language === "en" ? "Password" : "Lozinka"}</Label>
                        <Button 
                          variant="link" 
                          className="px-0 h-auto font-normal text-xs text-medical-primary"
                          type="button"
                          onClick={() => setShowForgotPassword(true)}
                        >
                          {language === "en" ? "Forgot password?" : "Zaboravili ste lozinku?"}
                        </Button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder={language === "en" ? "••••••••" : "••••••••"}
                          className="pl-10 pr-10 py-6 rounded-xl border-gray-200 dark:border-gray-700"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
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
                      className="w-full bg-medical-primary hover:bg-medical-primary-hover mt-4 py-6 rounded-xl h-12 text-sm font-medium transition-all" 
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

                    <div className="relative my-6">
                      <Separator />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-white dark:bg-gray-900 px-3 text-xs text-gray-500 dark:text-gray-400">
                          {language === "en" ? "OR" : "ILI"}
                        </span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full py-6 rounded-xl h-12 text-sm font-medium border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={handleGoogleSignIn}
                      disabled={isLoading}
                    >
                      <svg
                        className="mr-2 h-4 w-4"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      {language === "en" ? "Continue with Google" : "Nastavi sa Google"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleEmailSignUp} className="space-y-4">
                    {/* Account Type Selection */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">
                        {language === "en" ? "Account Type" : "Tip Računa"}
                      </Label>
                      <div className="grid grid-cols-2 gap-3">
                        <div 
                          className={`border rounded-xl p-3 cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-800 ${
                            accountType === "individual" 
                              ? "border-medical-primary bg-medical-primary/5 dark:bg-medical-primary/10" 
                              : "border-gray-200 dark:border-gray-700"
                          }`}
                          onClick={() => setAccountType("individual")}
                        >
                          <div className="flex flex-col items-center gap-2 text-center">
                            <div className={`p-2 rounded-lg ${
                              accountType === "individual" 
                                ? "bg-medical-primary text-white" 
                                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                            }`}>
                              <UserIcon className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="font-medium text-xs">
                                {language === "en" ? "Individual Doctor" : "Individualni Liječnik"}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {language === "en" ? "Personal practice" : "Osobna praksa"}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div 
                          className={`border rounded-xl p-3 cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-800 ${
                            accountType === "hospital_admin" 
                              ? "border-medical-primary bg-medical-primary/5 dark:bg-medical-primary/10" 
                              : "border-gray-200 dark:border-gray-700"
                          }`}
                          onClick={() => setAccountType("hospital_admin")}
                        >
                          <div className="flex flex-col items-center gap-2 text-center">
                            <div className={`p-2 rounded-lg ${
                              accountType === "hospital_admin" 
                                ? "bg-medical-primary text-white" 
                                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                            }`}>
                              <Building2 className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="font-medium text-xs">
                                {language === "en" ? "Hospital Admin" : "Bolnički Admin"}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {language === "en" ? "Manage hospital" : "Upravljanje bolnicom"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hospital Name Field - only show for hospital admin */}
                    {accountType === "hospital_admin" && (
                      <div className="space-y-2">
                        <Label htmlFor="hospital-name" className="text-sm font-medium">
                          {language === "en" ? "Hospital/Clinic Name" : "Naziv Bolnice/Klinike"}
                        </Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            id="hospital-name"
                            type="text"
                            placeholder={language === "en" ? "Enter hospital or clinic name" : "Unesite naziv bolnice ili klinike"}
                            className="pl-10 py-6 rounded-xl border-gray-200 dark:border-gray-700"
                            value={hospitalName}
                            onChange={(e) => setHospitalName(e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    )}

                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name" className="text-sm font-medium">{language === "en" ? "First Name" : "Ime"}</Label>
                        <div className="relative">
                          <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            id="first-name"
                            type="text"
                            placeholder={language === "en" ? "Enter your first name" : "Unesite svoje ime"}
                            className="pl-10 py-6 rounded-xl border-gray-200 dark:border-gray-700"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name" className="text-sm font-medium">{language === "en" ? "Last Name" : "Prezime"}</Label>
                        <div className="relative">
                          <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            id="last-name"
                            type="text"
                            placeholder={language === "en" ? "Enter your last name" : "Unesite svoje prezime"}
                            className="pl-10 py-6 rounded-xl border-gray-200 dark:border-gray-700"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email and Password Fields */}
                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="text-sm font-medium">{language === "en" ? "Email" : "Email"}</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder={language === "en" ? "Enter your email" : "Unesite svoj email"}
                          className="pl-10 py-6 rounded-xl border-gray-200 dark:border-gray-700"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password" className="text-sm font-medium">{language === "en" ? "Password" : "Lozinka"}</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          placeholder={language === "en" ? "••••••••" : "••••••••"}
                          className="pl-10 pr-10 py-6 rounded-xl border-gray-200 dark:border-gray-700"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
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
                      <Label htmlFor="confirm-password" className="text-sm font-medium">
                        {language === "en" ? "Confirm Password" : "Potvrdite Lozinku"}
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="confirm-password"
                          type={showPassword ? "text" : "password"}
                          placeholder={language === "en" ? "••••••••" : "••••••••"}
                          className="pl-10 pr-10 py-6 rounded-xl border-gray-200 dark:border-gray-700"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {language === "en" 
                          ? "Password must be at least 6 characters long"
                          : "Lozinka mora imati najmanje 6 znakova"}
                      </p>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-medical-primary hover:bg-medical-primary-hover mt-4 py-6 rounded-xl h-12 text-sm font-medium transition-all" 
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

                    <div className="relative my-6">
                      <Separator />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-white dark:bg-gray-900 px-3 text-xs text-gray-500 dark:text-gray-400">
                          {language === "en" ? "OR" : "ILI"}
                        </span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full py-6 rounded-xl h-12 text-sm font-medium border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={handleGoogleSignIn}
                      disabled={isLoading}
                    >
                      <svg
                        className="mr-2 h-4 w-4"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      {language === "en" ? "Continue with Google" : "Nastavi sa Google"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;
