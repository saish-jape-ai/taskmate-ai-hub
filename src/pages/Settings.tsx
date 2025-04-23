
import AppLayout from "@/components/AppLayout";
import { Settings as SettingsIcon, Moon, Sun, Bell, Shield, Palette, Globe, UserCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <AppLayout title="Settings">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3 text-taskmate-purple font-bold text-2xl mb-6">
          <SettingsIcon className="h-7 w-7" />
          Settings
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <UserCircle className="h-5 w-5" /> Account Settings
          </h3>
          <p className="text-muted-foreground text-sm mb-4">Manage your account preferences and personal information.</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Email Notifications</label>
                <p className="text-sm text-muted-foreground">Receive email updates about your tasks</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Two-Factor Authentication</label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Palette className="h-5 w-5" /> Appearance
          </h3>
          <p className="text-muted-foreground text-sm mb-4">Customize how TaskMate looks and feels.</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="h-5 w-5" />
                <div>
                  <label className="font-medium">Dark Mode</label>
                  <p className="text-sm text-muted-foreground">Toggle between light and dark themes</p>
                </div>
              </div>
              <Switch 
                checked={theme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Compact Mode</label>
                <p className="text-sm text-muted-foreground">Use a more compact layout</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Bell className="h-5 w-5" /> Notifications
          </h3>
          <p className="text-muted-foreground text-sm mb-4">Configure your notification preferences.</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Task Updates</label>
                <p className="text-sm text-muted-foreground">Get notified about task changes</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Team Messages</label>
                <p className="text-sm text-muted-foreground">Receive team chat notifications</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Globe className="h-5 w-5" /> Language & Region
          </h3>
          <p className="text-muted-foreground text-sm mb-4">Set your language and regional preferences.</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Language</label>
                <p className="text-sm text-muted-foreground">Choose your preferred language</p>
              </div>
              <select className="border rounded px-2 py-1">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Time Zone</label>
                <p className="text-sm text-muted-foreground">Set your local time zone</p>
              </div>
              <select className="border rounded px-2 py-1">
                <option>UTC</option>
                <option>EST</option>
                <option>PST</option>
              </select>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Settings;
