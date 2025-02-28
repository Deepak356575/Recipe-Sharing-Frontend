import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center py-6">
     
      <div className="mb-4">
        <a href="/" className="mx-3 hover:underline">Home</a>
        <a href="/myRecipe" className="mx-3 hover:underline">Recipes</a>
        <a href="/favRecipe" className="mx-3 hover:underline">Favourite</a>
      </div>

      
      <div className="flex justify-center space-x-4 mb-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-xl hover:text-blue-500" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-xl hover:text-blue-400" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-xl hover:text-pink-500" />
        </a>
      </div>

      
      <div className="text-sm">
        <p><FaEnvelope className="inline mr-2" /> Ozbourne@contact.com</p>
        <p><FaPhone className="inline mr-2" /> 9876543210</p>
      </div>

      
      <p className="text-sm mt-4">&copy; {new Date().getFullYear()} Ozbourne Engineering. All rights reserved.</p>
    </footer>
  );
}
