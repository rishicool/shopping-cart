import TopBar from "../components/layouts/TopBar";
import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Listing from "../components/cart/Listing";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { BagCheckFill } from 'react-bootstrap-icons';
class PaymentSuccess extends Component {
    state = {
        
        
    }

    
    render() {
        
        return (
            <>
                <Container>
                    <TopBar />
                    <div className="center-body-wrap">
                        <Row className='justify-content-md-center text-center mt-5 mb-4'>
                            <Col lg={8}>
                                <BagCheckFill style={{fontSize: 50, color: "green"}}/>
                            </Col>
                        </Row>
                        <Row className='justify-content-md-center text-center mt-5 mb-4'>
                            <Col lg={8}>
                                <h4>Congratulation! your payment was successful</h4>
                                <p>We have started proccessing your delivery items</p>
                            </Col>
                        </Row>
                        
                    </div>
                </Container>
            </>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSuccess);
