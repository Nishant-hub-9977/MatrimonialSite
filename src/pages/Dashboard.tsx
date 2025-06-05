import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Heart, MessageCircle, Bell, User, Settings, Search } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useStore } from '../store';
import { fetchProfile, fetchNotifications, fetchUnreadMessages } from '../utils/supabase';

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = React.useState('matches');
  const { profile, setProfile, setNotifications, setMessages } = useStore();

  const { data: profileData, isLoading: isProfileLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => fetchProfile(user?.id || ''),
    enabled: !!user?.id,
  });

  const { data: notificationsCount } = useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: () => fetchNotifications(user?.id || ''),
    enabled: !!user?.id,
  });

  const { data: messagesCount } = useQuery({
    queryKey: ['messages', user?.id],
    queryFn: () => fetchUnreadMessages(user?.id || ''),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (profileData) {
      setProfile(profileData);
    }
    if (notificationsCount) {
      setNotifications(notificationsCount);
    }
    if (messagesCount) {
      setMessages(messagesCount);
    }
  }, [profileData, notificationsCount, messagesCount]);

  if (isProfileLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
                    alt="Profile"
                    className="h-24 w-24 rounded-full object-cover border-4 border-orange-100"
                  />
                  <span className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-green-500 border-2 border-white"></span>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-800">
                  {profile?.name || user?.email?.split('@')[0]}
                </h2>
                <p className="text-gray-500 text-sm">
                  {profile?.location || 'Location not set'}
                </p>
                
                <div className="mt-6 w-full">
                  <div className="bg-orange-100 rounded-full h-4 w-full">
                    <div 
                      className="bg-orange-500 rounded-full h-4" 
                      style={{ width: `${profile?.profile_completion || 30}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 text-center">
                    Profile Completion: {profile?.profile_completion || 30}%
                  </p>
                </div>
                
                <Link
                  to="/settings"
                  className="mt-6 w-full px-4 py-2 bg-orange-500 text-white text-center rounded-md hover:bg-orange-600 transition-colors"
                >
                  Complete Your Profile
                </Link>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Dashboard</h3>
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('matches')}
                    className={`flex items-center w-full px-3 py-2 rounded-md ${
                      activeTab === 'matches' 
                        ? 'bg-orange-100 text-orange-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Heart className="h-5 w-5 mr-3" />
                    <span>Matches</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('messages')}
                    className={`flex items-center w-full px-3 py-2 rounded-md ${
                      activeTab === 'messages' 
                        ? 'bg-orange-100 text-orange-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <MessageCircle className="h-5 w-5 mr-3" />
                    <span>Messages</span>
                    {messagesCount > 0 && (
                      <span className="ml-auto bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {messagesCount}
                      </span>
                    )}
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`flex items-center w-full px-3 py-2 rounded-md ${
                      activeTab === 'notifications' 
                        ? 'bg-orange-100 text-orange-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Bell className="h-5 w-5 mr-3" />
                    <span>Notifications</span>
                    {notificationsCount > 0 && (
                      <span className="ml-auto bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {notificationsCount}
                      </span>
                    )}
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('search')}
                    className={`flex items-center w-full px-3 py-2 rounded-md ${
                      activeTab === 'search' 
                        ? 'bg-orange-100 text-orange-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Search className="h-5 w-5 mr-3" />
                    <span>Search</span>
                  </button>
                  
                  <Link
                    to="/settings"
                    className="flex items-center w-full px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <Settings className="h-5 w-5 mr-3" />
                    <span>Settings</span>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Matches Tab */}
            {activeTab === 'matches' && (
              <div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Matches</h2>
                  <p className="text-gray-600">
                    Based on your preferences and compatibility, we'll show your potential matches here.
                  </p>
                </div>
                
                <div className="text-center py-8">
                  <p className="text-gray-600">No matches found yet. Complete your profile to get matched!</p>
                </div>
              </div>
            )}
            
            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
                </div>
                
                <div className="p-6 text-center">
                  <p className="text-gray-500">No messages yet</p>
                </div>
              </div>
            )}
            
            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
                </div>
                
                <div className="p-6 text-center">
                  <p className="text-gray-500">No notifications</p>
                </div>
              </div>
            )}
            
            {/* Search Tab */}
            {activeTab === 'search' && (
              <div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Search Profiles</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Age Range</label>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="number" 
                          min="18" 
                          max="70" 
                          placeholder="Min" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <span>to</span>
                        <input 
                          type="number" 
                          min="18" 
                          max="70" 
                          placeholder="Max" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="">Any Location</option>
                        <option value="delhi">Delhi</option>
                        <option value="mumbai">Mumbai</option>
                        <option value="bangalore">Bangalore</option>
                        <option value="chennai">Chennai</option>
                        <option value="kolkata">Kolkata</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="">Any Religion</option>
                        <option value="hindu">Hindu</option>
                        <option value="muslim">Muslim</option>
                        <option value="christian">Christian</option>
                        <option value="sikh">Sikh</option>
                        <option value="jain">Jain</option>
                        <option value="buddhist">Buddhist</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <button className="px-6 py-2 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-colors">
                      Search Profiles
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;