import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-8 w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl transition-shadow hover:shadow-2xl ${className}`}>
      {children}
    </div>
  );
};

export default Card;
