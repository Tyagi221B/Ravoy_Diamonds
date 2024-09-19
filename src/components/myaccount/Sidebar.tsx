import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddIcon from "@mui/icons-material/Add";

interface MenuItem {
  name: string;
  href: string;
}

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const handleItemClick = (index: number) => {
    setActiveItem(index);
    setIsDropdownOpen(false); // Close the dropdown after selecting an item
  };

  const menuItems: MenuItem[] = [
    { name: "Overview", href: "/account" },
    { name: "Address Book", href: "/account/address" },
    { name: "Track Order", href: "/account/trackorder" },
    { name: "Wishlist", href: "/account/wishlist" },
    { name: "Order History", href: "/account/orderhistory" },
    { name: "Log out", href: "/logout" },
  ];

  useEffect(() => {
    const currentIndex = menuItems.findIndex(
      (item) => item.href === location.pathname
    );
    setActiveItem(currentIndex);
  }, [location.pathname]);

  return (
    <div>
      {/* Desktop View */}
      <div className="hidden md:flex flex-col items-center ms-6 bg-[#FFF9F3] p-6 rounded-lg shadow-lg w-full h-screen">
        <div className="text-2xl font-display mb-5 relative">
          MY ACCOUNT
        </div>
        <ul className="w-full">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(index)}
              className={`py-3 px-4 text-center border-b border-gray-200 uppercase  tracking-widest font-sans cursor-pointer flex justify-between items-center ${
                activeItem === index
                  ? "text-blue-400 font-semibold"
                  : "text-gray-500"
              }`}
            >
              <Link to={item.href} className="flex-1 text-left">
                {item.name}
              </Link>
              {activeItem === index && (
                <ArrowForwardIcon className="text-blue-600 text-xl" />
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile View */}
      <div className="flex md:hidden flex-col items-center w-full p-4">
        <div className="w-full">
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex justify-between items-center p-4 border border-gray-300 rounded-md cursor-pointer"
          >
            <div className="text-lg font-medium text-gray-500">
              MY ACCOUNT
            </div>
            <AddIcon className={isDropdownOpen ? "transform rotate-45" : ""} />
          </div>
          {isDropdownOpen && (
            <div className="mt-2">
              <ul className="w-full">
                {menuItems.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleItemClick(index)}
                    className={`py-2 text-center border-b border-gray-200 cursor-pointer flex justify-between items-center ${
                      activeItem === index
                        ? "text-blue-600 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    <Link to={item.href} className="flex-1 text-left">
                      {item.name}
                    </Link>
                    {activeItem === index && (
                      <ArrowForwardIcon className="text-blue-600 text-xl" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
