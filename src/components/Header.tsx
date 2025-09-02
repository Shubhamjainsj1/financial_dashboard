'use client';

import React, { useState } from 'react';
import { Search, Bell, Settings, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">FinDash</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-blue-600">Dashboard</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Portfolio</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Markets</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">News</a>
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="hidden sm:flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search stocks..."
                className="bg-transparent border-none outline-none placeholder-gray-400 w-32 lg:w-48"
              />
            </div>

            {/* Action Buttons */}
            <button className="hidden sm:flex items-center justify-center h-8 w-8 rounded-lg hover:bg-gray-100">
              <Bell className="h-4 w-4 text-gray-600" />
            </button>
            <button className="hidden sm:flex items-center justify-center h-8 w-8 rounded-lg hover:bg-gray-100">
              <Settings className="h-4 w-4 text-gray-600" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center h-8 w-8 rounded-lg hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4 text-gray-600" />
              ) : (
                <Menu className="h-4 w-4 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col gap-4">
              {/* Mobile Search */}
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search stocks..."
                  className="bg-transparent border-none outline-none placeholder-gray-400 flex-1"
                />
              </div>
              
              {/* Mobile Navigation */}
              <nav className="flex flex-col gap-2">
                <a href="#" className="text-sm font-medium text-blue-600 py-2">Dashboard</a>
                <a href="#" className="text-sm font-medium text-gray-600 py-2">Portfolio</a>
                <a href="#" className="text-sm font-medium text-gray-600 py-2">Markets</a>
                <a href="#" className="text-sm font-medium text-gray-600 py-2">News</a>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Import DollarSign icon
import { DollarSign } from 'lucide-react';

export default Header;
