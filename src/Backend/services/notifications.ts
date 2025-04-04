
import { supabase } from '../supabase/client';

export type Notification = {
  id: string;
  user_id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export const getNotifications = async (): Promise<Notification[]> => {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) return [];

  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }

  return (data || []) as Notification[];
};

export const getUnreadNotificationsCount = async (): Promise<number> => {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) return 0;

  const { count, error } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.user.id)
    .eq('is_read', false);

  if (error) {
    console.error('Error fetching unread notifications count:', error);
    return 0;
  }

  return count || 0;
};

export const markNotificationAsRead = async (notificationId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId);

  if (error) {
    console.error('Error marking notification as read:', error);
    return false;
  }

  return true;
};

export const markAllNotificationsAsRead = async (): Promise<boolean> => {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) return false;

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', user.user.id)
    .eq('is_read', false);

  if (error) {
    console.error('Error marking all notifications as read:', error);
    return false;
  }

  return true;
};

// For demo purposes - add a notification for the current user
export const addDemoNotification = async (title: string, message: string): Promise<boolean> => {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) return false;

  const { error } = await supabase
    .from('notifications')
    .insert({
      user_id: user.user.id,
      title,
      message
    });

  if (error) {
    console.error('Error adding notification:', error);
    return false;
  }

  return true;
};
