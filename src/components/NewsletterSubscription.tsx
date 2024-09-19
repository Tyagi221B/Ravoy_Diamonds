import React, { useState } from 'react';

const NewsletterSubscription: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed with email:', email);
    setEmail('');
  };

  return (
    <section className="bg-[#FFF9F3] py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl  text-center mb-4">Get Our Latest Update</h2>
        <p className="text-center text-gray-400 mb-8 max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
          Subscribe to our newsletter to receive updates on new products, special offers, and other discount information.
        </p>
        <form onSubmit={handleSubmit} className="max-w-sm sm:max-w-md lg:max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email...."
            className="flex-1 px-4 py-2 border border-gray-300 bg-[#FFF9F3] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="text-black  px-6 py-2 rounded border border-gray-300 hover:bg-gray-100 transition-colors duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSubscription;
