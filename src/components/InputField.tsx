import React, { useState } from 'react';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'password';
}

const sizeClasses = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
};

const variantClasses = {
  filled: 'bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded',
  outlined: 'bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-600 rounded',
  ghost: 'bg-transparent border-b border-gray-400 dark:border-gray-600 rounded-none',
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  onClear,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = 'outlined',
  size = 'md',
  type = 'text',
}) => {
  const [inputType, setInputType] = useState(type);

  const togglePassword = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  return (
    <div className="flex flex-col mb-4">
     {label && (
  <label className="mb-1 font-medium text-gray-400 dark:text-gray-500">
    {label}
  </label>
)}


      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={invalid}
          aria-describedby={helperText || errorMessage ? `${label}-helper` : undefined}
          className={`
            w-full
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            ${invalid ? 'border-red-500 dark:border-red-400' : ''}
            ${disabled ? 'bg-gray-200 dark:bg-gray-600 cursor-not-allowed text-gray-400 dark:text-gray-300' : 'focus:outline-none focus:ring-2 focus:ring-blue-500'}
            text-gray-900 dark:text-gray-100
          `}
        />

       
        {value && onClear && !disabled && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
          >
            ✕
          </button>
        )}

      
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
          >
            {inputType === 'password' ? '👁️' : '🙈'}
          </button>
        )}
      </div>

      
      <p
        id={`${label}-helper`}
        className={`mt-1 text-sm ${
          invalid ? 'text-red-500 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
        }`}
      >
        {invalid ? errorMessage : helperText}
      </p>
    </div>
  );
};

