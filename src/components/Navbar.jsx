import React, { useState } from 'react';
import { logout } from "../firebase";
import { Menu, X } from 'lucide-react';
import SettingsButton from './SettingsButton';

const Navbar = ({ onFilterChange}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all"); 

  const handleFilterClick = (filterType) => {
    onFilterChange(filterType);
    setActiveFilter(filterType); 
    setMenuOpen(false);
  };

  return (
    <nav className='bg-neutral-800 w-screen fixed top-0 left-0 z-50'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='relative flex h-16 items-center justify-between'>

          {/* Hamburger Button on Mobile */}
          <button
            className='text-white sm:hidden focus:outline-none'
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo (Left on Desktop, Center on Mobile) */}
          <div className='text-white font-medium text-lg sm:absolute sm:left-0 sm:pl-4'>
            ToDoApp
          </div>

          {/* Desktop Menu (Centered) */}
          <div className='hidden sm:flex gap-5 absolute left-1/2 transform -translate-x-1/2'>
            <a
              href='#'
              className={`rounded-md px-3 py-2 text-sm font-medium ${activeFilter === "all" ? 'bg-neutral-700 text-white!' : 'hover:bg-neutral-700 text-white!'}`}
              onClick={() => handleFilterClick("all")}
            >
              All
            </a>
            <a
              href='#'
              className={`rounded-md px-3 py-2 text-sm font-medium ${activeFilter === "pending" ? 'bg-neutral-700 text-white!' : 'hover:bg-neutral-700 text-white!'}`}
              onClick={() => handleFilterClick("pending")}
            >
              Pending
            </a>
            <a
              href='#'
              className={`rounded-md px-3 py-2 text-sm font-medium ${activeFilter === "completed" ? 'bg-neutral-700 text-white!' : 'hover:bg-neutral-700 text-white!'}`}
              onClick={() => handleFilterClick("completed")}
            >
              Completed
            </a>
            <a
              href='#'
              className={`rounded-md px-3 py-2 text-sm font-medium ${activeFilter === "overdue" ? 'bg-neutral-700 text-white!' : 'hover:bg-neutral-700 text-white!'}`}
              onClick={() => handleFilterClick("overdue")}
            >
              Overdue
            </a>
          </div>

          {/* Profile Menu */}
          <div className='relative flex items-center sm:ml-auto'>
            <button
              type='button'
              className='relative flex rounded-full text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none'
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className='sr-only'>Open user menu</span>
              <img className='size-8 rounded-full' src='https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg' alt='' />
            </button>

            {/* Profile Dropdown - Adjusted for Mobile */}
            {isOpen && (
              <div className='absolute top-12 right-0 sm:right-0 w-48 bg-white shadow-lg rounded-md py-1 z-50 sm:mt-2 sm:w-48 sm:bg-white'>
                <SettingsButton></SettingsButton>
                <button className='block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' onClick={logout}>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Full Width */}
      {menuOpen && (
        <div className='sm:hidden absolute top-16 left-0 w-full bg-black text-white!'>
          <a
            href='#'
            className={`block px-4 py-3 text-lg border-b border-gray-700 text-white!${activeFilter === "all" ? 'bg-neutral-700 text-white!' : ''}`}
            onClick={() => handleFilterClick("all")}
          >
            All
          </a>
          <a
            href='#'
            className={`block px-4 py-3 text-lg border-b border-gray-700 text-white!${activeFilter === "pending" ? 'bg-neutral-700 text-white!' : ''}`}
            onClick={() => handleFilterClick("pending")}
          >
            Pending
          </a>
          <a
            href='#'
            className={`block px-4 py-3 text-lg border-b border-gray-700 text-white!${activeFilter === "completed" ? 'bg-neutral-700 text-white!' : ''}`}
            onClick={() => handleFilterClick("completed")}
          >
            Completed
          </a>
          <a
            href='#'
            className={`block px-4 py-3 text-lg text-white!${activeFilter === "overdue" ? 'bg-neutral-700 text-white!' : ''}`}
            onClick={() => handleFilterClick("overdue")}
          >
            Overdue
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
