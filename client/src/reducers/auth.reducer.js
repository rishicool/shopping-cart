import { combineReducers } from 'redux';

const loginUser = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_USER_LOADING':
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
      };
    case 'LOGIN_USER_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
      };
    case 'LOGIN_USER_FAIL':
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};

const passwordReset = (state = {}, action) => {
  switch (action.type) {
    case 'PASSWORD_RESET_LOADING':
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
      };
    case 'PASSWORD_RESET_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
      };
    case 'PASSWORD_RESET_FAIL':
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};

const forgotUser = (state = {}, action) => {
  switch (action.type) {
    case 'FORGOT_USER_LOADING':
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
      };
    case 'FORGOT_USER_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
      };
    case 'FORGOT_USER_FAIL':
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};

const registerUser = (state = {}, action) => {
  switch (action.type) {
    case 'REGISTER_USER_LOADING':
      var new_state = {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null,
      };
      return Object.assign({}, new_state, { callbackLink: '/profile' });
    case 'REGISTER_USER_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null,
      };
    case 'REGISTER_USER_FAIL':
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload,
      };
    
    default:
      return state;
  }
};

const authData = (state = {}, action) => {
  switch (action.type) {
    case 'AUTH_USER_SUCCESS':
      return {
        token: action.token,
        userDetails: action.user_details,
        isLoggedIn: true,
      };
    case 'AUTH_USER_FAIL':
      return {
        token: null,
        userDetails: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

const toastReduce = (state = {}, action) => {
  switch (action.type) {
    case 'TOAST_SHOW':      
      return {
        show: true,
        message: action.message
      };
    
    case 'TOAST_HIDE':
      return {
        show: false,
        message: ""
      };
    
    default:
      return {
        show: false,
        message: ""
      };
  }
};

export default combineReducers({
  registerUser,
  loginUser,
  passwordReset,
  forgotUser,
  authData,
  toastReduce,
});
