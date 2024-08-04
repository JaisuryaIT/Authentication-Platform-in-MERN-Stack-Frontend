import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../context/MessageContext';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [emailError, setEmailError] = useState('');
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

  // Email validation function
  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    // Validate email format
    if (emailError) {
      setError('Please correct the errors before submitting');
      return;
    }

    // Validate name lengths
    if (firstname.length <= 3) {
      setError('First name must be more than 3 characters');
      return;
    }
    if (lastname.length <= 2) {
      setError('Last name must be more than 2 characters');
      return;
    }

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

    if (!agreeToTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/register', {
        email,
        password,
        firstname,
        lastname,
        agreeToTerms,
      });
      setMessage('Verification mail sent, check your registered mail');
      navigate('/login');
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to register');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleSignup}>
        <h2 className="text-2xl mb-4">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {passwordErrors.length > 0 && (
          <ul className="text-red-500 mb-4">
            {passwordErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        {emailError && <p className="text-red-500 mb-4">{emailError}</p>}
        <div className="mb-4">
          <label className="block mb-1" htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            className="w-full p-2 border border-gray-300 rounded"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            className="w-full p-2 border border-gray-300 rounded"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="password">Password</label>
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
          <label className="block mb-1" htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full p-2 border border-gray-300 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              id="agreeToTerms"
              className="form-checkbox"
              checked={agreeToTerms}
              onChange={() => setAgreeToTerms(!agreeToTerms)}
            />
            <span className="ml-2">I agree to the terms and conditions</span>
          </label>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
