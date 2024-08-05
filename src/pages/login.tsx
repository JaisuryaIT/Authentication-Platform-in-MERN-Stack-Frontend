import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useMessage } from '../context/MessageContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const { message, setMessage } = useMessage();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Display any messages if present in URL params
    const params = new URLSearchParams(location.search);
    const msg = params.get('message');
    if (msg) {
      setMessage(msg);
    }
  }, [location, setMessage]);

  useEffect(() => {
    // Redirect based on message after successful login
    if (message) {
      const timer = setTimeout(() => {
        setMessage(''); 
      }, 2000); 

      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password, rememberMe });
      // Assuming the backend returns a token upon successful login
      const { token } = response.data;

      // Save token in localStorage or context
      localStorage.setItem('token', token);

      // Set message for successful login
      setMessage('Successfully logged in');
      navigate('/home');

    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response && err.response.data && typeof err.response.data.message === 'string') {
          setError(err.response.data.message);
        } else {
          setError('An unexpected error occurred');
        }
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleLogin}>
        <h2 className="text-2xl mb-4">Login</h2>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            className="mr-2"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
        <div className="mt-4">
          <Link to="/forgot-password" className="text-blue-500">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
