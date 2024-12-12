import React from "react";
import { Input } from "./input";
import { Label } from "./label";
import { cn } from "@/lib/utils";

interface FuturisticInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FuturisticInput = React.forwardRef<HTMLInputElement, FuturisticInputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2 animate-fade-in">
        <Label className="text-sm font-medium text-gray-700 ml-1">{label}</Label>
        <div className="relative group">
          <Input
            ref={ref}
            className={cn(
              "w-full px-4 py-2.5 bg-white/50 backdrop-blur-sm rounded-xl border border-mint-100",
              "focus:border-mint-300 focus:ring-2 focus:ring-mint-200/50 transition-all duration-200",
              "group-hover:border-mint-200 group-hover:shadow-lg group-hover:shadow-mint-100/20",
              className
            )}
            {...props}
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-mint-200/0 to-mint-300/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
        </div>
        {error && <p className="text-sm text-red-500 ml-1">{error}</p>}
      </div>
    );
  }
);

FuturisticInput.displayName = "FuturisticInput";