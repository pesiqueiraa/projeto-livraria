import React from 'react';

interface FormErrorProps {
  message?: string;
  id?: string;
}

const FormError: React.FC<FormErrorProps> = ({ message, id }) => {
  if (!message) return null;
  return (
    <div
      id={id}
      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-2 text-sm"
      aria-live="assertive"
      role="alert"
    >
      {message}
    </div>
  );
};

export default FormError;
