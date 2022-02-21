// Core
import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import { Card, Row, Col, Image, Toast, ToastContainer } from 'react-bootstrap';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

// custom components and functions
import { fetchApi } from '../../service/api';

import { addToCart, deleteFromCart, setCart } from "../../actions/cart.actions";
import { toastShow } from "../../actions/auth.actions";


class Listing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            toast: {
                show: false,
                message: "No Message",
            }
        };
    }

    componentDidMount = async () => {
        this.syncCart();
    };

    syncCart = async () => {
        const { getUser: { token, isLoggedIn } } = this.props;
        const response2 = await fetchApi('cart', 'GET', null, 200, token);
        if (isLoggedIn) {
            await this.props.dispatch(setCart(response2.responseBody.data));
            this.setState({ data: response2.responseBody.data, loading: false });
        }
    }

    

    updateQty = async (cartItem, qty) => {
        const { getUser: { token, isLoggedIn } } = this.props;
        if (!isLoggedIn) {
            return false;
        }
        if (qty == 0) {
            await this.props.dispatch(deleteFromCart(cartItem));
            const response = await fetchApi('cart/remove', 'POST', cartItem, 200, token);
            this.syncCart();
            return;
        }
        if (qty > 10) {
            return;
        }
        cartItem.qty = qty;
        // await this.props.dispatch(addToCart(cartItem));
        await fetchApi('cart/update-cart', 'POST', cartItem, 200, token);
        this.syncCart();
    }

    emptyList(){
        return (
            <Row>
                <Col className="cart-list-col justify-content-lg-center text-center mb-4" lg={12}>Cart Looks like empty</Col>
            </Row>
        )
    }

    productCard(item, key) {
        return (
            <Row key={key}>
                <Col className="cart-list-col" lg={7}>
                    <Row className="mb-5">
                        <Col xs={3}>
                            <Image variant="top" className="cart-prod-image" src={item.image} />
                        </Col>
                        <Col xs={4}>
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-desc"> {item.description}</div>
                        </Col>
                    </Row>
                </Col>
                <Col className="cart-list-col justify-content-lg-center" lg={3} >{this.cartAddedInput(item)}</Col>
                <Col className="cart-list-col text-end" lg={2} ><div className="cart-item-price"><b>$</b> {item.price}</div></Col>
            </Row>);
    }
    
    cartAddedInput(cartItem) {
        return(
            <Row className="justify-content-lg-center">
                <Col xs={8}>
                    <InputGroup className="">
                        <Button type="button" onClick={() => this.updateQty(cartItem, cartItem.qty - 1)}>-</Button>
                        <FormControl type="number" value={cartItem.qty} onChange={(e) => this.updateQty(cartItem, e.target.value)} />
                        <Button type="button" onClick={() => this.updateQty(cartItem, cartItem.qty + 1)}>+</Button>
                    </InputGroup>
                </Col>
            </Row>
        );
    }

    listProducts() {
        var data = this.state.data;
        return (
            <>
                {data.length == 0 && this.emptyList()}
                {data.length > 0 && data.map((item, key) => {
                    return this.productCard(item, key)
                })
                }
            </>
        )
    }

    render() {
        return (
            <>
                {this.listProducts()}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    getUser: state.userReducer.getUser,
    authData: state.authReducer.authData,
    addToCart: state.cartReducer.addToCart,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
