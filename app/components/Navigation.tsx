'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Navigation = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/', icon: '🧬' },
    { name: 'People', href: '/people', icon: '👥' },
    { name: 'Publications', href: '/publications', icon: '📚' },
    { name: 'Contact', href: '/contact', icon: '📧' },
  ];

  return (
    <>
      {/* Above-header bar */}
      <div className="bg-osu-scarlet text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-base">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span>🏛️</span>
                <span>The Ohio State University</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📍</span>
                <span>1900 Coffey Road, Columbus, OH 43210</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <span>614-247-5703</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✉️</span>
                <span>li.3714@osu.edu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main header */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-32">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-4xl font-bold text-gray-900 hover:text-osu-scarlet transition-colors duration-300"
            >
              Li Lab
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-6 py-4 rounded-md text-lg font-medium transition-colors duration-300 ${
                    pathname === item.href
                      ? 'text-osu-scarlet bg-gray-50'
                      : 'text-gray-700 hover:text-osu-scarlet hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-700 focus:outline-none focus:text-blue-700 transition-colors duration-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg mt-2 shadow-lg border border-gray-200">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-6 py-4 rounded-md text-lg font-medium transition-colors duration-300 ${
                    pathname === item.href
                      ? 'text-osu-scarlet bg-gray-50'
                      : 'text-gray-700 hover:text-osu-scarlet hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  );
};

export default Navigation;
