import {jwtDecode } from 'jwt-decode';

export const isTokenExpired = () => {
  const token = localStorage.getItem('token');
  if (!token) return true;

  try {
    const decoded = jwtDecode (token);
    const exp = decoded.exp * 1000; 
    return Date.now() > exp; 
  } catch (err) {
    console.error('Invalid token:', err);
    return true;
  }
};
