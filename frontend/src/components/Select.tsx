import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  helperText,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-capitec-gray-700 mb-2">
        {label}
        {props.required && <span className="text-capitec-red ml-1">*</span>}
      </label>
      <select
        className={`
          w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
          bg-white appearance-none cursor-pointer
          ${error 
            ? 'border-capitec-red focus:border-capitec-red focus:ring-2 focus:ring-capitec-red/20' 
            : 'border-capitec-gray-300 focus:border-capitec-blue focus:ring-2 focus:ring-capitec-blue/20'
          }
          disabled:bg-capitec-gray-100 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-capitec-red">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-capitec-gray-500">{helperText}</p>
      )}
    </div>
  );
};
