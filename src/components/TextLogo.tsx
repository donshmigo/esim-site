import React from 'react';

interface TextLogoProps {
  className?: string;
  inverted?: boolean;
}

export const TextLogo: React.FC<TextLogoProps> = ({ className = '', inverted = false }) => {
  const textColor = inverted ? 'text-white' : 'text-romio-black';
  
  return (
    <span className={`${textColor} font-extrabold tracking-tight ${className}`}>
      Romio.
    </span>
  );
};

export default TextLogo; 