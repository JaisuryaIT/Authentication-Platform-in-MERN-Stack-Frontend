import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../context/MessageContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setMessage } = useMessage();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:3000/api/forgot-password', { email });
      setMessage('Password reset email sent');
      navigate('/login');
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response && err.response.data && typeof err.response.data.message === 'string') {
          setError(err.response.data.message);
        } else {
          setError('Failed to send reset email');
        }
      } else {
        setError('Failed to send reset email');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleForgotPassword}>
        <h2 className="text-2xl mb-4">Forgot Password</h2>
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
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
