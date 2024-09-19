import React from 'react';
import { motion } from 'framer-motion';

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  textColor?: string;
  borderColor?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, onClick, textColor = 'text-gray-600', borderColor = 'border-black' }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`px-6 py-2  uppercase tracking-widest hover:border-[#2993B5] transition-colors w-72 duration-300 bg-transparent border ${textColor} ${borderColor}`}
      whileHover={{ scale: 1.05, backgroundColor: '#cfebf1' }}
      whileTap={{ scale: 0.95, backgroundColor: '#cfebf1' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {children}
    </motion.button>
  );
};

export default CustomButton;
