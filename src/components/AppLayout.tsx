
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AreaChart, Users, CheckSquare, MessageSquareText, BellRing, BarChart3, Settings, LogOut, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import NotificationIndicator from '@/components/NotificationIndicator';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const AppLayout = ({ children, title = 'Dashboard' }: AppLayoutProps) => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  const userInitials = currentUser.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  const getMenuItems = () => {
    const baseItems = [
      { title: 'Dashboard', icon: Home, path: '/dashboard' },
      { title: 'Tasks', icon: CheckSquare, path: '/tasks' },
      { title: 'Chat', icon: MessageSquareText, path: '/chat' },
      { title: 'Analytics', icon: BarChart3, path: '/analytics' },
    ];

    // Add role-specific menu items
    if (currentUser.role === 'super_admin') {
      baseItems.push({ title: 'Teams', icon: Users, path: '/teams' });
    }
    if (currentUser.role === 'team_leader') {
      baseItems.push({ title: 'Team', icon: Users, path: '/team' });
    }

    return baseItems;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = getMenuItems();
  
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <AreaChart className="h-8 w-8 text-bloom-purple" />
            <div>
              <h1 className="text-xl font-bold">BloomTeam</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Management</p>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="flex flex-col flex-1 py-4">
          <nav className="px-2 space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className="bloom-sidebar-link w-full justify-start"
                onClick={() => navigate(item.path)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Button>
            ))}
          </nav>
          
          <div className="mt-auto px-2 space-y-1">
            <Button
              variant="ghost"
              className="bloom-sidebar-link w-full justify-start"
              onClick={() => navigate('/settings')}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Button>
            
            <Button
              variant="ghost"
              className="bloom-sidebar-link w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/10"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between h-16 px-6">
            <h1 className="text-xl font-semibold">{title}</h1>
            
            <div className="flex items-center space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/notifications')}>
                      <BellRing className="h-5 w-5" />
                      <NotificationIndicator />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Notifications</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <div className="flex items-center space-x-2">
                <Avatar>
                  {currentUser.avatar ? (
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  ) : (
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  )}
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{currentUser.role.replace('_', ' ')}</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-950 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
