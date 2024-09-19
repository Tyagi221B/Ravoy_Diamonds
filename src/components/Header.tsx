import React, { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "./Navigation";
import images from "../assets/images";
import AuthModal from "./AuthModel";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.userReducer);

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 10,
      },
    },
  };

  // Debounce function for better performance in search input
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Implement debouncing here if needed
  };


  // Function to handle user profile or login modal
  const handleUserClick = () => {
    if (user) {
      // If user exists, open profile modal or navigate to profile page
      navigate("/account"); 
    } else {
      // If no user, open auth modal for login/register
      setIsAuthModalOpen(true);
    }
  };

  return (
    <>
      <motion.header
        className="bg-white p-5"
        initial="hidden"
        animate="visible"
        variants={headerVariants}
      >
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Navigation for small screens */}
            <div className="block md:hidden">
              <Navigation />
            </div>

            {/* Logo */}
            <motion.div
              className="flex items-center cursor-pointer"
              initial="hidden"
              animate="visible"
              variants={headerVariants}
              onClick={() => navigate("/")}
            >
              <img
                src={images.Logo2}
                alt="Ravoy Logo"
                className="size-12 w-auto mr-2"
              />
            </motion.div>
          </div>

          {/* Search bar for larger screens */}
          <motion.div
            className="hidden relative md:block md:flex-1 md:max-w-xl md:mx-4"
            initial="hidden"
            animate="visible"
            variants={headerVariants}
          >
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20a8 8 0 100-16 8 8 0 000 16zm4.93-4.93l4.24 4.24"
                />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                value={searchTerm}
                onChange={handleSearchInput}
              />
            </div>
          </motion.div>

          {/* User and cart actions */}
          <motion.div
            className="flex items-center space-x-4"
            initial="hidden"
            animate="visible"
            variants={headerVariants}
          >
            {/* User Authentication Button */}
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() => handleUserClick()}
              aria-label="User Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>

            {/* User Greeting or Login/Register */}
            <h3
              className="hidden md:block text-[#9C9C9C] uppercase tracking-widest cursor-pointer"
              onClick={() => handleUserClick()}
            >
              {user ? user.name : "Login/Register"}
            </h3>

            {/* Heart Icon (Wishlist) */}
            <button
              onClick={() => navigate("/wishlist")}
              className="text-gray-600 hover:text-gray-800"
              aria-label="Wishlist"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>

            {/* Shopping Cart */}
            <button className="text-gray-600 hover:text-gray-800" aria-label="Shopping Cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
          </motion.div>
        </div>
      </motion.header>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Header;
