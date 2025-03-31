import React from 'react';

const FormField = ({ label, placeholder, type = "text", required }) => (
  <div>
    <label className="block mb-2">
      <span className="text-gray-700">
        {required && <span className="text-red-500">*</span>} {label}
      </span>
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-700 focus:border-transparent outline-none"
    />
  </div>
);

export default FormField;