import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useUser } from '../contexts/UserContext';
import { supabase } from '../lib/supabase';
import { User, Lock, Camera, Shield, Bell, Eye, UserPlus, LogOut } from 'lucide-react';

const Settings: React.FC = () => {
  const { user, signOut } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  
  const { 
    register, 
    handleSubmit, 
    setValue,
    formState: { errors } 
  } = useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
        } else {
          setProfile(data);
          
          // Set form values
          if (data) {
            Object.keys(data).forEach(key => {
              setValue(key, data[key]);
            });
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProfile();
  }, [user, setValue]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          ...data,
          updated_at: new Date()
        });

      if (error) {
        toast.error('Error updating profile: ' + error.message);
      } else {
        toast.success('Profile updated successfully!');
        setProfile({ ...profile, ...data });
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center">
                  <img
                    src={profile?.avatar_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'}
                    alt="Profile"
                    className="h-12 w-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {profile?.full_name || user?.email?.split('@')[0]}
                    </h2>
                    <p className="text-gray-500 text-sm">{user?.email}</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-4">
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center w-full px-3 py-2 rounded-md ${
                      activeTab === 'profile' 
                        ? 'bg-orange-100 text-orange-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <User className="h-5 w-5 mr-3" />
                    <span>Profile Information</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('photos')}
                    className={`flex items-center w-full px-3 py-2 rounded-md ${
                      activeTab === 'photos' 
                        ? 'bg-orange-100 text-orange-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Camera className="h-5 w-5 mr-3" />
                    <span>Photos</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('preferences')}
                    className={`flex items-center w-full px-3 py-2 rounded-md ${
                      activeTab === 'preferences' 
                        ? 'bg-orange-100 text-orange-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <UserPlus className="h-5 w-5 mr-3" />
                    <span>Partner Preferences</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('privacy')}
                    className={`flex items-center w-full px-3 py-2 rounded-md ${
                      activeTab === 'privacy' 
                        ? 'bg-orange-100 text-orange-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Eye className="h-5 w-5 mr-3" />
                    <span>Privacy Settings</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`flex items-center w-full px-3 py-2 rounded-md ${
                      activeTab === 'security' 
                        ? 'bg-orange-100 text-orange-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Shield className="h-5 w-5 mr-3" />
                    <span>Account Security</span>
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
                  </button>
                  
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-3 py-2 rounded-md text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md">
              {/* Profile Information Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
                    <p className="text-gray-600 mt-1">
                      Update your personal information and preferences
                    </p>
                  </div>
                  
                  <div className="p-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            id="full_name"
                            type="text"
                            {...register('full_name', { required: 'Full name is required' })}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                          />
                          {errors.full_name && (
                            <p className="mt-1 text-sm text-red-600">{errors.full_name.message as string}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                            Gender
                          </label>
                          <select
                            id="gender"
                            {...register('gender', { required: 'Gender is required' })}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                          {errors.gender && (
                            <p className="mt-1 text-sm text-red-600">{errors.gender.message as string}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
                            Date of Birth
                          </label>
                          <input
                            id="date_of_birth"
                            type="date"
                            {...register('date_of_birth', { required: 'Date of birth is required' })}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                          />
                          {errors.date_of_birth && (
                            <p className="mt-1 text-sm text-red-600">{errors.date_of_birth.message as string}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="marital_status" className="block text-sm font-medium text-gray-700 mb-1">
                            Marital Status
                          </label>
                          <select
                            id="marital_status"
                            {...register('marital_status', { required: 'Marital status is required' })}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                          >
                            <option value="">Select Marital Status</option>
                            <option value="never_married">Never Married</option>
                            <option value="divorced">Divorced</option>
                            <option value="widowed">Widowed</option>
                            <option value="awaiting_divorce">Awaiting Divorce</option>
                          </select>
                          {errors.marital_status && (
                            <p className="mt-1 text-sm text-red-600">{errors.marital_status.message as string}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                            Height (cm)
                          </label>
                          <input
                            id="height"
                            type="number"
                            min="120"
                            max="220"
                            {...register('height', { required: 'Height is required' })}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                          />
                          {errors.height && (
                            <p className="mt-1 text-sm text-red-600">{errors.height.message as string}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="religion" className="block text-sm font-medium text-gray-700 mb-1">
                            Religion
                          </label>
                          <select
                            id="religion"
                            {...register('religion', { required: 'Religion is required' })}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                          >
                            <option value="">Select Religion</option>
                            <option value="hindu">Hindu</option>
                            <option value="muslim">Muslim</option>
                            <option value="christian">Christian</option>
                            <option value="sikh">Sikh</option>
                            <option value="jain">Jain</option>
                            <option value="buddhist">Buddhist</option>
                            <option value="other">Other</option>
                          </select>
                          {errors.religion && (
                            <p className="mt-1 text-sm text-red-600">{errors.religion.message as string}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="mother_tongue" className="block text-sm font-medium text-gray-700 mb-1">
                            Mother Tongue
                          </label>
                          <select
                            id="mother_tongue"
                            {...register('mother_tongue', { required: 'Mother tongue is required' })}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                          >
                            <option value="">Select Mother Tongue</option>
                            <option value="hindi">Hindi</option>
                            <option value="tamil">Tamil</option>
                            <option value="telugu">Telugu</option>
                            <option value="marathi">Marathi</option>
                            <option value="bengali">Bengali</option>
                            <option value="gujarati">Gujarati</option>
                            <option value="kannada">Kannada</option>
                            <option value="malayalam">Malayalam</option>
                            <option value="punjabi">Punjabi</option>
                            <option value="urdu">Urdu</option>
                            <option value="other">Other</option>
                          </select>
                          {errors.mother_tongue && (
                            <p className="mt-1 text-sm text-red-600">{errors.mother_tongue.message as string}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">
                          About Me
                        </label>
                        <textarea
                          id="about"
                          rows={4}
                          {...register('about', { required: 'About me is required' })}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Tell us about yourself, your interests, and what you're looking for in a partner..."
                        ></textarea>
                        {errors.about && (
                          <p className="mt-1 text-sm text-red-600">{errors.about.message as string}</p>
                        )}
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number
                            </label>
                            <input
                              id="phone"
                              type="tel"
                              {...register('phone', { required: 'Phone number is required' })}
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                            {errors.phone && (
                              <p className="mt-1 text-sm text-red-600">{errors.phone.message as string}</p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                              Location
                            </label>
                            <input
                              id="location"
                              type="text"
                              {...register('location', { required: 'Location is required' })}
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                              placeholder="City, State"
                            />
                            {errors.location && (
                              <p className="mt-1 text-sm text-red-600">{errors.location.message as string}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Professional Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                              Highest Education
                            </label>
                            <select
                              id="education"
                              {...register('education', { required: 'Education is required' })}
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            >
                              <option value="">Select Education</option>
                              <option value="high_school">High School</option>
                              <option value="bachelors">Bachelor's Degree</option>
                              <option value="masters">Master's Degree</option>
                              <option value="doctorate">Doctorate</option>
                              <option value="other">Other</option>
                            </select>
                            {errors.education && (
                              <p className="mt-1 text-sm text-red-600">{errors.education.message as string}</p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="education_details" className="block text-sm font-medium text-gray-700 mb-1">
                              Education Details
                            </label>
                            <input
                              id="education_details"
                              type="text"
                              {...register('education_details')}
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                              placeholder="Degree, Institution"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
                              Occupation
                            </label>
                            <select
                              id="occupation"
                              {...register('occupation', { required: 'Occupation is required' })}
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            >
                              <option value="">Select Occupation</option>
                              <option value="private_sector">Private Sector</option>
                              <option value="government">Government/Public Sector</option>
                              <option value="business">Business/Self Employed</option>
                              <option value="doctor">Doctor</option>
                              <option value="engineer">Engineer</option>
                              <option value="teacher">Teacher</option>
                              <option value="other">Other</option>
                            </select>
                            {errors.occupation && (
                              <p className="mt-1 text-sm text-red-600">{errors.occupation.message as string}</p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="occupation_details" className="block text-sm font-medium text-gray-700 mb-1">
                              Occupation Details
                            </label>
                            <input
                              id="occupation_details"
                              type="text"
                              {...register('occupation_details')}
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                              placeholder="Job Title, Company"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="annual_income" className="block text-sm font-medium text-gray-700 mb-1">
                              Annual Income Range
                            </label>
                            <select
                              id="annual_income"
                              {...register('annual_income')}
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            >
                              <option value="">Prefer not to say</option>
                              <option value="0-300000">Up to 3 Lakhs</option>
                              <option value="300000-500000">3-5 Lakhs</option>
                              <option value="500000-700000">5-7 Lakhs</option>
                              <option value="700000-1000000">7-10 Lakhs</option>
                              <option value="1000000-1500000">10-15 Lakhs</option>
                              <option value="1500000-2000000">15-20 Lakhs</option>
                              <option value="2000000+">20+ Lakhs</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Lifestyle</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <label htmlFor="diet" className="block text-sm font-medium text-gray-700 mb-1">
                              Diet
                            </label>
                            <select
                              id="diet"
                              {...register('diet')}
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            >
                              <option value="">Select Diet</option>
                              <option value="veg">Vegetarian</option>
                              <option value="non_veg">Non-Vegetarian</option>
                              <option value="eggetarian">Eggetarian</option>
                              <option value="vegan">Vegan</option>
                              <option value="jain">Jain</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="smoking" className="block text-sm font-medium text-gray-700 mb-1">
                              Smoking
                            </label>
                            <select
                              id="smoking"
                              {...register('smoking')}
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            >
                              <option value="">Select Option</option>
                              <option value="never">Never</option>
                              <option value="occasionally">Occasionally</option>
                              <option value="regularly">Regularly</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="drinking" className="block text-sm font-medium text-gray-700 mb-1">
                              Drinking
                            </label>
                            <select
                              id="drinking"
                              {...register('drinking')}
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            >
                              <option value="">Select Option</option>
                              <option value="never">Never</option>
                              <option value="occasionally">Occasionally</option>
                              <option value="regularly">Regularly</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Family Information</h3>
                        <div>
                          <label htmlFor="family_details" className="block text-sm font-medium text-gray-700 mb-1">
                            Family Details
                          </label>
                          <textarea
                            id="family_details"
                            rows={3}
                            {...register('family_details')}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Tell us about your family background..."
                          ></textarea>
                        </div>
                      </div>
                      
                      <div className="mt-8 flex justify-end">
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              
              {/* Photos Tab */}
              {activeTab === 'photos' && (
                <div>
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Photos</h2>
                    <p className="text-gray-600 mt-1">
                      Upload and manage your profile photos
                    </p>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-800 mb-3">Profile Photo</h3>
                      <div className="flex items-center">
                        <div className="relative">
                          <img
                            src={profile?.avatar_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'}
                            alt="Profile"
                            className="h-24 w-24 rounded-full object-cover"
                          />
                          <button className="absolute bottom-0 right-0 bg-orange-500 text-white p-1 rounded-full">
                            <Camera className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="ml-6">
                          <p className="text-sm text-gray-600 mb-2">
                            Upload a clear, recent photo of yourself.
                          </p>
                          <button className="px-3 py-1 bg-orange-500 text-white text-sm rounded-md hover:bg-orange-600 transition-colors">
                            Upload New Photo
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-3">Additional Photos</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        You can upload up to 6 additional photos to showcase your personality and interests.
                      </p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {/* Placeholder for photos */}
                        {[1, 2, 3, 4, 5, 6].map((index) => (
                          <div key={index} className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center h-40">
                            <Camera className="h-8 w-8 text-gray-400 mb-2" />
                            <button className="text-sm text-orange-500 font-medium">
                              Upload Photo
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 text-sm text-gray-600">
                        <p>Photo Guidelines:</p>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>Photos should clearly show your face</li>
                          <li>Avoid group photos where it's hard to identify you</li>
                          <li>Photos should be recent (within the last year)</li>
                          <li>Maximum file size: 5MB per photo</li>
                          <li>Supported formats: JPG, PNG</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Partner Preferences Tab */}
              {activeTab === 'preferences' && (
                <div>
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Partner Preferences</h2>
                    <p className="text-gray-600 mt-1">
                      Specify your preferences for a potential partner
                    </p>
                  </div>
                  
                  <div className="p-6">
                    <form>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Age Range
                          </label>
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
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Height Range (cm)
                          </label>
                          <div className="flex items-center space-x-2">
                            <input 
                              type="number" 
                              min="120" 
                              max="220" 
                              placeholder="Min" 
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            <span>to</span>
                            <input 
                              type="number" 
                              min="120" 
                              max="220" 
                              placeholder="Max" 
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Marital Status
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="">Any Marital Status</option>
                            <option value="never_married">Never Married</option>
                            <option value="divorced">Divorced</option>
                            <option value="widowed">Widowed</option>
                            <option value="awaiting_divorce">Awaiting Divorce</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Religion
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="">Any Religion</option>
                            <option value="hindu">Hindu</option>
                            <option value="muslim">Muslim</option>
                            <option value="christian">Christian</option>
                            <option value="sikh">Sikh</option>
                            <option value="jain">Jain</option>
                            <option value="buddhist">Buddhist</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mother Tongue
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="">Any Language</option>
                            <option value="hindi">Hindi</option>
                            <option value="tamil">Tamil</option>
                            <option value="telugu">Telugu</option>
                            <option value="marathi">Marathi</option>
                            <option value="bengali">Bengali</option>
                            <option value="gujarati">Gujarati</option>
                            <option value="kannada">Kannada</option>
                            <option value="malayalam">Malayalam</option>
                            <option value="punjabi">Punjabi</option>
                            <option value="urdu">Urdu</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Education
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="">Any Education</option>
                            <option value="high_school">High School</option>
                            <option value="bachelors">Bachelor's Degree</option>
                            <option value="masters">Master's Degree</option>
                            <option value="doctorate">Doctorate</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Occupation
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="">Any Occupation</option>
                            <option value="private_sector">Private Sector</option>
                            <option value="government">Government/Public Sector</option>
                            <option value="business">Business/Self Employed</option>
                            <option value="doctor">Doctor</option>
                            <option value="engineer">Engineer</option>
                            <option value="teacher">Teacher</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Annual Income
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="">Any Income</option>
                            <option value="0-300000">Up to 3 Lakhs</option>
                            <option value="300000-500000">3-5 Lakhs</option>
                            <option value="500000-700000">5-7 Lakhs</option>
                            <option value="700000-1000000">7-10 Lakhs</option>
                            <option value="1000000-1500000">10-15 Lakhs</option>
                            <option value="1500000-2000000">15-20 Lakhs</option>
                            <option value="2000000+">20+ Lakhs</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Diet
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="">Any Diet</option>
                            <option value="veg">Vegetarian</option>
                            <option value="non_veg">Non-Vegetarian</option>
                            <option value="eggetarian">Eggetarian</option>
                            <option value="vegan">Vegan</option>
                            <option value="jain">Jain</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Smoking
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="">Any</option>
                            <option value="never">Never</option>
                            <option value="occasionally">Occasionally</option>
                            <option value="regularly">Regularly</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Drinking
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="">Any</option>
                            <option value="never">Never</option>
                            <option value="occasionally">Occasionally</option>
                            <option value="regularly">Regularly</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="">Any Location</option>
                            <option value="delhi">Delhi</option>
                            <option value="mumbai">Mumbai</option>
                            <option value="bangalore">Bangalore</option>
                            <option value="chennai">Chennai</option>
                            <option value="kolkata">Kolkata</option>
                            <option value="hyderabad">Hyderabad</option>
                            <option value="pune">Pune</option>
                            <option value="kochi">Kochi</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Additional Preferences
                        </label>
                        <textarea
                          rows={3}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Any other preferences you'd like to mention..."
                        ></textarea>
                      </div>
                      
                      <div className="mt-8 flex justify-end">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                        >
                          Save Preferences
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              
              {/* Privacy Settings Tab */}
              {activeTab === 'privacy' && (
                <div>
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Privacy Settings</h2>
                    <p className="text-gray-600 mt-1">
                      Control who can see your profile and contact you
                    </p>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Profile Visibility</h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="visibility_all"
                                name="visibility"
                                type="radio"
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                defaultChecked
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="visibility_all" className="font-medium text-gray-700">
                                Visible to all members
                              </label>
                              <p className="text-gray-500">
                                Your profile will be visible to all registered members.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="visibility_matches"
                                name="visibility"
                                type="radio"
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="visibility_matches" className="font-medium text-gray-700">
                                Visible to matches only
                              </label>
                              <p className="text-gray-500">
                                Only members who match your preferences will be able to see your profile.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="visibility_selected"
                                name="visibility"
                                type="radio"
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="visibility_selected" className="font-medium text-gray-700">
                                Visible to selected members
                              </label>
                              <p className="text-gray-500">
                                Only members you've approved can see your profile.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Contact Information Privacy</h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="contact_after_connect"
                                name="contact_privacy"
                                type="radio"
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                defaultChecked
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="contact_after_connect" className="font-medium text-gray-700">
                                Show after connection
                              </label>
                              <p className="text-gray-500">
                                Your contact information will be visible only after you accept a connection request.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="contact_always_hidden"
                                name="contact_privacy"
                                type="radio"
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="contact_always_hidden" className="font-medium text-gray-700">
                                Always hidden
                              </label>
                              <p className="text-gray-500">
                                Your contact information will never be visible. Communication will be through the platform only.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Photo Privacy</h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="photos_all"
                                name="photo_privacy"
                                type="radio"
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                defaultChecked
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="photos_all" className="font-medium text-gray-700">
                                Visible to all members
                              </label>
                              <p className="text-gray-500">
                                All your photos will be visible to all registered members.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="photos_after_connect"
                                name="photo_privacy"
                                type="radio"
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="photos_after_connect" className="font-medium text-gray-700">
                                Additional photos after connection
                              </label>
                              <p className="text-gray-500">
                                Your profile photo will be visible to all, but additional photos will only be visible after connection.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Online Status</h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="online_visible"
                                name="online_status"
                                type="radio"
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                defaultChecked
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="online_visible" className="font-medium text-gray-700">
                                Show when I'm online
                              </label>
                              <p className="text-gray-500">
                                Other members can see when you're active on the platform.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="online_hidden"
                                name="online_status"
                                type="radio"
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="online_hidden" className="font-medium text-gray-700">
                                Hide my online status
                              </label>
                              <p className="text-gray-500">
                                Your online status will be hidden from all members.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8 flex justify-end">
                        <button
                          type="button"
                          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                        >
                          Save Privacy Settings
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Account Security Tab */}
              {activeTab === 'security' && (
                <div>
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Account Security</h2>
                    <p className="text-gray-600 mt-1">
                      Manage your password and account security settings
                    </p>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Change Password</h3>
                        <form className="space-y-4">
                          <div>
                            <label htmlFor="current_password" className="block text-sm font-medium text-gray-700 mb-1">
                              Current Password
                            </label>
                            <input
                              id="current_password"
                              type="password"
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="new_password" className="block text-sm font-medium text-gray-700 mb-1">
                              New Password
                            </label>
                            <input
                              id="new_password"
                              type="password"
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                            <p className="mt-1 text-sm text-gray-500">
                              Password must be at least 8 characters and include uppercase, lowercase, number and special character.
                            </p>
                          </div>
                          
                          <div>
                            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 mb-1">
                              Confirm New Password
                            </label>
                            <input
                              id="confirm_password"
                              type="password"
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                          </div>
                          
                          <div>
                            <button
                              type="submit"
                              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                            >
                              Update Password
                            </button>
                          </div>
                        </form>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Two-Factor Authentication</h3>
                        <div className="bg-orange-50 p-4 rounded-md mb-4">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <Shield className="h-5 w-5 text-orange-600" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-orange-700">
                                Two-factor authentication adds an extra layer of security to your account. Once enabled, you'll need to provide a verification code in addition to your password when signing in.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <button
                          type="button"
                          className="px-4 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-50 transition-colors"
                        >
                          Enable Two-Factor Authentication
                        </button>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Login History</h3>
                        <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-500">
                            <div className="grid grid-cols-3">
                              <div>Date & Time</div>
                              <div>Device</div>
                              <div>Location</div>
                            </div>
                          </div>
                          <div className="divide-y divide-gray-200">
                            <div className="px-4 py-3 text-sm text-gray-700">
                              <div className="grid grid-cols-3">
                                <div>Today, 10:30 AM</div>
                                <div>Chrome on Windows</div>
                                <div>Mumbai, India</div>
                              </div>
                            </div>
                            <div className="px-4 py-3 text-sm text-gray-700">
                              <div className="grid grid-cols-3">
                                <div>Yesterday, 6:45 PM</div>
                                <div>Safari on iPhone</div>
                                <div>Mumbai, India</div>
                              </div>
                            </div>
                            <div className="px-4 py-3 text-sm text-gray-700">
                              <div className="grid grid-cols-3">
                                <div>May 15, 2023, 2:15 PM</div>
                                <div>Chrome on Windows</div>
                                <div>Mumbai, India</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Account Deactivation</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Temporarily deactivate your account. You can reactivate it anytime by signing in again.
                        </p>
                        <button
                          type="button"
                          className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors"
                        >
                          Deactivate Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Notification Settings</h2>
                    <p className="text-gray-600 mt-1">
                      Manage how and when you receive notifications
                    </p>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Email Notifications</h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="email_matches"
                                type="checkbox"
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                defaultChecked
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="email_matches" className="font-medium text-gray-700">
                                New Matches
                              </label>
                              <p className="text-gray-500">
                                Receive email notifications when you have new matches.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="email_messages"
                                type="checkbox"
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                defaultChecked
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="email_messages" className="font-medium text-gray-700">
                                New Messages
                              </label>
                              <p className="text-gray-500">
                                Receive email notifications when you have new messages.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="email_interests"
                                type="checkbox"
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                defaultChecked
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="email_interests" className="font-medium text-gray-700">
                                Interest Notifications
                              </label>
                              <p className="text-gray-500">
                                Receive email notifications when someone shows interest in your profile.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="email_profile_views"
                                type="checkbox"
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                defaultChecked
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="email_profile_views" className="font-medium text-gray-700">
                                Profile Views
                              </label>
                              <p className="text-gray-500">
                                Receive email notifications when someone views your profile.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="email_updates"
                                type="checkbox"
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                defaultChecked
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="email_updates" className="font-medium text-gray-700">
                                Platform Updates
                              </label>
                              <p className="text-gray-500">
                                Receive email notifications about new features and updates.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Push Notifications</h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="push_matches"
                                type="checkbox"
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                defaultChecked
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="push_matches" className="font-medium text-gray-700">
                                New Matches
                              </label>
                              <p className="text-gray-500">
                                Receive push notifications when you have new matches.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="push_messages"
                                type="checkbox"
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                defaultChecked
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="push_messages" className="font-medium text-gray-700">
                                New Messages
                              </label>
                              <p className="text-gray-500">
                                Receive push notifications when you have new messages.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="push_interests"
                                type="checkbox"
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                defaultChecked
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="push_interests" className="font-medium text-gray-700">
                                Interest Notifications
                              </label>
                              <p className="text-gray-500">
                                Receive push notifications when someone shows interest in your profile.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="push_profile_views"
                                type="checkbox"
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                defaultChecked
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="push_profile_views" className="font-medium text-gray-700">
                                Profile Views
                              </label>
                              <p className="text-gray-500">
                                Receive push notifications when someone views your profile.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Notification Frequency</h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="frequency_realtime"
                                name="notification_frequency"
                                type="radio"
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                defaultChecked
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="frequency_realtime" className="font-medium text-gray-700">
                                Real-time
                              </label>
                              <p className="text-gray-500">
                                Receive notifications as events happen.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="frequency_daily"
                                name="notification_frequency"
                                type="radio"
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="frequency_daily" className="font-medium text-gray-700">
                                Daily Digest
                              </label>
                              <p className="text-gray-500">
                                Receive a daily summary of all notifications.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="frequency_weekly"
                                name="notification_frequency"
                                type="radio"
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="frequency_weekly" className="font-medium text-gray-700">
                                Weekly Digest
                              </label>
                              <p className="text-gray-500">
                                Receive a weekly summary of all notifications.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8 flex justify-end">
                        <button
                          type="button"
                          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                        >
                          Save Notification Settings
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;