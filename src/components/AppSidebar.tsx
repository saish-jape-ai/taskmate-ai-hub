
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
import { Users, LayoutDashboard, Settings, MessageSquare, List, Grid2x2, LogOut, FileText, Bell, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export function AppSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { currentUser, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
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
    <Sidebar className={`border-r border-border bg-white dark:bg-sidebar-background transition-all duration-300 ${collapsed ? "w-[4rem]" : ""}`}>
      <SidebarHeader>
        <div className={`flex items-center ${collapsed ? "justify-center" : "gap-2 pl-4"} pt-4 pb-2`}>
          {!collapsed ? (
            <>
              <span className="bg-taskmate-purple/10 p-2 rounded-lg">
                <LayoutDashboard className="h-6 w-6 text-taskmate-purple" />
              </span>
              <div>
                <h1 className="font-bold text-lg">TaskMate</h1>
                <p className="text-xs text-muted-foreground">Work Smarter</p>
              </div>
            </>
          ) : (
            <span className="bg-taskmate-purple/10 p-2 rounded-lg">
              <LayoutDashboard className="h-6 w-6 text-taskmate-purple" />
            </span>
          )}
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      
      {currentUser && (
        <div className={`${collapsed ? "px-0 py-3 flex justify-center" : "px-4 py-3"}`}>
          {collapsed ? (
            <Avatar>
              <AvatarImage 
                src={currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=9b87f5&color=fff`} 
                alt={currentUser.name} 
              />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ) : (
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
          )}
        </div>
      )}
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => setCollapsed(!collapsed)} 
        className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-border bg-background z-10"
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </Button>
      
      <SidebarSeparator />
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <TooltipProvider delayDuration={0}>
                {sidebarMenu.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          isActive={pathname.startsWith(item.url)}
                          onClick={() => navigate(item.url)}
                          className={`${pathname.startsWith(item.url) ? "text-taskmate-purple bg-taskmate-purple/10" : ""} ${collapsed ? "justify-center" : ""}`}
                        >
                          <item.icon className="h-5 w-5" />
                          {!collapsed && <span>{item.title}</span>}
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      {collapsed && <TooltipContent side="right">{item.title}</TooltipContent>}
                    </Tooltip>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        isActive={pathname === "/settings"}
                        onClick={() => navigate("/settings")}
                        className={`${pathname === "/settings" ? "text-taskmate-purple bg-taskmate-purple/10" : ""} ${collapsed ? "justify-center" : ""}`}
                      >
                        <Settings className="h-5 w-5" />
                        {!collapsed && <span>Settings</span>}
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    {collapsed && <TooltipContent side="right">Settings</TooltipContent>}
                  </Tooltip>
                </SidebarMenuItem>
              </TooltipProvider>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className={`w-full ${collapsed ? "justify-center" : "justify-start"} text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20`}
              >
                <LogOut className="h-4 w-4 mr-2" />
                {!collapsed && "Log Out"}
              </Button>
            </TooltipTrigger>
            {collapsed && <TooltipContent side="right">Log Out</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
        {!collapsed && (
          <div className="p-2 text-center text-xs text-muted-foreground">
            © 2025 TaskMate
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
