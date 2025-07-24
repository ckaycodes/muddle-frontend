import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../api/api';
import { capitalizeFirstLetter } from '../utils/stringHelpers';

function HomePage() {
  const { isLoggedIn, user } = useAuth();

  return (
    <>
      <div className="min-h-screen bg-emerald-100 flex items-center justify-center px-4 pt-24">
        <div className="max-w-xl w-full bg-white rounded-md shadow-xl p-2 text-center">
          {/* Logo & Title */}
          <div className="mb-2">
            <img src="/Muddle.png" alt="Muddle Logo" className="mx-auto w-50 sm:w-40 md:w-44 lg:w-52 h-auto mb-2 max-w-full" />
            <h1 className="text-4xl font-extrabold text-emerald-700">
        
            </h1>
            {isLoggedIn && user && (
              <p className="mt-2 text-gray-600 text-lg">
                Hello, {capitalizeFirstLetter(user.sub)} 👋
              </p>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
