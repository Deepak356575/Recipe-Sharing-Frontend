import React, { useState } from 'react';
import axios from 'axios';

export default function InputForm({ setIsOpen }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let endpoint = isSignUp ? 'signUp' : 'login';
    
    await axios
      .post(`https://recipe-sharing-iw23.onrender.com/${endpoint}`, { email, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setIsOpen();
      })
      .catch((data) => setError(data.response?.data?.error));
  };

  return (
    <div className="flex justify-center items-center  bg-gray-100">
      <form onSubmit={handleOnSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">{isSignUp ? 'Sign Up' : 'Login'}</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-200"
        >
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>

        <p
          onClick={() => setIsSignUp((prev) => !prev)}
          className="text-blue-500 text-sm text-center mt-3 cursor-pointer hover:underline"
        >
          {isSignUp ? 'Already have an account? Login' : 'Create a new account'}
        </p>
      </form>
    </div>
  );
}
