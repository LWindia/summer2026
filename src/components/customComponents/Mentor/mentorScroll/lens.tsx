import React, { useState, ReactNode } from 'react';

interface LensProps {
  children: ReactNode;
  hovering: boolean;
  setHovering: (isHovering: boolean) => void;
}

export const Lens: React.FC<LensProps> = ({ 
  children, 
  hovering, 
  setHovering 
}) => {
  return (
    <div 
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="relative group"
    >
      {children}
      {/* Optional: Add a hover effect overlay */}
      <div 
        className={`
          absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 
          transition-opacity duration-300 rounded-2xl
          ${hovering ? 'opacity-100' : 'opacity-0'}
        `}
      />
    </div>
  );
};

// Optional: Custom hook for managing hover state
export const useLensHover = (initialState: boolean = false) => {
  const [hovering, setHovering] = useState(initialState);
  
  const handleHoverChange = (isHovering: boolean) => {
    setHovering(isHovering);
  };

  return {
    hovering,
    handleHoverChange
  };
};