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
        this.addToCart = this.addToCart.bind(this);
        this.isProductOnCart = this.isProductOnCart.bind(this);
    }

    componentDidMount = async () => {
        
        const { getUser: { token, isLoggedIn } } = this.props;
        const response2 = await fetchApi('cart', 'GET', null, 200, token);
        if (isLoggedIn) {
            await this.props.dispatch(setCart(response2.responseBody.data));
        }
        const response = await fetchApi('products/all', 'GET', null, 200);
        // console.log(response.responseBody);
        this.setState({ data: response.responseBody.data, loading: false });
    }

    addToCart = async (product) => {
        product = {...product, product_id: product.id, qty: 1};
        const { getUser: { token, isLoggedIn } } = this.props;
        if (isLoggedIn) {
            await this.props.dispatch(addToCart(product));
            const response = await fetchApi('cart/add-to-cart', 'POST', product, 200, token);
            if (response.responseBody.status) {
                //
            }

        }
        this.props.dispatch(toastShow("Added to cart successfully"));
    }

    updateQty = async (cartItem, qty) => {
        const { getUser: { token, isLoggedIn } } = this.props;
        if (!isLoggedIn) {
            return false;
        }
        if(qty == 0){
            await this.props.dispatch(deleteFromCart(cartItem));
            const response = await fetchApi('cart/remove', 'POST', cartItem, 200, token);            
            return;    
        }
        if(qty > 10){
            return;
        }
        cartItem.qty = qty;
        await this.props.dispatch(addToCart(cartItem));
        const response = await fetchApi('cart/update-cart', 'POST', cartItem, 200, token);            
    }

    isProductOnCart(product_id) {
        const { addToCart: { cart } } = this.props;
        if (typeof cart == "undefined" || typeof cart == null && Object.keys(cart).length == 0) {
            return 0;
        }
        if (Object.keys(cart).length == 0) {
            return 0;
        }
        
        for(var i in cart){
            if(cart[i].product_id == product_id){
                return cart[i];
            }
        }
        return 0;
    }

    productCard(item, key) {
        const isOnCart = this.isProductOnCart(item.id);
        // console.log(typeof isOnCart);
        return (<Col key={key} xs={2} lg={5} xl={4} xxl={3}><Card className="product-card">
            <Image fluid thumbnail variant="top" className="product-image" src={item.image} />
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                    {item.description}
                </Card.Text>
                <Card.Text>
                    <b>$</b>{item.price}
                </Card.Text>
                {typeof isOnCart == "object" && this.cartAddedInput(item, isOnCart)}
                {typeof isOnCart == "number" &&
                    <Button variant="primary" onClick={() => this.addToCart(item)}>Add To Cart</Button>}
            </Card.Body>
        </Card></Col>);
    }

    cartAddedInput(item, cartItem) {
        
        return (
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
                <Row>
                    {this.listProducts()}
                </Row>
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
