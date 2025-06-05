import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Shield, Heart } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div 
          className="bg-cover bg-center h-[500px]" 
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')",
            backgroundPosition: "center 30%"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/70 to-orange-700/50"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Find Your Perfect Life Partner
              </h1>
              <p className="text-xl text-white mb-8">
                Connecting hearts with tradition and technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="px-6 py-3 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-colors text-center"
                >
                  Register Free
                </Link>
                <Link
                  to="/profiles"
                  className="px-6 py-3 bg-white text-orange-600 font-medium rounded-md hover:bg-gray-100 transition-colors text-center"
                >
                  Browse Profiles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose SoulMate</h2>
            <p className="mt-4 text-xl text-gray-600">
              We blend tradition with technology to help you find your perfect match
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-orange-50 p-6 rounded-lg text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 text-orange-600 mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Profiles</h3>
              <p className="text-gray-600">
                All profiles undergo a thorough verification process to ensure authenticity.
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 text-orange-600 mb-4">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Matching</h3>
              <p className="text-gray-600">
                Our AI-powered algorithm finds matches based on your preferences and compatibility.
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 text-orange-600 mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Privacy Control</h3>
              <p className="text-gray-600">
                You decide who sees your profile and how much information to share.
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 text-orange-600 mb-4">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Success Stories</h3>
              <p className="text-gray-600">
                Thousands of happy couples have found their perfect match through our platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600">
              Finding your life partner is just a few steps away
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 text-orange-600 mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Your Profile</h3>
              <p className="text-gray-600">
                Register and create a detailed profile highlighting your background, interests, and preferences.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 text-orange-600 mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Discover Matches</h3>
              <p className="text-gray-600">
                Browse through curated matches based on your preferences and compatibility factors.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 text-orange-600 mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect & Meet</h3>
              <p className="text-gray-600">
                Initiate conversations with potential matches and take the next step towards a beautiful relationship.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/register"
              className="px-6 py-3 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-colors inline-block"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Join thousands of happy couples who found their perfect match on SoulMate.
          </p>
          <Link
            to="/register"
            className="px-8 py-4 bg-white text-orange-600 font-medium rounded-md hover:bg-gray-100 transition-colors inline-block text-lg"
          >
            Create Your Profile Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;