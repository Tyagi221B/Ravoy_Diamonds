
import React from "react";
import { motion } from "framer-motion";
import CustomButton from "./Button";
import images from "../assets/images";

interface OfferProps {
  category: string;
  title: string;
  description: string;
  buttonText: string;
  image1: string;
  image2: string;
  reversed?: boolean;
}

const OfferSection: React.FC<OfferProps> = ({
  category,
  title,
  description,
  buttonText,
  image1,
  image2,
  reversed = false,
}) => {
  const contentVariants = {
    hidden: { opacity: 0, x: reversed ? 100 : -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 70, damping: 15 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: reversed ? -100 : 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 70, damping: 15 },
    },
  };

  return (
    <section
      className={`container overflow-hidden mx-auto px-10 mt-10  flex flex-col md:flex-row ${
        reversed ? "md:flex-row-reverse" : ""
      }`}
    >
      <motion.div
        className="md:w-1/2 flex items-center flex-col justify-center mb-8 md:mb-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={contentVariants}
      >
        <h2 className="text-lg text-[#2993B5]  uppercase mb-4">{category}</h2>
        <h2 className="text-lg  font-Montaga uppercase mb-4">{title}</h2>
        <hr className="border border-[#6F6F6F] mb-4   w-16" />
        <p className="text-[#6F6F6F] mb-6">{description}</p>
        <div className="relative">
          <img src={images.flower1} alt="" className="w-32" />
          <div className='className="w-[100%] absolute  bottom-[10%] p-4 left-1/2 transform -translate-x-1/2'>
            <CustomButton>{buttonText}</CustomButton>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="md:w-1/2 grid grid-cols-2 gap-4 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={imageVariants}
      >
        <div className="overflow-hidden">
          <img
            src={image1}
            alt="Jewelry 1"
            className="w-full h-full  transition-transform duration-500 ease-in-out hover:scale-110 hover:rotate-3"
          />
        </div>
        <div className="overflow-hidden">
          <img
            src={image2}
            alt="Jewelry 2"
            className="w-full h-full transition-transform duration-500 ease-in-out hover:scale-110 hover:rotate-3  "
          />
        </div>
      </motion.div>
    </section>
  );
};

export default OfferSection;
