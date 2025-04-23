
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator
} from "@/components/ui/sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { Users, LayoutDashboard, Settings, MessageSquareText, List, Grid2x2, LogOut, Sun, Moon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";

export function AppSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { currentUser, logout } = useAuth();
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  // Handle dark mode toggling
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const sidebarMenu = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Tasks", url: "/tasks", icon: List },
    { title: "Chat", url: "/chat", icon: MessageSquareText },
    { title: "Analytics", url: "/analytics", icon: Grid2x2 }
  ];

  // Role-specific items
  if (currentUser?.role === "super_admin") {
    sidebarMenu.push({ title: "Teams", url: "/teams", icon: Users });
  }
  if (currentUser?.role === "team_leader") {
    sidebarMenu.push({ title: "Add Team Member", url: "/add-team-member", icon: Users });
    sidebarMenu.push({ title: "Team Members", url: "/team-members", icon: Users });
  }
  if (currentUser?.role === "employee") {
    sidebarMenu.push({ title: "EOD", url: "/eod", icon: FileTextIcon });
  }

  // To use the correct Lucide icon for EOD
  function FileTextIcon(props:any) {
    return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 pl-2 pt-2">
          <span className="bg-bloom-purple/10 p-2 rounded-lg">
            <LayoutDashboard className="h-6 w-6 text-bloom-purple" />
          </span>
          <div>
            <h1 className="font-bold text-lg">TaskMate</h1>
            <p className="text-xs text-muted-foreground">AI-Powered Management</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.url)}
                    onClick={() => navigate(item.url)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/settings"}
                  onClick={() => navigate("/settings")}
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* Dark Mode Toggle */}
        <div className="flex gap-3 items-center px-2 pb-2">
          <Sun className="h-5 w-5 text-bloom-purple" />
          <Switch 
            checked={isDark}
            onCheckedChange={checked => setIsDark(checked)}
            aria-label="Toggle dark mode"
          />
          <Moon className="h-5 w-5 text-bloom-purple" />
        </div>
        <SidebarSeparator />
        <button
          onClick={() => logout()}
          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg dark:hover:bg-gray-800"
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </button>
        <div className="p-2 text-center text-xs text-muted-foreground">
          © 2025 TaskMate
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
