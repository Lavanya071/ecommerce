const initialState = {
  cartProducts: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CART":
      return {
        ...state,
        cartProducts: action.payload, // Set the cart data from localStorage
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cartProducts: [...state.cartProducts, action.payload],
      };
    case "REMOVE_ONE_FROM_CART":
      return {
        ...state,
        cartProducts: state.cartProducts.filter(item => item.id !== action.payload.id),
      };
    // Handle other actions (like REMOVE_FROM_CART, CLEAR_CART)...
    default:
      return state;
  }
};

export default cartReducer;
