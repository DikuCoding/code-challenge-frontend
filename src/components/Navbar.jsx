import React, { useState, useEffect } from 'react';
import { logoutApi } from '../apis/authentication';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { FaBell, FaBars, FaTimes } from 'react-icons/fa';
import subscribeToNotifications from '../channels/notificationsChannel';
import ActionCable from 'actioncable';

const Navbar = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(['jwt']);
  const [user_cookie] = useCookies(['user']);
  const [user] = useState(user_cookie.user)
  const [jwt] = useState(cookies.jwt);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  useEffect(() => {
    // Subscribe to WebSocket notifications
    subscribeToNotifications((data) => {
      setNotifications((prev) => [data, ...prev]); // Add new notifications
      setIsNotificationVisible(true); // Show notification indicator
    });
  }, []);

  useEffect(() => {
    const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
    const subscription = cable.subscriptions.create('NotificationsChannel', {
      received: (data) => {
        setNotifications((prev) => [data.message, ...prev]);
        setIsNotificationVisible(true); // Show notification indicator
      },
    });
    return () => subscription.unsubscribe();
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showNotifications) {
      setIsNotificationVisible(false); // Hide new notification indicator when opened
    }
  };

  const handleLogout = () => {
    removeCookie('jwt', { path: '/' });
    navigate('/login');
  };

  const handleLogIn = () => {
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-white font-extrabold text-2xl">
            Code Challenges
          </Link>

          {/* Notification Button */}
          <div className="relative ml-[15vw] md:ml-[35vw]">
              <button
                onClick={toggleNotifications}
                className="relative flex items-center bg-white text-indigo-600 hover:bg-gray-100 transition-all duration-300 rounded-full p-3 shadow-md"
              >
                <FaBell className="text-xl" />
                {isNotificationVisible && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {notifications.length}
                  </span>
                )}
              </button>
              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                  </div>
                  <ul className="max-h-60 overflow-y-auto cursor-pointer font-semibold">
                    {notifications.length > 0 ? (
                      notifications.map((notification, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 border-b last:border-none hover:bg-gray-100"
                        >
                          {notification}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-gray-500 text-center">
                        No new notifications
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

          {/* Hamburger Menu for Mobile */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white text-2xl focus:outline-none"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            

            {/* Desktop Buttons */}
            {jwt ? (
              <>
              {user.role === "admin" &&(
                <Link to="/add-challenge">
                  <button className="bg-green-500 text-white hover:bg-green-600 transition-all duration-300 rounded-lg px-4 py-2 font-semibold shadow-md">
                    Add Challenge
                  </button>
                </Link>
              )}
                
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white hover:bg-red-600 transition-all duration-300 rounded-lg px-4 py-2 font-semibold shadow-md"
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white shadow-lg rounded-lg p-4 space-y-4">
            {jwt ? (
              <>
                <Link to="/add-challenge">
                  <button className="w-full bg-green-500 text-white hover:bg-green-600 transition-all duration-300 rounded-lg px-4 py-2 font-semibold shadow-md">
                    Add Challenge
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white hover:bg-red-600 transition-all duration-300 rounded-lg px-4 py-2 font-semibold shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleLogIn}
                className="w-full bg-green-500 text-white hover:bg-green-600 transition-all duration-300 rounded-lg px-4 py-2 font-semibold shadow-md"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
