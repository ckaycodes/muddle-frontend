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
      <div className="flex items-center justify-between ">
        <Link to="/" className="text-xl font-bold">
        <img src="/MintLeaf.png" alt="Mint Leaf" className="w-15 h-20" />
        
        </Link>
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Links */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:flex md:items-center md:space-x-6 mt-4 md:mt-0 bg-emerald-700 p-4 rounded-md space-y-2 md:space-y-0 shadow-md`}
      >

        {isLoggedIn ? (
          <>
            <Link to="/stories" className="block mt-2 md:mt-0 hover:text-emerald-200">
              Stories
            </Link>
            <Link to="/profileList" className="block mt-2 md:mt-0 hover:text-emerald-200">
            Philz Pham 
            </Link> 
            <button onClick={logout} className="block mt-2 md:mt-0 hover:text-emerald-200">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="block mt-2 md:mt-0 hover:text-emerald-200">
              Register
            </Link>
            <Link to="/login" className="block mt-2 md:mt-0 hover:text-emerald-200">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
