
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
import { Users, LayoutDashboard, Settings, MessageSquare, List, Grid2x2, LogOut, FileText, Bell, Bot, PanelLeftClose, CalendarDays } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useState } from "react";

export function AppSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { currentUser, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Base menu items that all users see
  const sidebarMenu = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Tasks", url: "/tasks", icon: List },
    { title: "Chat", url: "/chat", icon: MessageSquare },
    { title: "Calendar", url: "/calendar", icon: CalendarDays },
    { title: "Analytics", url: "/analytics", icon: Grid2x2 }
  ];

  // Role-specific items - Remove Team Leader option from sidebar as requested
  if (currentUser?.role === "super_admin") {
    sidebarMenu.push({ title: "Teams", url: "/teams", icon: Users });
  }
  
  // Now team_leader doesn't appear in the sidebar title
  if (currentUser?.role === "team_leader") {
    sidebarMenu.push({ title: "Team Members", url: "/team-members", icon: Users });
    sidebarMenu.push({ title: "Reminders", url: "/reminders", icon: Bell });
  }
  
  if (currentUser?.role === "employee") {
    sidebarMenu.push({ title: "EOD", url: "/eod", icon: FileText });
    sidebarMenu.push({ title: "AI Assistant", url: "/ai-chat", icon: Bot });
  }

  return (
    <Sidebar className={`border-r border-border bg-white dark:bg-sidebar-background transition-all duration-200 ${isCollapsed ? 'w-[60px]' : ''}`}>
      <SidebarHeader>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''} gap-2 pl-1 pt-4 pb-2`}>
          <span className="bg-taskmate-purple/10 p-2 rounded-lg">
            <LayoutDashboard className="h-6 w-6 text-taskmate-purple" />
          </span>
          {!isCollapsed && (
            <div>
              <h1 className="font-bold text-lg">TaskMate</h1>
              <p className="text-xs text-muted-foreground">Work Smarter</p>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarSeparator />
            
      <SidebarSeparator />
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.url)}
                    onClick={() => navigate(item.url)}
                    className={pathname.startsWith(item.url) ? "text-taskmate-purple bg-taskmate-purple/10" : ""}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <item.icon className="h-5 w-5" />
                    {!isCollapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/settings"}
                  onClick={() => navigate("/settings")}
                  className={pathname === "/settings" ? "text-taskmate-purple bg-taskmate-purple/10" : ""}
                  tooltip={isCollapsed ? "Settings" : undefined}
                >
                  <Settings className="h-5 w-5" />
                  {!isCollapsed && <span>Settings</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
        >
          <LogOut className="h-4 w-4 mr-2" />
          {!isCollapsed && "Log Out"}
        </Button>
        <Button
          onClick={() => setIsCollapsed(!isCollapsed)}
          variant="ghost"
          className="w-full justify-start"
        >
          <PanelLeftClose className={`h-4 w-4 mr-2 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
          {!isCollapsed && (isCollapsed ? "Expand" : "Collapse")}
        </Button>
        {!isCollapsed && (
          <div className="p-2 text-center text-xs text-muted-foreground">
            © 2025 TaskMate
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
