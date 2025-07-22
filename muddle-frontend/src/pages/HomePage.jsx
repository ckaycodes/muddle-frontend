import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../api/api';
import { capitalizeFirstLetter } from '../utils/stringHelpers';

function HomePage() {
  const { isLoggedIn, user } = useAuth();

  return (
    <>
      <div className="min-h-screen bg-emerald-100 flex items-center justify-center px-4 pt-24">
        <div className="max-w-3xl w-full bg-white rounded-xl shadow-md p-8 text-center">
          {/* Logo & Title */}
          <div className="mb-6">
            <img src="/logo.png" alt="Muddle Logo" className="mx-auto h-16 mb-2" />
            <h1 className="text-4xl font-extrabold text-emerald-700">
              Welcome to Muddle!
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
