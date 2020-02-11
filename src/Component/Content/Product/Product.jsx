import React from 'react';
import './Product.css'
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
// import Tooltip from 'react-bootstrap/Tooltip'

const Product = (props) => {

    return (
        <div className="item">
            <img className="imgProduct" src={props.image} alt="imgProduct" />
            <div className="detail">
                {/* <OverlayTrigger
                    placement="auto"
                    delay={{ show: 100, hide: 0 }}
                    overlay={
                        <Tooltip><strong>Add To Cart</strong></Tooltip>
                    }
                > */}
                <p className="addtocart">Add To Cart</p>
                <p className="addtocart">Detail</p>
                {/* </OverlayTrigger> */}

                <span className="name"> {props.name} </span>
                <span className="price">Rp. {props.price} </span>
                {/* <div className="product">
                </div> */}
            </div>
        </div>
    );
}

export default Product;