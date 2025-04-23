
import AppLayout from "@/components/AppLayout";
import { Settings as SettingsIcon, Moon, Sun, Bell, Shield, Palette, Globe, UserCircle, LogOut, Mail, BellRing, Database, Lock, Image, LayoutGrid, Languages } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Wait for component to mount to access theme
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <AppLayout title="Settings">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-taskmate-purple/10 flex items-center justify-center">
            <SettingsIcon className="h-5 w-5 text-taskmate-purple" />
          </div>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <UserCircle className="h-5 w-5 text-taskmate-purple" /> Account Settings
          </h3>
          <p className="text-muted-foreground text-sm mb-4">Manage your account preferences and personal information.</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Email Notifications</label>
                <p className="text-sm text-muted-foreground">Receive email updates about your tasks</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Two-Factor Authentication</label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Profile Visibility</label>
                <p className="text-sm text-muted-foreground">Control who can view your profile details</p>
              </div>
              <Select defaultValue="team">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="team">Team Only</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Palette className="h-5 w-5 text-taskmate-purple" /> Appearance
          </h3>
          <p className="text-muted-foreground text-sm mb-4">Customize how TaskMate looks and feels.</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {mounted && theme === "dark" ? (
                  <Moon className="h-5 w-5 text-taskmate-purple" />
                ) : (
                  <Sun className="h-5 w-5 text-taskmate-purple" />
                )}
                <div>
                  <label className="font-medium">Dark Mode</label>
                  <p className="text-sm text-muted-foreground">Toggle between light and dark themes</p>
                </div>
              </div>
              <Switch 
                checked={mounted && theme === "dark"}
                onCheckedChange={(checked) => {
                  setTheme(checked ? "dark" : "light");
                  toast.success(`${checked ? "Dark" : "Light"} mode activated`);
                }}
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
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Dashboard Layout</label>
                <p className="text-sm text-muted-foreground">Choose your preferred dashboard layout</p>
              </div>
              <Select defaultValue="grid">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid">Grid</SelectItem>
                  <SelectItem value="list">List</SelectItem>
                  <SelectItem value="compact">Compact</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Color Scheme</label>
                <p className="text-sm text-muted-foreground">Personalize your color experience</p>
              </div>
              <Select defaultValue="purple">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select scheme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="purple">Purple (Default)</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Bell className="h-5 w-5 text-taskmate-purple" /> Notifications
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
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">EOD Reminders</label>
                <p className="text-sm text-muted-foreground">Get daily reminders to submit your EOD report</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Desktop Notifications</label>
                <p className="text-sm text-muted-foreground">Show notifications on your desktop</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5 text-taskmate-purple" /> Privacy & Security
          </h3>
          <p className="text-muted-foreground text-sm mb-4">Manage your privacy and security settings.</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Activity Tracking</label>
                <p className="text-sm text-muted-foreground">Allow system to track your activity for analytics</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Password Update</label>
                <p className="text-sm text-muted-foreground">Change your account password</p>
              </div>
              <Button variant="outline" size="sm">
                <Lock className="h-3.5 w-3.5 mr-1" />
                Change
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Data Export</label>
                <p className="text-sm text-muted-foreground">Export all your personal data</p>
              </div>
              <Button variant="outline" size="sm">
                <Database className="h-3.5 w-3.5 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Globe className="h-5 w-5 text-taskmate-purple" /> Language & Region
          </h3>
          <p className="text-muted-foreground text-sm mb-4">Set your language and regional preferences.</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Language</label>
                <p className="text-sm text-muted-foreground">Choose your preferred language</p>
              </div>
              <Select defaultValue="en">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Time Zone</label>
                <p className="text-sm text-muted-foreground">Set your local time zone</p>
              </div>
              <Select defaultValue="utc">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">EST (UTC-5)</SelectItem>
                  <SelectItem value="pst">PST (UTC-8)</SelectItem>
                  <SelectItem value="ist">IST (UTC+5:30)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Date Format</label>
                <p className="text-sm text-muted-foreground">Choose your preferred date format</p>
              </div>
              <Select defaultValue="mdy">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-red-200 dark:border-red-900/50">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-red-600">
            <LogOut className="h-5 w-5" /> Account Actions
          </h3>
          <p className="text-muted-foreground text-sm mb-4">Manage your account access.</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Log Out</label>
                <p className="text-sm text-muted-foreground">Sign out from all devices</p>
              </div>
              <Button 
                variant="destructive" 
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Settings;
