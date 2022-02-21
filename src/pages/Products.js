import React from "react-dom";
import Container from 'react-bootstrap/Container'
import TopBar from "../components/layouts/TopBar";
import Listing from "../components/products/Listing";

const Products = () =>{
    return (
        <>
            <Container>
                    <TopBar />
                    <div className="center-body-wrap">
                    <Listing />
                    </div>                
            </Container>
        </>
    )
}

export default Products;