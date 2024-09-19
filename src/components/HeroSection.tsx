import React, { useState, useEffect } from "react";
import images from "../assets/images";
import CustomButton from "./Button";

const HeroSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = 5;

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="default-carousel"
      className="relative w-full overflow-hidden"
      data-carousel="slide"
    >
      {/* Carousel wrapper */}
      <div
        className="relative h-[50vh] md:h-[80vh] transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        <div
          className="absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out"
          style={{ left: "0%" }}
        >
          <img
            src={
              window.innerWidth < 1373
                ? images.MainHome7Mobile
                : images.MainHome7
            }
            className="absolute block w-full h-full object-cover"
            alt="Slide 1"
          />
          <div className="absolute inset-0 flex items-center justify-around">
            <h2 className="text-white text-2xl md:text-4xl font-bold"></h2>
          </div>
        </div>
        <div
          className="absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out"
          style={{ left: "100%" }}
        >
          <img
            src={
              window.innerWidth < 1373
                ? images.MainHome2Mobile
                : images.MainHome2
            }
            className="absolute block w-full h-full object-cover"
            alt="Slide 2"
          />
          <div className="relative text-left text-black ml-[10vw] md:mt-[20vh] mt-[5vh] z-10 font-Montaga  w-1/2 tracking-widest">
            <h1 className="md:text-6xl font-normal tracking-widest text-4xl uppercase mb-4">
              Discover <br></br> Timeless
            </h1>
            <p className="md:text-xl  text-base w-3/4 mb-8">
              Let The Shining Elegance Of The Talking, Antique Diamond Ring Fit
              All Occasions
            </p>
            <CustomButton>Discover More</CustomButton>
          </div>
        </div>
        <div
          className="absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out"
          style={{ left: "200%" }}
        >
          <img
            src={
              window.innerWidth < 1373
                ? images.MainHome3Mobile
                : images.MainHome3
            }
            className="absolute block w-full h-full object-cover"
            alt="Slide 3"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-2xl md:text-4xl font-bold"></h2>
          </div>
        </div>
        <div
          className="absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out"
          style={{ left: "300%" }}
        >
          <img
            src={
              window.innerWidth < 1373
                ? images.MainHome4Mobile
                : images.MainHome4
            }
            className="absolute block w-full h-full object-cover"
            alt="Slide 4"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-2xl md:text-4xl font-bold"></h2>
          </div>
        </div>
        <div
          className="absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out"
          style={{ left: "400%" }}
        >
          <img
            src={
              window.innerWidth < 1373
                ? images.MainHome5Mobile
                : images.MainHome5
            }
            className="absolute block w-full h-full object-cover"
            alt="Slide 5"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-2xl md:text-4xl font-bold"></h2>
          </div>
        </div>
      </div>

      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              activeIndex === index ? "bg-blue-500" : "bg-gray-300"
            }`}
            aria-current={activeIndex === index}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>

      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1L1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default HeroSection;

//   <section className="relative h-[80vh] flex items-center justify-start bg-cover bg-center">
//   <img src={images.MainHome} alt="Main Home" className="absolute inset-0  w-full h-full object-cover" />
// //   <div className="relative text-left text-black ml-[10vw] z-10 font-Montaga  w-1/2 tracking-widest">
//     <h1 className="text-6xl font-normal tracking-widest uppercase mb-4">Discover <br></br> Timeless</h1>
//     <p className="text-xl w-3/4 mb-8">Let The Shining Elegance Of The Talking, Antique Diamond Ring Fit All Occasions</p>
//     <CustomButton>Discover More</CustomButton>
//   </div>
// </section>

// import React from 'react';
// import images from '../assets/images';
// import CustomButton from './Button';

// const HeroSection: React.FC = () => {
//   return (
//     <section className="relative h-[80vh] flex items-center justify-start bg-cover bg-center">
//     <img src={images.MainHome1} alt="Main Home" className="absolute inset-0  w-full h-full object-cover" />
//     <div className="relative text-left text-black ml-[10vw] z-10 font-Montaga  w-1/2 tracking-widest">
//       <h1 className="text-6xl font-normal tracking-widest uppercase mb-4">Discover <br></br> Timeless</h1>
//       <p className="text-xl w-3/4 mb-8">Let The Shining Elegance Of The Talking, Antique Diamond Ring Fit All Occasions</p>
//       <CustomButton>Discover More</CustomButton>
//     </div>
//   </section>
//   );
// };

// export default HeroSection;
