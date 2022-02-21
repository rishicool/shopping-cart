import TopBar from "../components/layouts/TopBar";
import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Listing from "../components/cart/Listing";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchApi } from '../service/api';
import PaypalBtn from 'react-paypal-checkout';
import { toastShow } from "../actions/auth.actions";
class CartPage extends Component {
    state = {
        total: 0,
        env : 'sandbox', // you can set here to 'production' for production
        currency : 'USD', // or you can set this value from your props or state  
        total : 1,  // same as above, this is the total amount (based on currency) to be 
        locale : 'en_US',
        // For Customize Style: https://developer.paypal.com/docs/checkout/how-to/customize-button/
        style : {
        'label':'pay', 
        'tagline': false, 
        'size':'medium', 
        'shape':'pill', 
        'color':'gold'
        }
    }

    cartTotal(){
        let { toastReduce: { show, message }, addToCart: { qty, cart } } = this.props;
        let total = 0;
        // console.log(cart);
        for(var i in cart){
            let obj = cart[i];
            var singleTotal = obj.price * obj.qty;
            total = total + singleTotal;
        }
        return total.toFixed(2);
    }

    async emptyCart(){
        const { getUser: { token, isLoggedIn } } = this.props;
        const response2 = await fetchApi('cart/clear', 'POST', null, 200, token);
        if (isLoggedIn) {
            this.setState({ data: [], loading: false });
        }
    }

    onSuccess = async (payment) => {
        let { toastReduce: { show, message }, addToCart: { qty, cart } } = this.props;
        // Congratulation, it came here means everything's fine!
        // console.log("Thank you for confirming Order, will notify you on delivery time", payment);
        await this.emptyCart();
        this.props.history.push("/payment-success");
        this.props.dispatch(toastShow("Thank you for confirming Order, will notify you on delivery time"));

    }		

    onCancel = (data) => {
        // User pressed "cancel" or close Paypal's popup!
        // console.log('The payment was cancelled!', data);
        this.props.dispatch(toastShow("Looks like you are not ready for payment, please try again later"));
        
    }	

    onError = (err) => {
        // The main Paypal's script cannot be loaded or somethings block the loading of that script!
        console.log("Error!", err);		
    }			

    render() {
        const client = {
            sandbox:    'ATcaBOMb12fgixF17j9ErQqaM6J1ddsp__23YdMLu_ua0lX7Bnnzso5mmlZ3VTEjPXsLzlYZYMQTSHHd',
            production: 'YOUR-PRODUCTION-APP-ID',
            }
        let total = this.cartTotal();
        total = parseFloat(total);
        return (
            <>
                <Container>
                    <TopBar />
                    <div className="center-body-wrap">
                        <Row className='justify-content-md-center text-center mt-5 mb-4'>
                            <Col lg={8}>
                                <h4>Great! Lets complete your order</h4>
                            </Col>
                        </Row>
                        <Row className='justify-content-md-center '>
                            <Col lg={10}>
                            <Row className='mt-5 mb-4'>
                                <Col lg={6}>
                                    <Link to="/">Continue Shopping</Link>
                                </Col>
                                <Col lg={6} className="text-end">
                                <PaypalBtn 
                                    env={this.state.env} 
                                    client={client} 
                                    currency={this.state.currency} 
                                    total={total} 
                                    locale={this.state.locale} 
                                    style={this.state.style}
                                    onError={this.onError} 
                                    onSuccess={this.onSuccess} 
                                    onCancel={this.onCancel} />
                                    {/* <Link className="btn btn-success" to="/checkout">Checkout</Link> */}
                                </Col>
                                </Row>
                            </Col>
                        

                        </Row>
                        <Row className="justify-content-md-center">
                            <Col lg={10}>
                                <Row className="cart-list-row">
                                    <Col className="cart-list-col" lg={7}>
                                        Description
                                    </Col>
                                    <Col className="cart-list-col" lg={3} >
                                        Quantity
                                    </Col>
                                    <Col className="cart-list-col text-end" lg={2} >
                                        Price
                                    </Col>
                                </Row>
                                <Listing />
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col lg={10}>
                                <Row className="cart-list-end-row">
                                    <Col className="cart-list-col" lg={7}><Link to="/" onClick={() => this.emptyCart()}>Empty Cart</Link></Col>
                                    <Col className="cart-list-col text-end" lg={3}>Sub Total: </Col>
                                    <Col className="cart-list-col text-end fw-bold" lg={2}>${this.cartTotal()} </Col>
                                </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
