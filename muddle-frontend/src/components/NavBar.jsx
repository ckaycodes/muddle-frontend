import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Menu, X } from 'lucide-react'; // assuming you're using lucide-react for icons

function NavBar() {
  const { isLoggedIn, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

//TODO : Add "Logged in as" next to title(?)

  return (
    <nav className="bg-emerald-600 text-white p-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          Muddle
        </Link>
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Links */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:flex md:items-center md:space-x-6 mt-4 md:mt-0`}
      >

        {isLoggedIn ? (
          <>
            <Link to="/stories" className="block mt-2 md:mt-0 hover:text-muddleGreen-300">
              Stories
            </Link>
            <Link to="/profileList" className="block mt-2 md:mt-0 hover:text-muddleGreen-300">
            Philz Pham 
            </Link> 
            <button onClick={logout} className="block mt-2 md:mt-0 hover:text-muddleGreen-300">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="block mt-2 md:mt-0 hover:text-muddleGreen-300">
              Register
            </Link>
            <Link to="/login" className="block mt-2 md:mt-0 hover:text-muddleGreen-300">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
