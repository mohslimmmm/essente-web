import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-essente-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Access Denied
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          You do not have permission to view this page.
        </p>
        <div className="mt-6 text-center">
            <Link to="/" className="font-medium text-essente-gold hover:text-black">
                Return to Home
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
