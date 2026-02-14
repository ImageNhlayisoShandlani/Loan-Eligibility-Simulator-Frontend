import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-capitec-gray-700 mb-2">
        {label}
        {props.required && <span className="text-capitec-red ml-1">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-capitec-gray-400">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
            ${icon ? 'pl-10' : ''}
            ${error 
              ? 'border-capitec-red focus:border-capitec-red focus:ring-2 focus:ring-capitec-red/20' 
              : 'border-capitec-gray-300 focus:border-capitec-blue focus:ring-2 focus:ring-capitec-blue/20'
            }
            disabled:bg-capitec-gray-100 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-capitec-red">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-capitec-gray-500">{helperText}</p>
      )}
    </div>
  );
};
