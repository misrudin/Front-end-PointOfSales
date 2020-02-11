import React, { Component } from 'react';
import './Product.css'
import axios from 'axios'

class Product extends Component {
    constructor(props) {
        super(props)


        this.state = {
            id_user: '',
            qty: 1,
            id_product: ''
        }

    }
    parseJwt = () => {
        const token = localStorage.getItem('Token')
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const decoded = JSON.parse(jsonPayload);
        return decoded.id_user
    };


    handeAddToCart = (id_product) => {
        const id_user = this.parseJwt()
        this.setState({
            id_user: id_user,
            id_product: id_product
        }, () => {
            console.log(this.state)
            const data = this.state
            axios.post('http://localhost:4001/api/v1/product/addtocart', data, {
                headers: {
                    token: localStorage.getItem('Token')
                }
            })
                .then((res) => {
                    console.log(res)
                    window.location.href = "/home/product"
                })
        })
    }
    render() {
        return (
            <div className="item">
                <img className="imgProduct" src={this.props.data.image} alt="imgProduct" />
                <div className="detail">

                    <p className="addtocart" onClick={() => this.handeAddToCart(this.props.data.id)} >Add To Cart</p>
                    <p className="addtocart">Detail</p>

                    <span className="name"> {this.props.data.name} </span>
                    <span className="price">Rp. {this.props.data.price} </span>

                </div>
            </div>

        );
    }
}

export default Product;