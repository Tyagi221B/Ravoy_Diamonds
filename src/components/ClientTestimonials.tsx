import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    text: "We Can't Withstand  I Have Seen, With Fair Pricing And Excellent, Excellent Customer Service. They Are My 'Go To' Line.",
    author: "MARYANN SIMMS"
  },
  {
    id: 2,
    text: "We Our Kitchen Design And Remodel Services. Wellborn Has The Best Quality I Have Seen, With Fair Pricing And Excellent, Excellent Customer Service. They Are My 'Go To' Line.",
    author: " SIMMS"
  },
  {
    id: 3,
    text: "We Can't Withstand Capacity's Amasing Overall Offers For Our Kitchen Design And Remodel Services. Wellborn Has The Best Quality I Have Seen, With Fair Pricing And Excellent, Excellent Customer Service. They Are My 'Go To' Line.",
    author: "MARYANN "
  },
];

const ClientTestimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        setFade(true);
      }, 500); // Matches the duration of the fade transition
    }, 3000); // Change testimonial every 2 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <section className="bg-[#FFF9F3] py-16">
      <div className="container mx-auto px-4  md:h-[25vh] h-[40vh]  overflow-hidden">
        <h2 className="text-lg text-[#2993B5] tracking-widest text-xs text-center uppercase mb-8">Client Testimonials</h2>
        <h2 className="text-3xl font-normal text-center mb-6">Our Happy Clients</h2>
        <div className="flex items-center ">
          <div className={`flex-1 text-center px-8 transition-opacity duration-500 ease-linear ${fade ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-lg text-[#565656] mb-4">{testimonials[currentTestimonial].text}</p>
            <p className="tracking-widest text-gray-600 uppercase">— {testimonials[currentTestimonial].author}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials;
