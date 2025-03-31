import React from "react";
import { FaClock, FaStar, FaFire, FaCalendar } from "react-icons/fa";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-gray-100 to-gray-200 py-2 text-center">
      <div className="max-w-3xl mx-auto px-6">
        {/* Heading */}
        <section className="bg-gradient-to-r from-gray-100 to-gray-200 py-20 text-center flex items-end">
  <div className="max-w-3xl mx-auto px-6">
    <h1 className="text-4xl font-bold text-gray-800 mb-2">Discover The Best AI Websites & Tools</h1>
  </div>
</section>
        <p className="text-gray-600 text-lg mb-2">
          23,568 AIs and 233 categories in the best AI tools directory. AI tools list & GPTs store are updated daily by ChatGPT.
        </p>

        {/* Sponsored Section */}
        <div className="text-sm text-gray-600 mb-4">
          Sponsored by <span className="text-red-500 font-semibold">Rubii AI</span>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by AI, e.g. Video Translation AI Tool"
            className="px-4 py-2 w-full md:w-96 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-700 transition">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;