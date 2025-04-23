
import AppLayout from "@/components/AppLayout";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  return (
    <AppLayout title="Settings">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 space-y-6">
        <div className="flex items-center gap-3 text-bloom-purple font-bold text-2xl">
          <SettingsIcon className="h-7 w-7" />
          Settings
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Personalization & Preferences</h3>
          <p className="text-muted-foreground mb-4">
            Adjust your personal account settings, theme, and notification preferences.
          </p>
          <input
            type="checkbox"
            className="mr-2"
            id="darkmode"
            // This would be wired up to a theme system
          /><label htmlFor="darkmode">Enable Dark Mode</label>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Security</h3>
          <p className="text-muted-foreground">Manage your password and account security options here.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-muted-foreground">BloomTeam: For team productivity and smart performance management.</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;
