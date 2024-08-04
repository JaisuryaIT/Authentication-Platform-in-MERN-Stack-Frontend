import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMessage } from '../context/MessageContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        navigate('/home'); // Redirect to home page
      }, 2000); // Wait 2 seconds before redirecting

      return () => clearTimeout(timer);
    }
  }, [message, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });
      // Assuming the backend returns a token upon successful login
      const { token } = response.data;

      // Save token in localStorage or context
      localStorage.setItem('token', token);

      // Set message for successful login
      setMessage('Successfully logged in');
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
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
