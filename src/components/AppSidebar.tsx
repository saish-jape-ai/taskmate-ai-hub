
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
import { Users, LayoutDashboard, Settings, MessageSquareText, List, Grid2x2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function AppSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { currentUser } = useAuth();

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
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 pl-2 pt-2">
          <span className="bg-bloom-purple/10 p-2 rounded-lg">
            <LayoutDashboard className="h-6 w-6 text-bloom-purple" />
          </span>
          <div>
            <h1 className="font-bold text-lg">BloomTeam</h1>
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
        <SidebarSeparator />
        <div className="p-2 text-center text-xs text-muted-foreground">
          © 2025 BloomTeam
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
