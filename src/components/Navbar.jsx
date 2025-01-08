import React, { useState } from 'react';
import { logoutApi } from '../apis/authentication';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const [jwt, setJwt] = useState(cookies.jwt);

  const handleLogout = async (e) => {
    removeCookie('jwt', { path: '/' });
    setJwt(null);
    navigate('/');
  };

  const handleLogIn = async (e) => {
    navigate('/login');
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-auto">
        <div className="flex justify-between items-center py-4">
          {/* Logo or Title */}
          <Link to="/">
          <p className="font-extrabold text-3xl text-white tracking-wide">
            Code Challenges
          </p>
          </Link>

          {/* Buttons */}
          <div>
            {jwt ? (
              <>
              <Link to='/add-challenge'>
              <button
                // onClick={handleLogout}
                className="bg-green-500 text-white hover:bg-green-600 transition-all duration-300 rounded-lg px-4 py-2 font-semibold shadow-md"
              >
                Add challenge
              </button>
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white hover:bg-red-600 transition-all duration-300 rounded-lg px-4 py-2 font-semibold shadow-md ml-7"
              >
                Logout
              </button>
              </>
            ) : (
              <button
                onClick={handleLogIn}
                className="bg-green-500 text-white hover:bg-green-600 transition-all duration-300 rounded-lg px-4 py-2 font-semibold shadow-md"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
