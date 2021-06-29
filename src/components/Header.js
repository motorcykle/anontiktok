import React from 'react';
import { auth } from '../firebase';
import { UploadIcon, UserIcon, BadgeCheckIcon, LogoutIcon, HomeIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav className="py-2 px-10 shadow-md">
        <div className="container flex items-center justify-between mx-auto space-x-2">
          <Link to="/" className="">
            <button className="text-gray-300 items-center hidden sm:flex">
              <BadgeCheckIcon className="h-6 animate-spin" />
              <p className="font-bold text-xl uppercase">AnonTikTok</p>
            </button>
            <button className="block sm:hidden py-2 px-2 rounded-full border-2 hover:bg-gray-100">
              <HomeIcon className="h-6 text-gray-400" />
            </button>
          </Link>
          <div className="flex items-center space-x-2">
            <Link to="/upload">
            <button className="py-2 px-6 rounded-full border-2 hover:bg-gray-100">
              <UploadIcon className="h-6 text-gray-400" />
            </button>
            </Link>
            <Link to="/profile">
            <button className="py-2 px-6 rounded-full border-2 hover:bg-gray-100">
              <UserIcon className="h-6 text-gray-400" />
            </button>
            </Link>
          </div>
          <Link to="/">
            <button className="py-2 px-2 sm:px-6 rounded-3xl border-2 font-semibold text-gray-400 hover:bg-gray-100 flex items-center space-x-1" onClick={() => auth.signOut()}>
              <span className="hidden sm:inline-block">Sign Out</span> <LogoutIcon className="h-6 text-gray-400" />
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
