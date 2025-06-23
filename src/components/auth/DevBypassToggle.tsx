import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Zap, Shield } from "lucide-react";

const DevBypassToggle: React.FC = () => {
  const { bypassAuth, toggleBypassAuth } = useAuth();

  // Only show in development mode
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="flex items-center space-x-3 px-3 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-lg border border-orange-200 dark:border-orange-800">
      <div className="flex items-center space-x-2">
        {bypassAuth ? (
          <Zap className="w-4 h-4 text-orange-600 dark:text-orange-400" />
        ) : (
          <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
        )}
        <Label
          htmlFor="dev-bypass"
          className="text-sm font-medium cursor-pointer text-gray-700 dark:text-gray-300"
        >
          Dev Mode
        </Label>
      </div>
      <Switch
        id="dev-bypass"
        checked={bypassAuth}
        onCheckedChange={toggleBypassAuth}
        className="data-[state=checked]:bg-orange-500 dark:data-[state=checked]:bg-orange-600"
      />
      <span className="text-xs text-gray-600 dark:text-gray-400 min-w-0">
        {bypassAuth ? "Bypass ON" : "Auth ON"}
      </span>
    </div>
  );
};

export default DevBypassToggle;
