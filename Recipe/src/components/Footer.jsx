import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Imaginary Engineering. All rights reserved.
            </p>
          </div>
        </footer>
      );
}     