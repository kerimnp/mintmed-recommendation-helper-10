import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Mail, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactSupportDialogProps {
  trigger: React.ReactNode;
  planName: string;
  planPrice: number;
}

export const ContactSupportDialog: React.FC<ContactSupportDialogProps> = ({
  trigger,
  planName,
  planPrice,
}) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const supportEmail = 'support@horalix.com';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(supportEmail);
      setCopied(true);
      toast({
        title: "Email Copied",
        description: "Support email has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Please copy the email address manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-600" />
            Contact Support for Plan Setup
          </DialogTitle>
          <DialogDescription>
            To get started with the {planName} plan (${planPrice}/month), please contact our support team.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
              Our team will help you set up your subscription and ensure you get the most out of our AI-powered antibiotic recommendation system.
            </p>
            
            <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-3 rounded border">
              <span className="font-mono text-sm">{supportEmail}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyEmail}
                className="ml-2"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p className="font-medium mb-2">What to include in your email:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Selected plan: {planName}</li>
              <li>Your organization name (if applicable)</li>
              <li>Number of healthcare providers</li>
              <li>Any specific integration requirements</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};