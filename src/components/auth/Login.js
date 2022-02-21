import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { Form, Button, Row, Col } from 'react-bootstrap';

import { FiEye, FiEyeOff } from "react-icons/fi";
import { connect } from "react-redux";
import { loginUser, toastShow, toastHide } from "../../actions/auth.actions";
import { fetchApi } from "../../service/api";

//const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const LoginSchema = yup.object().shape({
  username: yup.string().required("Username is Required"),
  password: yup
    .string()
    .min(4, ({ min }) => `Minimum ${min} digits`)
    .required("Password is required"),
});


function ErrorDisp(props) {
  return (
    <>
      {props.error && (
        <div className="InpErrorWrap">
          <div
            className="InpErrorS"
          >
            {props.error}
          </div>
        </div>
      )}
    </>
  )
}

class LogIn extends Component {
  state = {
    authError: false,
    initialValues: {
      username: "",
      password: "",
    },
    submitting: false,
    securePassword: true,
  };

  togglePasswordVisibility = () => {
    this.setState({ securePassword: !this.state.securePassword });
  };

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  loginUser = async (values) => {
    try {
      this.setState({ loading: true });
      const response = await fetchApi("auth/login", "POST", values, 200);
      if (response.responseBody.status !== 1) this.setState({ loading: false });
      else {
        
        const respon = await this.props.dispatch(loginUser(response.responseBody));
        await this.props.dispatch(toastShow(response.responseBody.message));
        values.fullname="";
        values.username="";
        values.email="";
        values.password="";
        this.setState(values);
        if (respon.status !== 1) {
          this.setState({ submitting: false });
          throw respon;
        } else {
        }
      }
    } catch (error) {
      this.setState({ submitting: false });
      let errorText;
      if (error.message) {
        errorText = error.message;
      }
      this.setState({ authError: errorText });
    }
  };

  onSubmit = (values) => {
    this.setState(
      {
        submitting: true,
      },
      () => {
        // console.log('SignIn Form Loading:', this.state.loading);
      }
    );
    if (
      values?.username !== "" &&
      values?.username !== undefined &&
      values?.username !== null
    ) {
      values.username = values.username.toLowerCase();
      values.socialType = "normal";
      values.deviceType = "Web";
      this.setState(values);
      this.loginUser(values);
    }
  };

  loginform() {
    return (<Formik
      enableReinitialize={true}
      validationSchema={LoginSchema}
      initialValues={this.state.initialValues}
      onSubmit={(values) => {
        this.onSubmit(values);
      }}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        validateForm,
        values,
        errors,
        isValid,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Field 
                name="username" >
                {({field, formProps}) => (
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control value={field.value} type="text" placeholder="Enter username" onChange={field.onChange}/>
                        <ErrorDisp error={errors.username} />
                    </Form.Group>
                )}
                </Field>

                <Field 
                name="password" >
                {({field, formProps}) => (
                    <Form.Group className="mb-3 pass-with-eye" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={field.value} type={this.state.securePassword ? "password" : "text"} placeholder="Password" onChange={field.onChange}/>
                        <ErrorDisp error={errors.password} />
                        <div
                            className="pass-btn"
                            onClick={() => this.togglePasswordVisibility()}
                        >
                            {this.state.securePassword ? <FiEye /> : <FiEyeOff />}
                        </div>
                    </Form.Group>
                )}
                </Field>

          <Button variant="primary" type="submit" >
            Submit
          </Button>
          <hr />
          <div className="auth-btn">
            <p>
              Don't have an account?{" "}
              <Link to="/auth/signup">Sign up</Link>
            </p>
          </div>
        </Form>

      )}
    </Formik>)
  }

  render() {
    return (
      <>
        <Row className="justify-content-md-center">
          <Col xs lg="3">
            <div className="form-wrap">
              {this.loginform()}
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loginUser: state.authReducer.loginUser,
  authData: state.authReducer.authData,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
