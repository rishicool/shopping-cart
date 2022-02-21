import { logoutUser } from '../actions/auth.actions';
import { connect } from 'react-redux';
import axios from "axios";

export const fetchApi = async (url, method, body, statusCode, token = null, isFormData) => {
  // const BASE_URL = process.env.REACT_APP_API_URL;
  const BASE_URL = global.ENV.BASE_URL;
  try {
    let headers = {
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
      // 'DeviceId' : "",
      // 'DeviceType' : "Web",
    }
    if (token) {
      headers['Authorization'] = 'Bearer '+token;
    }
    
    var response = await axios({
      method: method,
      baseURL: BASE_URL,
      headers: headers,
      url: url,
      timeout: 30000,
      data: body,
    });

    const result = {
      session: null,
      success: false,
      responseBody: null,
    };
    if (response.status === 401) {
      // Need to work on this.
    //  console.log('Need to Logout User (Trigger Dispatch Function Here)');
      this.props.dispatch(logoutUser());
    }

    if (response.status === statusCode) {
      result.success = true;
      const responseBody = response.data;
      // console.log(responseBody, "respoinse");
      if (responseBody.token) {
        result.token = responseBody.token;
      }
    
      result.responseBody = responseBody;
      result.responseHeaders = response.headers;
      return result;
    }
    
    result.responseBody = response.data;
    // console.log(result);
    throw result;
  } catch (error) {
    return error;
  }
};


const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect( mapDispatchToProps)(fetchApi);