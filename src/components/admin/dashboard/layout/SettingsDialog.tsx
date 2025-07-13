
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut } from 'lucide-react';

interface SettingsDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  theme: string | undefined;
  setTheme: (theme: string) => void;
  handleLogout: () => void;
}

export const SettingsDialog: React.FC<SettingsDialogProps> = ({
  isOpen,
  onOpenChange,
  theme,
  setTheme,
  handleLogout,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Settings</DialogTitle>
          <DialogDescription>
            Customize your dashboard experience and account preferences
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="appearance">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Toggle between light and dark theme</p>
                </div>
                <Switch 
                  id="dark-mode" 
                  checked={theme === 'dark'}
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="reduced-motion">Reduced Motion</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Minimize animations throughout the interface</p>
                </div>
                <Switch id="reduced-motion" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="compact-view">Compact View</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Reduce spacing and size of UI elements</p>
                </div>
                <Switch id="compact-view" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifs">Email Notifications</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive system notifications via email</p>
                </div>
                <Switch id="email-notifs" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifs">Push Notifications</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive in-app notifications</p>
                </div>
                <Switch id="push-notifs" defaultChecked />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="account" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/lovable-uploads/9379e65b-bb1e-43d1-8d21-be1f9263156a.png" />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Dr. Kerim Sabic</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Head of Clinical Informatics</p>
                </div>
              </div>
              <Separator />
              <div>
                <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

