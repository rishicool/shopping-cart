import {combineReducers} from 'redux';


const getUser = (state = {}, action) => {
  switch (action.type) {
    case 'GET_USER_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        userDetails: action.payload,
        isLoggedIn: true,
        token: action.token,
        errors: null,
      };
    
    default:
      return state;
  }
};

export default combineReducers({
  getUser,
});
