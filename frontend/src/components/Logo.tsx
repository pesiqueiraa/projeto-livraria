import React from 'react';
import { BookOpen } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  colorMode?: 'light' | 'dark'; // novo prop para cor
  size?: number; // novo prop para responsividade
}

const Logo: React.FC<LogoProps> = ({ className = '', showText = true, colorMode = 'light', size = 32 }) => {
  // Define cor do ícone e texto conforme o modo
  const iconColor = colorMode === 'dark' ? 'text-white' : 'text-blue-600';
  const textColor = colorMode === 'dark' ? 'text-white' : 'text-gray-800';

  return (
    <div className={`flex items-center justify-center select-none ${className}`} aria-label="Logo da Livraria">
      <BookOpen className={`${iconColor} mr-2`} size={size} aria-hidden="true" />
      {showText && (
        <span className={`text-2xl font-bold ${textColor}`}>Livraria</span>
      )}
    </div>
  );
};

export default Logo;
