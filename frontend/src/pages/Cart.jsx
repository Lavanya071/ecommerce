import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCart } from '../redux/actions/cartActions'; // Action to set cart from localStorage
import ProductList from '../component/ProductList'; // Assuming this is the component that lists products

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get cart products from Redux store
  const cartProducts = useSelector((state) => state.cartReducer.cartProducts);

  // On component mount, load the cart from localStorage into Redux
  useEffect(() => {
    dispatch(setCart()); // This will load cart from localStorage into Redux
  }, [dispatch]);

  const handleBackToProducts = () => {
    navigate('/'); // Navigate back to the products page
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <button onClick={handleBackToProducts}>Back to Products</button>

      {/* If the cart is empty, show a message */}
      {cartProducts.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        // Pass the cart products to ProductList component
        <ProductList productList={cartProducts} isCartPage={true} />
      )}
    </div>
  );
}

export default Cart;
