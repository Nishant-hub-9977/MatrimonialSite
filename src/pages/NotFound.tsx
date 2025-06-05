import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-orange-500">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-2 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link
          to="/"
          className="mt-8 inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
        >
          <Home className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;