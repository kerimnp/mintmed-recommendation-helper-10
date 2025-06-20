
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

export const PasswordChangeForm = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError(language === 'en' ? 'Please fill in all fields' : 'Molimo popunite sva polja');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(language === 'en' ? 'New passwords do not match' : 'Nove lozinke se ne podudaraju');
      return;
    }

    if (newPassword.length < 6) {
      setError(language === 'en' ? 'New password must be at least 6 characters long' : 'Nova lozinka mora imati najmanje 6 znakova');
      return;
    }

    if (currentPassword === newPassword) {
      setError(language === 'en' ? 'New password must be different from current password' : 'Nova lozinka mora biti različita od trenutne lozinke');
      return;
    }

    setIsLoading(true);

    try {
      // Update password
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        throw error;
      }

      toast({
        title: language === 'en' ? 'Password updated successfully' : 'Lozinka je uspješno ažurirana',
        description: language === 'en' 
          ? 'Your password has been changed successfully.'
          : 'Vaša lozinka je uspješno promijenjena.',
      });

      // Clear form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
    } catch (error: any) {
      console.error('Password change error:', error);
      setError(error.message || (language === 'en' 
        ? 'Failed to update password. Please try again.'
        : 'Neuspješno ažuriranje lozinke. Molimo pokušajte ponovno.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          {language === 'en' ? 'Change Password' : 'Promjena Lozinke'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">
              {language === 'en' ? 'Current Password' : 'Trenutna Lozinka'}
            </Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={isLoading}
                className="pr-10"
                placeholder={language === 'en' ? 'Enter current password' : 'Unesite trenutnu lozinku'}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                disabled={isLoading}
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">
              {language === 'en' ? 'New Password' : 'Nova Lozinka'}
            </Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isLoading}
                className="pr-10"
                placeholder={language === 'en' ? 'Enter new password' : 'Unesite novu lozinku'}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowNewPassword(!showNewPassword)}
                disabled={isLoading}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="text-sm text-gray-500">
              {language === 'en' 
                ? 'Password must be at least 6 characters long'
                : 'Lozinka mora imati najmanje 6 znakova'}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">
              {language === 'en' ? 'Confirm New Password' : 'Potvrdite Novu Lozinku'}
            </Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                className="pr-10"
                placeholder={language === 'en' ? 'Confirm new password' : 'Potvrdite novu lozinku'}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {language === 'en' ? 'Updating Password...' : 'Ažuriranje Lozinke...'}
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Update Password' : 'Ažuriraj Lozinku'}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
