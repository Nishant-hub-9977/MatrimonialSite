import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export interface ProfileFilter {
  ageMin?: number;
  ageMax?: number;
  location?: string;
  religion?: string;
  motherTongue?: string;
  education?: string;
  occupation?: string;
}

export const useProfiles = (filters: ProfileFilter = {}) => {
  return useQuery({
    queryKey: ['profiles', filters],
    queryFn: async () => {
      let query = supabase
        .from('user_profiles')
        .select(`
          id,
          profile_id,
          first_name,
          last_name,
          age,
          location,
          occupation,
          education,
          bio,
          height,
          profile_image,
          created_at,
          updated_at
        `);

      if (filters.ageMin) {
        query = query.gte('age', filters.ageMin);
      }
      if (filters.ageMax) {
        query = query.lte('age', filters.ageMax);
      }
      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }
      if (filters.education) {
        query = query.ilike('education', `%${filters.education}%`);
      }
      if (filters.occupation) {
        query = query.ilike('occupation', `%${filters.occupation}%`);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
  });
};