import React, { useState } from 'react'
import axios from 'axios'

export default function InputForm({ setIsOpen }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("") // New state for username
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState("")

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    let endpoint = (isSignUp) ? "user/signUp" : "user/login"
    
    // Prepare the payload with the username for sign-up
    const payload = isSignUp ? { email, password, username } : { email, password }
    
    await axios.post(`http://localhost:5000/${endpoint}`, payload)
      .then((res) => {
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("user", JSON.stringify(res.data.user))
        localStorage.setItem("username", res.data.user.username) // Store the username
        setIsOpen()
      })
      .catch(data => setError(data.response?.data?.error))
  }

  return (
    <>
      <form className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg" onSubmit={handleOnSubmit}>
        {isSignUp && (
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-semibold">Username</label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-semibold">Email</label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-semibold">Password</label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          {isSignUp ? "Sign Up" : "Login"}
        </button><br />

        {error !== "" && <h6 className="text-red-500 text-center mt-2">{error}</h6>}<br />

        <p
          onClick={() => setIsSignUp(prev => !prev)}
          className="text-center text-indigo-600 cursor-pointer hover:underline mt-4"
        >
          {isSignUp ? "Already have an account" : "Create new account"}
        </p>
      </form>
    </>
  );
}
