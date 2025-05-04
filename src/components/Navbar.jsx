import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import { BsSearch } from 'react-icons/bs'

function Navbar() {

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); 
    window.location.href = '/login'; 
  };
  
 
  return (
    <nav className="w-full bg-teal-200 text-black shadow-md mb-1">
      <div className="max-w-7xl mx-auto  py-1 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
        <img src={logo} alt="logo" className='h-10'/>
          ShopEase
        </Link>
        {/* search */}
      <div className='flex align-items-center'>
        <input type="text" placeholder='Search...' className='border  rounded-bl-2xl  w-[35rem] p-2'/>
        <button className='text-2xl border rounded-tr-2xl p-1 hover:transform hover:scale-80 transition-transform duration-300'><BsSearch/></button>
      </div>
        {/* Nav Links */}
        <div className="flex gap-4 items-center font-bold">
          <Link to="/ProductPage" className="px-4 py-2 rounded hover:bg-pink-200 text-black">
            Products
          </Link>
          <Link to="/CartPage" className="px-4 py-2 rounded hover:bg-pink-200 text-black">
            Cart
          </Link>
          <Link to="/WishlistPage" className="px-4 py-2 rounded hover:bg-pink-200 text-black">
            Wishlist
          </Link>
          <button className="px-4 py-2 rounded hover:bg-pink-200 text-black" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
