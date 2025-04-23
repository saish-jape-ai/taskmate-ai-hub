
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import { notifications } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, Bell, CheckCircle2, Clock, 
  AlertCircle, CheckCheck 
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const Notifications = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  if (!currentUser) return null;
  
  // Get user notifications
  const userNotifications = notifications.filter(
    notification => notification.userId === currentUser.id
  );
  
  // Count unread notifications
  const unreadCount = userNotifications.filter(notification => !notification.read).length;
  
  // Group notifications by type
  const taskNotifications = userNotifications.filter(notification => notification.type === 'task');
  const messageNotifications = userNotifications.filter(notification => notification.type === 'message');
  const systemNotifications = userNotifications.filter(notification => notification.type === 'system');
  
  // Handle mark all as read
  const handleMarkAllAsRead = () => {
    // In a real app, this would update the notifications in the backend
    toast.success('All notifications marked as read');
  };
  
  // Handle click on notification
  const handleNotificationClick = (notification: typeof notifications[0]) => {
    // In a real app, this would mark the notification as read in the backend
    
    // Navigate to the linked page if available
    if (notification.linkTo) {
      navigate(notification.linkTo);
    }
  };
  
  // Render notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'task':
        return <CheckCircle2 className="h-5 w-5 text-bloom-purple" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'system':
        return <Bell className="h-5 w-5 text-amber-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-400" />;
    }
  };
  
  return (
    <AppLayout title="Notifications">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold">Notifications</h2>
            <p className="text-muted-foreground mt-1">
              {unreadCount > 0 
                ? `You have ${unreadCount} unread notifications` 
                : 'All notifications are read'
              }
            </p>
          </div>
          
          <Button variant="outline" onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">
              All ({userNotifications.length})
            </TabsTrigger>
            <TabsTrigger value="tasks">
              Tasks ({taskNotifications.length})
            </TabsTrigger>
            <TabsTrigger value="messages">
              Messages ({messageNotifications.length})
            </TabsTrigger>
            <TabsTrigger value="system">
              System ({systemNotifications.length})
            </TabsTrigger>
          </TabsList>
          
          <Card>
            <ScrollArea className="h-[calc(100vh-20rem)]">
              <TabsContent value="all" className="mt-0 p-0">
                {userNotifications.length > 0 ? (
                  <div className="divide-y">
                    {userNotifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`
                          flex items-start gap-4 p-4 cursor-pointer
                          ${notification.read ? '' : 'bg-muted/20'}
                          hover:bg-muted/30
                        `}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{notification.title}</h3>
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          
                          {notification.type === 'task' && (
                            <Badge variant="outline" className="mt-2">Task</Badge>
                          )}
                        </div>
                        
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No notifications</h3>
                    <p className="text-muted-foreground mt-1">
                      You don't have any notifications yet
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="tasks" className="mt-0 p-0">
                {taskNotifications.length > 0 ? (
                  <div className="divide-y">
                    {taskNotifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`
                          flex items-start gap-4 p-4 cursor-pointer
                          ${notification.read ? '' : 'bg-muted/20'}
                          hover:bg-muted/30
                        `}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{notification.title}</h3>
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                        </div>
                        
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <CheckCircle2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No task notifications</h3>
                    <p className="text-muted-foreground mt-1">
                      You don't have any task notifications yet
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="messages" className="mt-0 p-0">
                {messageNotifications.length > 0 ? (
                  <div className="divide-y">
                    {messageNotifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`
                          flex items-start gap-4 p-4 cursor-pointer
                          ${notification.read ? '' : 'bg-muted/20'}
                          hover:bg-muted/30
                        `}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{notification.title}</h3>
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                        </div>
                        
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No message notifications</h3>
                    <p className="text-muted-foreground mt-1">
                      You don't have any message notifications yet
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="system" className="mt-0 p-0">
                {systemNotifications.length > 0 ? (
                  <div className="divide-y">
                    {systemNotifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`
                          flex items-start gap-4 p-4 cursor-pointer
                          ${notification.read ? '' : 'bg-muted/20'}
                          hover:bg-muted/30
                        `}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{notification.title}</h3>
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                        </div>
                        
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No system notifications</h3>
                    <p className="text-muted-foreground mt-1">
                      You don't have any system notifications yet
                    </p>
                  </div>
                )}
              </TabsContent>
            </ScrollArea>
          </Card>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Notifications;
