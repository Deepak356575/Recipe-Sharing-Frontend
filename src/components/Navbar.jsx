import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Modal from './Modal';
import InputForm from './InputForm';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  let token = localStorage.getItem('token');
  const [isLogin, setIsLogin] = useState(token ? false : true);
  let user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    setIsLogin(token ? false : true);
  }, [token]);

  const checkLogin = () => {
    if (token) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsLogin(true);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <header className="bg-violet-600 text-white p-4 flex justify-between items-center shadow-md">
        <h2 className="text-2xl font-bold">Ozbourne``</h2>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        <ul
          className={`absolute  top-16 left-0 w-full md:w-auto md:flex md:items-center md:space-x-6 bg-violet-600 md:bg-transparent text-white flex-col md:flex-row md:static transition-transform duration-300 ease-in-out ${menuOpen ? 'flex' : 'hidden'} md:flex`}
        >
          <li>
            <NavLink to="/" className="block p-4 md:p-0 hover:underline">
              Home
            </NavLink>
          </li>
          <li onClick={() => isLogin && setIsOpen(true)}>
            <NavLink to={!isLogin ? '/myRecipe' : '/'} className="block p-4 md:p-0 hover:underline">
              My Recipe
            </NavLink>
          </li>
          <li onClick={() => isLogin && setIsOpen(true)}>
            <NavLink to={!isLogin ? '/favRecipe' : '/'} className="block p-4 md:p-0 hover:underline">
              Favourites
            </NavLink>
          </li>
          <li className="block p-4 md:p-0">
            <button onClick={checkLogin} className="bg-white text-violet-600 px-4 py-2 rounded-md hover:bg-blue-100 transition duration-200">
              {isLogin ? 'Login' : 'Logout'} {user?.email ? `(${user?.email})` : ''}
            </button>
          </li>
        </ul>
      </header>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
}