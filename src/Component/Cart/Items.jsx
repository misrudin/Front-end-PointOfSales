import React from 'react'

const Items = (props) => {
    return (
        <div className="box-cart">
            <div className="item-cart">
                <img src={props.data.image} alt="Cart-Img" />
            </div>
            <div className="cart-product">
                <p className="name-product">{props.data.name}</p>
                <p className="des-product">{props.data.price} </p>
            </div>
            <div className="qty">
                <div className="minus" onClick={() => props.minus(props.data)}>-</div>
                <div className="value-cart">{props.data.qty} </div>
                <div className="plus" onClick={() => props.plus(props.data)}>+</div>
            </div>
            <div className="action-cart">
                <p>Delete</p>
            </div>
        </div>
    )
}

export default Items