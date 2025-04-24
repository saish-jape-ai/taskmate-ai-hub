
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const AppLayout = ({ children, title }: AppLayoutProps) => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !currentUser) return null;

  const userInitials = currentUser.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top bar */}
          <header className="flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-16 px-6">
            <div className="font-semibold text-xl">{title}</div>
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              {currentUser && (
                <div className={`px-4 py-3 `}>
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
            </div>
          </header>
          <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-950 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
