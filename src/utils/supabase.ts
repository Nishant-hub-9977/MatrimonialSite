import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

export async function fetchProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    toast.error('Failed to fetch profile');
    return null;
  }
}

export async function fetchNotifications(userId: string) {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .eq('read', false)
      .count();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return 0;
  }
}

export async function fetchUnreadMessages(userId: string) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('receiver_id', userId)
      .eq('read', false)
      .count();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return 0;
  }
}