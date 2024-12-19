import React from 'react'

export default function Modal({children, onClose}) {
    return (
        <>
          <div 
            className=" fixed inset-0 bg-gray-800 bg-opacity-50 z-50"
            onClick={onClose}
          ></div>
          <dialog 
            className=" fixed inset-0 m-auto w-full max-w-lg p-6 bg-white rounded-lg shadow-lg z-50 overflow-auto"
            open
          >
            {children}
          </dialog>
        </>
      );
    }      