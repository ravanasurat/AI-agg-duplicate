import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Copyright Text */}
        <p className="text-sm text-gray-400 text-center md:text-left">
          &copy; 2025 AI-Aggregator. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex gap-4 mt-3 md:mt-0">
          <a href="/" className="text-gray-400 hover:text-white transition">Twitter</a>
          <a href="/" className="text-gray-400 hover:text-white transition">LinkedIn</a>
          <a href="/" className="text-gray-400 hover:text-white transition">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
