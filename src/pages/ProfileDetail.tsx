import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProfileDetail, useProfileInteraction } from '../hooks/useProfileDetail';
import { useUser } from '../contexts/UserContext';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { EmptyState } from '../components/ui/EmptyState';
import { Heart, MessageCircle, Share2, Flag } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ProfileDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();
  const { data: profile, isLoading, isError } = useProfileDetail(id!);
  const { mutate: interact } = useProfileInteraction();
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');

  const handleConnect = () => {
    if (!user || !id) {
      toast.error('Please log in to connect.');
      return;
    }
    interact({
      fromProfileId: user.id,
      toProfileId: id,
      action: 'like'
    });
  };

  const handleMessage = () => {
    if (!user) {
      toast.error('Please log in to send a message.');
      return;
    }
    setShowMessageModal(true);
  };

  const handleSendMessage = () => {
    if (!user || !id || !message.trim()) return;
    
    interact({
      fromProfileId: user.id,
      toProfileId: id,
      action: 'message',
      message: message.trim()
    });
    
    setMessage('');
    setShowMessageModal(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Check out ${profile?.first_name}'s profile on SoulMate`,
        url: window.location.href,
      }).catch((error) => console.error('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Profile link copied to clipboard!');
    }
  };

  const handleReport = () => {
    toast.info('Reporting functionality coming soon!');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <EmptyState 
          title="Profile not found" 
          description="The profile you are looking for does not exist or has been removed." 
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="relative">
            <div className="h-64 bg-gradient-to-r from-orange-400 to-orange-600">
              {profile.profile_image && (
                <img 
                  src={profile.profile_image}
                  alt={`${profile.first_name} ${profile.last_name}`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="absolute bottom-0 left-0 w-full transform translate-y-1/2 flex justify-center">
              <img 
                src={profile.profile_image || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"}
                alt={`${profile.first_name} ${profile.last_name}`}
                className="h-40 w-40 rounded-full border-4 border-white object-cover"
              />
            </div>
          </div>
          
          <div className="pt-24 pb-6 px-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">
                {profile.first_name} {profile.last_name}, {profile.age}
              </h1>
              <p className="text-gray-600">{profile.location}</p>
              
              <div className="mt-6 flex justify-center space-x-4">
                <button
                  onClick={handleConnect}
                  className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Connect
                </button>
                <button
                  onClick={handleMessage}
                  className="flex items-center px-4 py-2 bg-white border border-orange-500 text-orange-500 rounded-md hover:bg-orange-50 transition-colors"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Message
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center p-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                </button>
                <button
                  onClick={handleReport}
                  className="flex items-center p-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <Flag className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="p-6 border-t border-gray-200">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About Me</h2>
              <p className="text-gray-700 mb-6">{profile.bio || 'No bio available.'}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Basic Details</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Age</dt>
                      <dd className="text-gray-900">{profile.age} years</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Height</dt>
                      <dd className="text-gray-900">{profile.height || 'Not specified'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Location</dt>
                      <dd className="text-gray-900">{profile.location}</dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Professional Details</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Education</dt>
                      <dd className="text-gray-900">{profile.education}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Occupation</dt>
                      <dd className="text-gray-900">{profile.occupation}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Send Message to {profile.first_name}
              </h3>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
              ></textarea>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDetail;