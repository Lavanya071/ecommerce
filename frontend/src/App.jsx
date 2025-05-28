import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PaginationProvider from './component/context/PaginationContext';
import Navbar from './component/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import User from './pages/User';
import PageNotFound from './pages/PageNotFound';
import Login from './component/Login';        // ✅ Add this
import Signup from './component/Signup';      // ✅ Add this
import './App.css';

function App() {
  return (
    <PaginationProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/user' element={<User />} />
        <Route path='/login' element={<Login />} />        {/* ✅ Login route */}
        <Route path='/signup' element={<Signup />} />      {/* ✅ Signup route */}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </PaginationProvider>
  );
}

export default App;
