import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { quantity } = useSelector((store) => store.cartReducer.cartQuantity);
  const token = localStorage.getItem('token');  // Get token from localStorage
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove token from localStorage
    navigate('/login');  // Redirect to login page
  };

  return (
    <div className='navbar'>
      <Link to="/" className='cart'>Home</Link>
      <Link to="/user" className='user'>User</Link>
      <Link to="/cart" className='cart'>
        <div className="cart_container">
          <FaCartShopping fontSize="large" className='cart'/>
          <div className="cart_quantity">{quantity}</div>
        </div>
      </Link>

      {!token ? (
        <>
          <Link to="/login" className="login"><button>Login</button></Link>
          <Link to="/signup"  className="signup"><button>Signup</button></Link>
        </>
      ) : (
        <button onClick={handleLogout} className="logout">Logout</button>  // Show Logout button if token is present
      )}
    </div>
  );
};

export default Navbar;
