import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Menu, X, User, Settings, LogOut } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

const Navbar: React.FC = () => {
  const { user, signOut } = useUser();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Heart className="h-8 w-8 text-red-500" />
              <span className="ml-2 text-xl font-bold text-gray-800">SoulMate</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-orange-600">
              Home
            </Link>
            <Link to="/profiles" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-orange-600">
              Profiles
            </Link>
            {user ? (
              <div className="relative ml-3">
                <div>
                  <button
                    onClick={toggleProfileMenu}
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-orange-600 focus:outline-none"
                  >
                    <span className="mr-2">{user.email?.split('@')[0]}</span>
                    <User className="h-5 w-5" />
                  </button>
                </div>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </div>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-orange-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md text-sm font-medium bg-orange-500 text-white hover:bg-orange-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/profiles"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600"
              onClick={toggleMenu}
            >
              Profiles
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600"
                  onClick={toggleMenu}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    toggleMenu();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-orange-500 text-white hover:bg-orange-600"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;