import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}


//Custom button componet
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-capitec-red text-white hover:bg-capitec-red-dark focus:ring-capitec-red disabled:bg-gray-300 disabled:cursor-not-allowed',
    secondary: 'bg-capitec-blue text-white hover:bg-capitec-blue-dark focus:ring-capitec-blue disabled:bg-gray-300 disabled:cursor-not-allowed',
    outline: 'bg-white text-capitec-red border-2 border-capitec-red hover:bg-capitec-red hover:text-white focus:ring-capitec-red disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed',
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
