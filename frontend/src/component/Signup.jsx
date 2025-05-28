import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic frontend validation
    if (username.length < 3 || password.length < 6) {
      setError('Username must be at least 3 characters and password at least 6 characters.');
      return;
    }
  
    // Email validation: Check if the username contains '@'
    if (!username.includes('@')) {
      setError('Please enter a valid email with "@" symbol.');
      return;
    }
  
    try {
      const response = await axios.post('/api/auth/signup', {
        username,
        password,
      });
  
      if (response.status === 201) {
        // Store JWT token to localStorage after signup success
        localStorage.setItem('token', response.data.token);

        // Optionally store cart data if it's included in the response
        if (response.data.cart) {
          localStorage.setItem('cart', JSON.stringify(response.data.cart));
        }

        alert('Signup successful');
        navigate('/'); // Redirect to home or another page after successful signup
      }
    } catch (err) {
      const message = err.response?.data || 'Signup failed. Please try again.';
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        <input
          type="text"
          placeholder="Email (username)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
