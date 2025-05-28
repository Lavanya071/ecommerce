// cartActions.js

// Helper function to get the current user's ID (stored after login)
export const getUserId = () => {
  const userData = localStorage.getItem('user'); // Assuming 'user' is the key you're using for user data
  try {
    return userData ? JSON.parse(userData).userId : null; // Check if data exists before parsing
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
    return null; // Return null or handle the error as needed
  }
};

// Action to set the cart from localStorage when the page is refreshed or user logs in
export const setCart = () => {
  return (dispatch) => {
    const userId = getUserId();  // Get the logged-in user's ID
    if (!userId) return;  // If no user is logged in, skip loading the cart
    
    // Load the cart from localStorage using the userId
    const cartFromStorage = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
    dispatch({
      type: 'SET_CART',
      payload: cartFromStorage,
    });
  };
};

// Action to add a product to the cart
export const addToCart = (product) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: product,
    });

    // Save the updated cart to localStorage using the user's ID
    const cart = getState().cartReducer.cartProducts;
    const userId = getUserId();
    if (userId) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cart)); // Store cart by userId in localStorage
    }
  };
};

// Action to remove a product from the cart
export const removeOneFromCart = (product) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'REMOVE_ONE_FROM_CART',
      payload: product,
    });

    const cart = getState().cartReducer.cartProducts;
    const userId = getUserId();
    if (userId) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cart)); // Update cart in localStorage
    }
  };
};

// Action to delete a product from the cart completely
export const deleteFromCart = (product) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'DELETE_FROM_CART',
      payload: product,
    });

    const cart = getState().cartReducer.cartProducts;
    const userId = getUserId();
    if (userId) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cart)); // Update cart in localStorage
    }
  };
};

// Action to clear the cart
export const clearCart = () => {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_CART',
    });

    // Clear cart from localStorage
    const userId = getUserId();
    if (userId) {
      localStorage.removeItem(`cart_${userId}`); // Remove cart from localStorage when logged out
    }
  };
};
