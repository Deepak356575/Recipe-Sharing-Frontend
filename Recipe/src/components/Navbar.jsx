import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import InputForm from './InputForm'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const [isOpen,setIsOpen]=useState(false)
  let token=localStorage.getItem("token")
  const [isLogin,setIsLogin]=useState(token ? false : true)
  let user=JSON.parse(localStorage.getItem("user"))

  useEffect(()=>{
    setIsLogin(token ? false : true)
  },[token])

  const checkLogin=()=>{
    if(token){
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setIsLogin(true)

    }
    else{
      setIsOpen(true)
    }
  }

  const getEmailUsername = (email) => {
    return email?.split('@')[0];  // Splitting the email at '@' and returning the first part
  }

  return (
    <>
      <header className="bg-gray-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <h2 className="text-2xl font-bold text-green-400">Food Blog</h2>
  
          {/* Navigation Links */}
          <ul className="flex items-center space-x-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400 font-semibold"
                    : "text-gray-300 hover:text-green-400 transition-colors"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={!isLogin ? "/myRecipe" : "/"}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400 font-semibold"
                    : "text-gray-300 hover:text-green-400 transition-colors"
                }
                onClick={() => isLogin && setIsOpen(true)}
              >
                My Recipe
              </NavLink>
            </li>
            <li>
              <NavLink
                to={!isLogin ? "/favRecipe" : "/"}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400 font-semibold"
                    : "text-gray-300 hover:text-green-400 transition-colors"
                }
                onClick={() => isLogin && setIsOpen(true)}
              >
                Favourites
              </NavLink>
            </li>
            <li>
              <p
                className="cursor-pointer text-gray-300 hover:text-green-400 transition-colors"
                onClick={checkLogin}
              >
                {isLogin ? "Login" : "Logout"}
                {user?.email ? ` "${getEmailUsername(user?.email)}"` : ""}
              </p>
            </li>
          </ul>
        </div>
      </header>
  
      {/* Modal */}
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
} 