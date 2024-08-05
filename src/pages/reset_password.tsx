import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useMessage } from '../context/MessageContext';

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const { setMessage } = useMessage();

  // Password validation function
  const validatePassword = (password: string) => {
    const errors: string[] = [];

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    // Check for at least one number
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    // Check for at least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    // Check for minimum length
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    setPasswordErrors(errors);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate password match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password strength
    if (passwordErrors.length > 0) {
      setError('Password does not meet the required criteria');
      return;
    }

    try {
      await axios.post(`http://localhost:3000/api/reset-password/${token}`, { password });
      setMessage('Password reset successful');
      navigate('/login');
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response && err.response.data && typeof err.response.data.message === 'string') {
          setError(err.response.data.message);
        } else {
          setError('Failed to reset password');
        }
      } else {
        setError('Failed to reset password');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleResetPassword}>
        <h2 className="text-2xl mb-4">Reset Password</h2>
        {error && <p className="text-red-500">{error}</p>}
        {passwordErrors.length > 0 && (
          <ul className="text-red-500 mb-4">
            {passwordErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        <div className="mb-4">
          <label className="block mb-1" htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full p-2 border border-gray-300 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
