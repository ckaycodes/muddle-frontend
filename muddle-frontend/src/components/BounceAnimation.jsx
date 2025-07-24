import React, { useState, useEffect } from 'react';

const bounceKeyframes = `
@keyframes bounceOnce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-25%);
  }
}
`;

function BounceAnimation({ children }) {
  const [isBouncing, setIsBouncing] = useState(true);

  useEffect(() => {
    // Smooth bounce animation
    const timer = setTimeout(() => setIsBouncing(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{bounceKeyframes}</style>
      <div
        style={{
          display: 'inline-block',
          animation: isBouncing ? 'bounceOnce 1s ease-in-out forwards' : 'none',
        }}
      >
        {children}
      </div>
    </>
  );
}

export default BounceAnimation;