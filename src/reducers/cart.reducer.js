import { combineReducers } from 'redux';
const initialState = {
  cart: [],

};

const addToCart = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TO_CART_SUCCESS':
      var tempCart = {...state.cart};
      
      if(Object.keys(tempCart).length == 0){
        tempCart[action.product.product_id] = action.product;
      }else{
        tempCart[action.product.product_id] = action.product;
      }
      return {
        ...state,
        cart: tempCart,
      };  
      
      case 'DELETE_FROM_CART':
        var tempCart = {...state.cart};
        delete tempCart[action.product.product_id];
        return {
          ...state,
          cart: tempCart
        }

      case 'SET_TO_CART':
        return { cart: action.product}

      // case 'UPDATE_QTY':
      // return {
      //   ...state,
      //   cart: state.cart.map(el => {
      //     console.log(el.product_id, action.product.product_id);
      //     if (el.product_id === action.product.product_id) {
      //       return {
      //         ...el,
      //         qty: action.product.qty
      //       }
      //     }

      //     return el;
      //   })
      // };
    
    default:
      return state;
  }
};



export default combineReducers({
  addToCart,
});
