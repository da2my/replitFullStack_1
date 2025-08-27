import React from 'react';

// Simple Button component that works across web and mobile
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false 
}) => {
  const baseStyles = {
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
  };

  const variantStyles = {
    primary: {
      backgroundColor: '#007AFF',
      color: 'white',
    },
    secondary: {
      backgroundColor: '#f0f0f0',
      color: '#333',
    },
  };

  return React.createElement(
    'button',
    {
      style: { ...baseStyles, ...variantStyles[variant] },
      onClick: disabled ? undefined : onClick,
      disabled,
    },
    children
  );
};

// Loading component
export interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export const Loading: React.FC<LoadingProps> = ({ 
  size = 'medium', 
  color = '#007AFF' 
}) => {
  const sizeMap = {
    small: 16,
    medium: 24,
    large: 32,
  };

  const spinnerSize = sizeMap[size];

  return React.createElement('div', {
    style: {
      width: spinnerSize,
      height: spinnerSize,
      border: `2px solid ${color}20`,
      borderTop: `2px solid ${color}`,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      display: 'inline-block',
    },
  });
};
