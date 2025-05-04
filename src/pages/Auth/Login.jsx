import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import shoppingBg from '../../../src/assets/shoppingBg.jpg';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/ProductPage'); // Redirect if already logged in
    }
  }, [navigate]);

  const handleBack = () => {
    navigate('/');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email.trim() || !password.trim()) {
      alert('All fields are required');
      return;
    }
  
    try {
      const res = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
      console.log('Response data:', data);

  
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user)); 
        navigate('/ProductPage');
      }
       else {
        alert(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error', err);
      alert('Something went wrong');
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: `url(${shoppingBg})` }}>
        <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-md text-black">
          <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-black">Login</h2>
          <form onSubmit={handleLogin}>
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
              autoComplete="current-password"
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
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-black">
            Don't have an account?{' '}
            <button
              onClick={handleSignupRedirect}
              className="text-black font-semibold underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
