import React, { useState } from 'react';
import { useProfiles, type ProfileFilter } from '../hooks/useProfiles';
import ProfileCard from '../components/profiles/ProfileCard';
import ProfileFilters from '../components/profiles/ProfileFilters';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { EmptyState } from '../components/ui/EmptyState';
import { useProfileInteraction } from '../hooks/useProfileDetail';
import { useUser } from '../contexts/UserContext';

const Profiles: React.FC = () => {
  const { user } = useUser();
  const [filters, setFilters] = useState<ProfileFilter>({});
  const { data: profiles, isLoading, isError } = useProfiles(filters);
  const { mutate: interact } = useProfileInteraction();

  const handleLike = (profileId: string) => {
    if (!user) return;
    interact({
      fromProfileId: user.id,
      toProfileId: profileId,
      action: 'like'
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <EmptyState 
          title="Error loading profiles" 
          description="Something went wrong while loading profiles. Please try again later." 
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProfileFilters onApplyFilters={setFilters} />
        
        {profiles && profiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map(profile => (
              <ProfileCard 
                key={profile.id} 
                profile={profile} 
                onLike={handleLike}
              />
            ))}
          </div>
        ) : (
          <EmptyState 
            title="No profiles found" 
            description="Try adjusting your search filters or check back later." 
          />
        )}
      </div>
    </div>
  );
};

export default Profiles;