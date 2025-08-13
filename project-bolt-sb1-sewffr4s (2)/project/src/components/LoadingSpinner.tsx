import React from 'react';
import { BookOpen } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <BookOpen className="h-16 w-16 text-red-600 mx-auto mb-4 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-red-600"></div>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading...</h2>
        <p className="text-gray-600">Please wait while we prepare your learning experience</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;