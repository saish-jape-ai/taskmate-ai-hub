
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
import { Users, LayoutDashboard, Settings, MessageSquare, List, Grid2x2, LogOut, FileText } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function AppSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { currentUser, logout } = useAuth();

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
  }
  if (currentUser?.role === "employee") {
    sidebarMenu.push({ title: "EOD", url: "/eod", icon: FileText });
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 pl-2 pt-2">
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
      <SidebarContent>
        <SidebarGroup>
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
        <button
          onClick={handleLogout}
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
