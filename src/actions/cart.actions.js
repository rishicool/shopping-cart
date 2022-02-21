
// Add to cart
export const addToCart = (payload) => {
  return async (dispatch) => {
    
        dispatch({
          type: 'ADD_TO_CART_SUCCESS',
          product: payload,
        });
        return payload;
  };
};

// Delete from cart
export const deleteFromCart = (payload) => {
  
  return async (dispatch) => {
    
        dispatch({
          type: 'DELETE_FROM_CART',
          product: payload,
        });
        return payload;
  };
};

// reset cart from onload
export const setCart = (payload) => {
  return async (dispatch) => {
    
        dispatch({
          type: 'SET_TO_CART',
          product: payload,
        });
        return payload;
  };
};
