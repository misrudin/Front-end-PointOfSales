import React, { Component } from 'react';
import './Product.css'
// import { RootContext } from '../../../index'

class Product extends Component {
    constructor(props) {
        super(props)


        this.state = {
            id_user: '',
            qty: 1,
            id_product: ''
        }

    }

    render() {
        return (
            // <RootContext.Provider>
            //     {
            //         value => {
            //             return (
            <div className="item" onClick={() => this.props.crt(this.props.data)}>
                <img className="imgProduct" src={this.props.data.image} alt="imgProduct" />
                <div className="detail">
                    <span className="name"> {this.props.data.name} </span>
                    <span className="price">Rp. {this.props.data.price} </span>
                </div>
            </div>
            //             )
            //         }
            //     }
            // </RootContext.Provider >

        );
    }
}

export default Product;