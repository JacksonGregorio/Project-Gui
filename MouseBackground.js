import React, { useState, useEffect } from 'react';
import './MouseBackground.css';

const MouseBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const offsetX = e.clientX - window.innerWidth / 2;
    const offsetY = e.clientY - window.innerHeight / 2;
    setMousePosition({ x: offsetX / 1, y: offsetY / 1 }); // Adjust the divisor as needed
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const backgroundImageStyle = {
    position: 'fixed',
    top: `${mousePosition.y}px`,
    left: `${mousePosition.x}px`,
    transform: 'translate(585%, 360%)', // Center the background image on the cursor more accurately
    cursor: 'none',
    width: '8%', // Make sure the image doesn't get cropped
    height: '12%', // Make sure the image doesn't get cropped
    objectFit: 'cover', // Maintain aspect ratio while covering the entire area
    cursor:'none'
    
  };

  return (
    <span className="background-image" style={backgroundImageStyle}>
    </span>
  );
};

export default MouseBackground;