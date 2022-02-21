import React, { Component } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { Form, Button, Row, Col } from 'react-bootstrap';

import { connect } from "react-redux";
import { registerUser, toastShow, toastHide } from "../../actions/auth.actions";
import { fetchApi } from "../../service/api";

const SignupSchema = yup.object().shape({
    fullname: yup.string().required("Full Name is Required"),
    username: yup.string().required("Username is Required"),
    email: yup.string().email('Must be a valid email').max(255).required("Email is Required"),
    password: yup
        .string()
        .min(6, ({ min }) => `Minimum ${min} digits`)
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

class Signup extends Component {
    state = {
        authError: false,
        initialValues: {
            fullname: "",
            username: "",
            email: "",
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

    registerUser = async (values) => {
        try {
            this.setState({ loading: true });
            const response = await fetchApi("auth/signup", "POST", values, 200);
            if (response.responseBody.status !== 1) this.setState({ loading: false });
            else {
                const respon = await this.props.dispatch(registerUser(response));
                this.props.dispatch(toastShow(response.responseBody.message));
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
            this.setState(values);
            this.registerUser(values);
        }
    };

    loginform() {
        return (<Formik
            enableReinitialize={true}
            validationSchema={SignupSchema}
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
                name="fullname"  
                render={({field, formProps}) => (
                    <Form.Group className="mb-3" controlId="fullname">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control value={field.value} name="fullname" type="text" placeholder="Enter full name" onChange={field.onChange} />
                        <ErrorDisp error={errors.fullname} />
                    </Form.Group>
                )}
                />
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
                name="email" >
                {({field, formProps}) => (
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control value={field.value} type="email" placeholder="Enter email" onChange={field.onChange} />
                        <ErrorDisp error={errors.email} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
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
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <hr />
                    <div className="auth-btn">
                        <p>
                            Already got an account?{" "}
                            <Link to="/auth/login">Login</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);