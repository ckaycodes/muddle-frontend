import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../api/api';
import { capitalizeFirstLetter } from '../utils/stringHelpers';
import BounceAnimation from '../components/BounceAnimation';

function HomePage() {
  const { isLoggedIn, user } = useAuth();

  return (
    <>
      <div className="min-h-screen  from-emerald-100 flex items-center justify-center px-4 pt-24">
        <div className="max-w-xl w-full bg-white rounded-md shadow-xl p-2 text-center">
          {/* Logo & Title */}
          <div className="mb-2">
            
            {/* Issues with Tailwind import, wrote bounce animation in React*/}
            <BounceAnimation> 
            <img src="/Muddle.png" alt="Muddle Logo" className="mx-auto w-40 sm:w-40 md:w-44 lg:w-56 h-auto mb-4 max-w-full" />
            </BounceAnimation>
            <h1 className="text-4xl font-extrabold text-emerald-700">
        
            </h1>
            {isLoggedIn && user && (
              <div className="mt-4">
                <p className="text-emerald-800 text-lg">
                  Hello, {capitalizeFirstLetter(user.sub)} 👋
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
