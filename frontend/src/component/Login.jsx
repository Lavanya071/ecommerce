import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux"; // Import useDispatch to dispatch actions

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To store error messages
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Basic Validation
    if (!email || !password) {
      setError("Email and Password are required.");
      return;
    }
  
    try {
      const response = await axios.post("/api/auth/login", { username: email, password });
  
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
  
        // Load cart data from localStorage and sync it with Redux store
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        dispatch({ type: "SET_CART", payload: savedCart }); // Dispatch action to set the cart in Redux store

        // Redirect to the home page after successful login
        navigate("/");
      }
    } catch (err) {
      setError("Invalid login credentials.");
    }
  };
  
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
