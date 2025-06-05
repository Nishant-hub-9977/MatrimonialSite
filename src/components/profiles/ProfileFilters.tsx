import React, { useState } from 'react';
import { Filter, ChevronDown, Search } from 'lucide-react';
import type { ProfileFilter } from '../../hooks/useProfiles';

interface ProfileFiltersProps {
  onApplyFilters: (filters: ProfileFilter) => void;
}

const ProfileFilters: React.FC<ProfileFiltersProps> = ({ onApplyFilters }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ProfileFilter>({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleApply = () => {
    onApplyFilters(filters);
    setShowFilters(false);
  };

  const handleReset = () => {
    setFilters({});
    setSearchTerm('');
    onApplyFilters({});
    setShowFilters(false);
  };

  const handleSearch = () => {
    if (searchTerm) {
      onApplyFilters({
        ...filters,
        location: searchTerm,
        occupation: searchTerm,
        education: searchTerm,
      });
    }
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Browse Profiles</h1>
          <p className="text-gray-600">Discover potential matches based on your preferences</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search profiles..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
            <ChevronDown className={`h-5 w-5 ml-1 transform ${showFilters ? 'rotate-180' : ''} transition-transform`} />
          </button>
        </div>
      </div>
      
      {showFilters && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter Profiles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age Range</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  min="18" 
                  max="70" 
                  placeholder="Min" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={filters.ageMin || ''}
                  onChange={(e) => setFilters({ ...filters, ageMin: parseInt(e.target.value) || undefined })}
                />
                <span>to</span>
                <input 
                  type="number" 
                  min="18" 
                  max="70" 
                  placeholder="Max" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={filters.ageMax || ''}
                  onChange={(e) => setFilters({ ...filters, ageMax: parseInt(e.target.value) || undefined })}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={filters.location || ''}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              >
                <option value="">Any Location</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={filters.education || ''}
                onChange={(e) => setFilters({ ...filters, education: e.target.value })}
              >
                <option value="">Any Education</option>
                <option value="High School">High School</option>
                <option value="Bachelor">Bachelor's Degree</option>
                <option value="Master">Master's Degree</option>
                <option value="Doctorate">Doctorate</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={filters.occupation || ''}
                onChange={(e) => setFilters({ ...filters, occupation: e.target.value })}
              >
                <option value="">Any Occupation</option>
                <option value="IT Professional">IT Professional</option>
                <option value="Doctor">Doctor</option>
                <option value="Engineer">Engineer</option>
                <option value="Business">Business</option>
                <option value="Teacher">Teacher</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-2">
            <button 
              onClick={handleReset}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            <button 
              onClick={handleApply}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileFilters;