import React from 'react';

export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top- right-2 text-gray-600 hover:text-gray-800 text-lg"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}
