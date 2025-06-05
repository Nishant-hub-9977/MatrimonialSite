import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

export const useProfileDetail = (profileId: string) => {
  return useQuery({
    queryKey: ['profile', profileId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_profiles')
        .select(`
          *,
          profile_images (
            id,
            image_url,
            is_primary,
            order_index
          ),
          profile_interests (
            id,
            interest
          ),
          profile_preferences (
            id,
            age_range,
            location_preference,
            education_preference,
            occupation_preference
          )
        `)
        .eq('profile_id', profileId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!profileId,
  });
};

interface ProfileInteraction {
  fromProfileId: string;
  toProfileId: string;
  action: 'like' | 'pass' | 'message';
  message?: string;
}

export const useProfileInteraction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ fromProfileId, toProfileId, action, message }: ProfileInteraction) => {
      const { data, error } = await supabase
        .from('profile_interactions')
        .insert({
          from_profile_id: fromProfileId,
          to_profile_id: toProfileId,
          action,
          message,
          created_at: new Date().toISOString(),
        });

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['profile_interactions'] });
      const actionMessages = {
        like: 'Interest shown successfully!',
        pass: 'Profile passed',
        message: 'Message sent successfully!',
      };
      toast.success(actionMessages[variables.action]);
    },
    onError: (error) => {
      toast.error(`Failed to interact with profile: ${error.message}`);
    },
  });
};