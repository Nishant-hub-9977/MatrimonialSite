import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Briefcase, GraduationCap } from 'lucide-react';

interface ProfileCardProps {
  profile: {
    id: string;
    profile_id: string;
    first_name: string;
    last_name: string;
    age: number;
    location: string;
    occupation: string;
    education: string;
    profile_image: string;
  };
  onLike?: (profileId: string) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onLike }) => {
  const fullName = `${profile.first_name} ${profile.last_name}`;
  const imageUrl = profile.profile_image || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={fullName} 
          className="w-full h-64 object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{fullName}, {profile.age}</h3>
        
        <div className="mt-2 space-y-2">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{profile.location}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Briefcase className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{profile.occupation}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <GraduationCap className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{profile.education}</span>
          </div>
        </div>
        
        <div className="mt-4 flex space-x-2">
          <Link
            to={`/profile/${profile.profile_id}`}
            className="flex-1 bg-orange-500 text-white py-2 text-center rounded-md hover:bg-orange-600 transition-colors"
          >
            View Profile
          </Link>
          <button 
            onClick={() => onLike?.(profile.profile_id)}
            className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            <Heart className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;