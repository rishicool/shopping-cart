import React, { Component } from "react";
import { Navbar, Container, Nav, Badge, Toast, ToastContainer } from 'react-bootstrap'
import { Cart } from 'react-bootstrap-icons';
import { BagCheckFill } from 'react-bootstrap-icons';
import { registerUser, logoutUser, toastHide } from "../../actions/auth.actions";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";

import { connect } from "react-redux";


class TopBar extends Component {

    logout() {
        this.props.dispatch(logoutUser());
    }

    componentDidMount() {

    }

    hideToast() {
        this.props.dispatch(toastHide("dds"));
    }


    render() {
        let { toastReduce: { show, message }, getUser: { isLoggedIn }, addToCart: { qty, cart } } = this.props;
        return (
            <>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar>
                        <Link className="logo-name" to="/">Shopping Cart</Link>
                        </Navbar>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                            <Nav >
                                {!isLoggedIn &&
                                    <Nav.Link href="/auth/login">
                                        Login
                                    </Nav.Link>}
                                {isLoggedIn &&
                                <>
                                    <Nav.Link onClick={() => this.logout()}>
                                        Logout
                                    </Nav.Link>

                                    
                                <Link to="/cart" className="cart-nav">
                                    <Cart className="cart-top-icon" />
                                    {typeof cart != "undefined" && typeof cart != null &&
                                    <Badge bg={"danger"} className="cart-badge">{Object.keys(cart).length}</Badge>
                                    }
                                </Link></>}
                            </Nav>
                        </Navbar.Collapse>
                        <ToastContainer className="p-3" position={"top-center"}>
                            <Toast onClose={() => this.hideToast()} autohide delay={6000} show={show}>
                                <Toast.Body><BagCheckFill style={{ fontSize: 18, color: "green", display: "inline-block", marginTop: -6 }} /> {message}</Toast.Body>
                            </Toast>
                        </ToastContainer>
                    </Container>
                </Navbar>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    toastReduce: state.authReducer.toastReduce,
    authData: state.authReducer.authData,
    getUser: state.userReducer.getUser,
    addToCart: state.cartReducer.addToCart,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
