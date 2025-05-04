import React from 'react';
import { useNavigate } from 'react-router-dom';
import shoppingBg from "../../src/assets/shoppingBg.jpg";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="HomeContainer min-h-screen flex flex-col justify-center items-center text-black"  style={{backgroundImage:`url(${shoppingBg})`}}>
        <div className='bg-white/20 backdrop-blur-md p-10 rounded-2xl shadow-2xl text-center max-w-lg w-full'>

      <h1 className="text-5xl font-bold mb-6 hover:text-teal-400"> Shopify</h1>
      <p className="mb-10 text-lg font-bold">"Shop Smart. Live Better"</p>

      <div className="space-x-4">
        <button
          onClick={() => navigate('/loginForm')}
          className="bg-white text-teal-400 font-semibold px-6 py-2 rounded-2xl shadow-md hover:bg-pink-200 transition duration-200"
          >
          Login
        </button>
        <button
          onClick={() => navigate('/signup')}
          className="bg-white text-pink-300 font-semibold px-6 py-2 rounded-2xl shadow-md hover:bg-teal-200 transition duration-200"
          >
          Signup
        </button>
      </div>
    </div>
            </div>
  );
};

export default HomePage;

