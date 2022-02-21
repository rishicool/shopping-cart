// Services
import { fetchApi } from '../service/api';

// Register User
export const registerUser = (payload) => {
  return async (dispatch) => {
      // for authentication
        dispatch({
          type: 'AUTH_USER_SUCCESS',
          token: payload.token,
          isLoggedIn: true,
          user_details: payload.token,
        });

        dispatch({
          type: 'GET_USER_SUCCESS',
          isLoggedIn: true,
          payload: payload.token,
          user_details: payload.token,
        });

        return payload.token;
      
  };
};

// Login User
export const loginUser = (payload) => {
  return async (dispatch) => {
    
          dispatch({
            type: 'AUTH_USER_SUCCESS',
            token: payload.token,
            isLoggedIn: true,
            user_details: payload.token,
          });

          dispatch({
            type: 'GET_USER_SUCCESS',
            token: payload.token,
            isLoggedIn: true,
            payload: payload.token,
          });
    
  };
};

export const updateUser = (payload, token) => {
  return async (dispatch) => {
    payload.by_method = 'mobile';
    try {
      dispatch({
        type: 'AUTH_USER_SUCCESS',
        token: token,
        user_details: payload.responseBody.data,
      });


    } catch (error) {
     // console.log('update error on user data while location update', error)
      // dispatch({
      //   type: 'LOGIN_USER_FAIL',
      //   payload: error.responseBody,
      // });
      return error;
    }
  };
};

// Password Reset
export const passwordReset = (payload) => {

  return async (dispatch) => {
    payload.by_method = 'mobile';
    try {

      dispatch({
        type: 'PASSWORD_RESET_LOADING',
      });
      const response = await fetchApi(
        'auth/resetForgotPassword',
        'PUT',
        payload,
        200,
      );

      if (response.responseBody && response.responseBody.status === 1) {

        dispatch({
          type: 'PASSWORD_RESET_SUCCESS',
        });
        dispatch({
          type: 'AUTH_USER_SUCCESS',
          token: response.responseBody.data.token,
          // session: response.responseHeaders.get('set-cookie'),
          user_details: response.responseBody.data.user,
        });
        dispatch({
          type: 'GET_USER_SUCCESS',
          payload: response.responseBody,
        });
        return response.responseBody;
      } else {
        dispatch({
          type: 'PASSWORD_RESET_FAIL',
          payload: response.responseBody,
        });
        return response.responseBody;
      }
    } catch (error) {
    //  console.log('tryfailed')
      dispatch({
        type: 'PASSWORD_RESET_FAIL',
        payload: error.responseBody,
      });
      return error;
    }
  };
};

// Forgot User
export const forgotUser = (payload) => {
  // console.log('JaganPostForgotPassword:', payload);
  return async (dispatch) => {
    payload.by_method = 'mobile';
    try {
      dispatch({
        type: 'FORGOT_USER_LOADING',
      });
      const response = await fetchApi(
        'auth/forgotPassword',
        'POST',
        payload,
        200,
      );
      if (response.responseBody && response.responseBody.status === 1) {
        dispatch({
          type: 'FORGOT_USER_SUCCESS',
        });
        return response.responseBody;
      } else {
        dispatch({
          type: 'FORGOT_USER_FAIL',
          payload: response.responseBody,
        });
        return response.responseBody;
      }
    } catch (error) {
      dispatch({
        type: 'LOGIN_USER_FAIL',
        payload: error.responseBody,
      });
      return error;
    }
  };
};


// Toast Show 
export const toastShow = (message) => {

  return async (dispatch) => {
        dispatch({
          type: 'TOAST_SHOW',
          show: true,
          message: message,
        });
        return message;
    }
};

// Toast Hide
export const toastHide = (payload) => {

  return async (dispatch) => {
        dispatch({
          type: 'TOAST_HIDE',
          show: false,
          message: "",
        });
        return payload;
    }
};


// Logout User
export const logoutUser = () => {
  
  return async (dispatch, getState) => {
    const state = getState();

    try {
      const {
        authReducer: {
          authData: { token },
        },
      } = state;
      // console.log(token);
      await fetchApi(
        'auth/logout',
        'POST',
        {},
        200,
        token,
      );

      // messaging().deleteToken();
      dispatch({
        type: 'USER_LOGGED_OUT_SUCCESS',
      });
    } catch (e) {
     // console.log('logout dispatch error',e);
    }
  };
};
