import React from 'react';

interface UserAvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-14 h-14',
  xl: 'w-24 h-24',
};

export const UserAvatar: React.FC<UserAvatarProps> = ({ src, alt, size = 'md', className = '' }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-full object-cover flex-shrink-0 ${sizeClasses[size]} ${className}`}
    />
  );
};
