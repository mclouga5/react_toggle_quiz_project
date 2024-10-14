import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?:  boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size = 'medium',
  className,
  disabled = false,
  ...props
}) => {

  const baseStyles = 'rounded-full border transition duration-300 ease-in-out focus:outline-none focus:ring-2 p-2';

  const variantStyles = {
    primary: 'bg-gray-400 border-gray-500 hover:bg-gray-500 focus:ring-gray-500',
    secondary: 'bg-gray-500 border-gray-600 text-white hover:bg-gray-600 focus:ring-gray-500',
    danger: 'bg-red-500 border-red-600 text-white hover:bg-red-600 focus:ring-red-500',
  };

  const sizeStyles = {
    small: 'py-1 px-2 text-sm',
    medium: 'py-2 px-4 text-lg',
    large: 'py-3 px-6 text-xl',
  };

  const disabledStyles = 'bg-gray-400 border-gray-500 text-gray-200 cursor-not-allowed opacity-50';

  const combinedStyles = `${baseStyles} ${disabled ? disabledStyles : variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button
        className={combinedStyles}
        disabled={disabled}
        {...props}
    >
      {label}
    </button>
  );
};

export default Button;
