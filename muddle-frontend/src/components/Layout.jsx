import React from 'react';
import NavBar from './NavBar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-emerald-100 text-emerald-900">
      {/* Header */}
      <header className="bg-emerald-500 text-white shadow-md">
        <nav className="container mx-auto flex flex-col md:flex-row items-center justify-between p-4">
          <NavBar />
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8 md:py-10 rounded-md mt-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-teal-100 text-center text-emerald-800 py-4 mt-10">
        &copy; 2025 Muddle. All rights reserved.
      </footer>
    </div>
  );
}
