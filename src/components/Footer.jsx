import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Songticle</h3>
            <p className="text-sm">Create your own music with our AI-powered Music Maker. Record, mix, and produce songs with ease.</p>
          </div>
          <div className="flex space-x-4">
            <Link to="/about" className="hover:text-blue-400">About</Link>
            <Link to="/contact" className="hover:text-blue-400">Contact</Link>
            <Link to="/privacy-policy" className="hover:text-blue-400">Privacy Policy</Link>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <div>© {new Date().getFullYear()} Songticle. All rights reserved.</div>
          <div className="mt-2">
            Built by <a href="https://vayns.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Vayns Software</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;