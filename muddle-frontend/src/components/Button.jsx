import React from 'react';

export default function Button({ type = 'button', onClick, disabled, children }) {
  return (
    <button
        type={type} // What type of button
        onClick={onClick} // Operation to be ran on click
        disabled={disabled} // Disables button while submitting 
        className="
            bg-emerald-600 
            text-white 
            px-6 py-3 
            rounded-lg 
            hover:bg-emerald-700 
            disabled:opacity-50 
            transition ease-in-out duration-300 
            shadow-md hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2
            uppercase tracking-wide
        "
        >
     { children}
    </button>
  );
}
