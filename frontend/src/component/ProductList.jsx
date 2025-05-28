import React from 'react';
import { FaSquarePlus, FaSquareMinus } from 'react-icons/fa6';
import { action } from '../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProductList(props) {
  const { productList, isCartPage } = props;
  const cartProducts = useSelector((store) => store.cartReducer.cartProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddProduct = (product) => {
    dispatch(action.addToCart(product));
  };

  const handleRemoveProduct = (product) => {
    dispatch(action.removeOneFromCart(product));
  };

  const handleDeleteProduct = (product) => {
    dispatch(action.deleteFromCart(product)); // Completely remove from cart
  };

  const handleAddToCartAndNavigate = (product) => {
    dispatch(action.addToCart(product));
    navigate('/cart');
  };

  return (
    <>
      {productList == null ? (
        <h3>Loading...</h3>
      ) : (
        productList.map((product) => {
          return (
            <div className="product" key={product.id}>
              <img src={product.image} className="product_image" alt={product.title} />
              <div className="product_meta">
                <p className="product_title">{product.title}</p>
                <p className="Price">$ {product.price}</p>
              </div>

              <div className="add_to_cart_container">
                <FaSquareMinus
                  fontSize="large"
                  onClick={() => handleRemoveProduct(product)}
                />

                <div className="currentCartCount">
                  <PrintCount cartProducts={cartProducts} id={product.id} />
                </div>

                <FaSquarePlus
                  fontSize="large"
                  onClick={() => handleAddProduct(product)}
                />
              </div>

              {!isCartPage && (
                <button
                  className="add_to_cart_button"
                  onClick={() => handleAddToCartAndNavigate(product)}
                >
                  Add to Cart
                </button>
              )}

              {isCartPage && (
                <button
                  className="remove_from_cart_button"
                  onClick={() => handleDeleteProduct(product)}
                >
                  Remove From Cart
                </button>
              )}
            </div>
          );
        })
      )}
    </>
  );
}

function PrintCount({ cartProducts, id }) {
  const item = cartProducts.find((p) => p.id === id);
  return <>{item ? item.indQuantity : 0}</>;
}

export default ProductList;
