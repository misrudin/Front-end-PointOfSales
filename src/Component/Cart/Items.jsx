import React from 'react'


const Items = (props) => {
    return (
        <div className="box-cart">
            <div className="item-cart">
                <img src={props.data.image} alt="Cart-Img" />
            </div>
            <div className="cart-product">
                <p className="name-product">{props.data.name}</p>
                <div className="qty">
                    <div className="minus" onClick={() => props.minus(props.data)}>-</div>
                    <div className="value-cart">{props.data.qty} </div>
                    <div className="plus" onClick={() => props.plus(props.data)}>+</div>
                </div>
            </div>
            <p className="des-product">Rp. {props.data.price * props.data.qty} </p>
        </div>
    )
}

export default Items