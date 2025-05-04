import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import shoppingBg from '../../../src/assets/shoppingBg.jpg';

const Signup=()=> {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    navigate('/');
  };

  const handleLoginRedirect = () => {
    navigate('/loginForm');
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert('All fields are required');
      return;
    }

    setLoading(true);

    try {
      // Send the user data to the backend API
      const response = await fetch('http://localhost:5000/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // If successful, redirect to the login page
        alert('Account created successfully!');
        navigate('/loginForm');
      } else {
        // If there's an error, show an error message
        alert(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: `url(${shoppingBg})` }}>
        <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-md text-black">
          <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-black">Sign Up</h2>
          <form onSubmit={handleSignup}>
            <input
              className="w-full mb-4 p-3 rounded bg-white/50 placeholder-gray-700 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
            <input
              className="w-full mb-4 p-3 rounded bg-white/50 placeholder-gray-700 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <input
              className="w-full mb-6 p-3 rounded bg-white/50 placeholder-gray-700 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-300"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 bg-white hover:bg-teal-100 text-black rounded"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-4 py-2 hover:bg-pink-100 bg-white text-black rounded"
                disabled={loading}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-black">
            Already have an account?{' '}
            <button onClick={handleLoginRedirect} className="text-black font-semibold underline">
              Login
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
