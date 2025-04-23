
import { useEffect, useState } from 'react';
import { notifications } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';

const NotificationIndicator = () => {
  const { currentUser } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!currentUser) return;
    
    // Filter notifications for the current user that are unread
    const userUnreadNotifications = notifications.filter(
      (notification) => notification.userId === currentUser.id && !notification.read
    );
    
    setUnreadCount(userUnreadNotifications.length);
  }, [currentUser]);

  if (unreadCount === 0) {
    return null;
  }

  return (
    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
      {unreadCount > 9 ? '9+' : unreadCount}
    </span>
  );
};

export default NotificationIndicator;
