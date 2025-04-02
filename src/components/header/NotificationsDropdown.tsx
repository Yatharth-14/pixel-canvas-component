
import React, { useState, useEffect } from 'react';
import { Bell, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/Backend/contexts/AuthContext';
import { 
  Notification, 
  getNotifications, 
  getUnreadNotificationsCount, 
  markNotificationAsRead, 
  markAllNotificationsAsRead,
  addDemoNotification
} from '@/Backend/services/notifications';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const NotificationsDropdown = () => {
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const fetchNotifications = async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    const data = await getNotifications();
    setNotifications(data);
    setIsLoading(false);
  };

  const fetchUnreadCount = async () => {
    if (!isAuthenticated) return;
    const count = await getUnreadNotificationsCount();
    setUnreadCount(count);
  };

  useEffect(() => {
    fetchUnreadCount();
    // Only fetch notifications if dropdown is open
    if (isOpen) {
      fetchNotifications();
    }
  }, [isAuthenticated, isOpen]);

  const handleMarkAsRead = async (notification: Notification) => {
    if (notification.is_read) return;
    await markNotificationAsRead(notification.id);
    setNotifications(notifications.map(n => 
      n.id === notification.id ? { ...n, is_read: true } : n
    ));
    await fetchUnreadCount();
  };

  const handleMarkAllAsRead = async () => {
    await markAllNotificationsAsRead();
    setNotifications(notifications.map(n => ({ ...n, is_read: true })));
    setUnreadCount(0);
  };

  // For demo purposes only
  const handleAddDemoNotification = async () => {
    if (!isAuthenticated) return;
    
    const titles = [
      'New product available', 
      'Price drop alert', 
      'Order shipped', 
      'Payment successful',
      'Limited time offer'
    ];
    
    const messages = [
      'A new product that matches your interests is now available.',
      'Price has dropped for an item in your wishlist.',
      'Your recent order has been shipped and is on its way.',
      'Your payment has been successfully processed.',
      'Special offer: Get 15% off on selected items for the next 24 hours!'
    ];
    
    const randomIndex = Math.floor(Math.random() * titles.length);
    await addDemoNotification(titles[randomIndex], messages[randomIndex]);
    
    await fetchUnreadCount();
    if (isOpen) {
      await fetchNotifications();
    }
  };

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" onClick={() => isAuthenticated && handleAddDemoNotification()}>
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center bg-red-500 text-white rounded-full text-xs px-1.5">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-4" align="end">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-blue-600 hover:text-blue-800 p-0 h-auto font-normal"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <Separator className="mb-3" />
        
        {!isAuthenticated ? (
          <div className="flex flex-col items-center py-6 text-center">
            <AlertCircle className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-gray-500 mb-4">Please log in to see your notifications</p>
            <Link to="/login">
              <Button className="bg-medical-primary hover:bg-medical-primary/90">
                Login
              </Button>
            </Link>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-medical-primary"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center py-6 text-center">
            <Bell className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-gray-500">No notifications yet</p>
          </div>
        ) : (
          <div className="max-h-80 overflow-y-auto space-y-2">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-3 rounded-md transition-colors ${notification.is_read ? 'bg-white' : 'bg-blue-50'}`}
                onClick={() => handleMarkAsRead(notification)}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  {!notification.is_read && (
                    <div className="h-2 w-2 rounded-full bg-blue-500 mt-1"></div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                  </span>
                  {!notification.is_read && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 px-2 text-xs text-blue-600 hover:text-blue-800"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsRead(notification);
                      }}
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Mark as read
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {isAuthenticated && notifications.length > 0 && (
          <div className="mt-3 pt-3 border-t text-center">
            <Button variant="link" className="text-sm text-blue-600 hover:text-blue-800">
              View all notifications
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;
