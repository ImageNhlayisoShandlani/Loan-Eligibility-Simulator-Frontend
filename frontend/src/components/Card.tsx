import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  subtitle,
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg border border-capitec-gray-200 overflow-hidden ${className}`}>
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-capitec-gray-200 bg-capitec-gray-50">
          {title && (
            <h3 className="text-xl font-bold text-capitec-gray-900">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-capitec-gray-600 mt-1">{subtitle}</p>
          )}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
