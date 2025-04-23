
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
  SidebarSeparator,
  useSidebar
} from "@/components/ui/sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { Users, LayoutDashboard, Settings, MessageSquare, List, Grid2x2, LogOut, FileText, Bell } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export function AppSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { currentUser, logout } = useAuth();
  const { toggleSidebar } = useSidebar();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const sidebarMenu = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Tasks", url: "/tasks", icon: List },
    { title: "Chat", url: "/chat", icon: MessageSquare },
    { title: "Analytics", url: "/analytics", icon: Grid2x2 }
  ];

  // Role-specific items
  if (currentUser?.role === "super_admin") {
    sidebarMenu.push({ title: "Teams", url: "/teams", icon: Users });
  }
  
  if (currentUser?.role === "team_leader") {
    sidebarMenu.push({ title: "Team Members", url: "/team-members", icon: Users });
    sidebarMenu.push({ title: "Reminders", url: "/reminders", icon: Bell });
  }
  
  if (currentUser?.role === "employee") {
    sidebarMenu.push({ title: "EOD", url: "/eod", icon: FileText });
  }

  return (
    <Sidebar className="border-r border-border bg-white dark:bg-sidebar-background">
      <SidebarHeader>
        <div className="flex items-center gap-2 pl-4 pt-4 pb-2">
          <span className="bg-taskmate-purple/10 p-2 rounded-lg">
            <LayoutDashboard className="h-6 w-6 text-taskmate-purple" />
          </span>
          <div>
            <h1 className="font-bold text-lg">TaskMate</h1>
            <p className="text-xs text-muted-foreground">Work Smarter</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      
      {currentUser && (
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage 
                src={currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=9b87f5&color=fff`} 
                alt={currentUser.name} 
              />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{currentUser.role.replace('_', ' ')}</p>
            </div>
          </div>
        </div>
      )}
      
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
                  className={pathname === "/settings" ? "text-taskmate-purple bg-taskmate-purple/10" : ""}
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
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </Button>
        <div className="p-2 text-center text-xs text-muted-foreground">
          © 2025 TaskMate
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
