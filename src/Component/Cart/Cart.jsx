import React, { Component, Fragment } from 'react'
import './Cart.css'
// import { RootContext } from '../../App'
import axios from 'axios'
import Items from './Items'

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_user: '',
            cart: [],
            qty: 0
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

    getAllCart = () => {
        const id_user = this.state.id_user
        axios.get(`http://localhost:4001/api/v1/cart/${id_user}`, {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
            .then((res) => {
                this.setState({
                    cart: res.data.result
                }, () => {
                    const cart = this.state.cart
                    const newQty = []
                    cart.forEach((e) => {
                        newQty.push(e.qty)
                    })
                    this.setState({
                        qty: newQty.reduce((a, b) => a + b, 0)
                    })
                })
            })
    }


    handleMinus = (data) => {
        const id_cart = data.id
        console.log(data.id)
        axios.patch(`http://localhost:4001/api/v1/cart/min/${id_cart}`, {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
            .then((res) => {
                this.setState({
                    cart: res.data.result
                }, () => {
                    this.getAllCart()
                })
            })
    }
    handlePlus = (data) => {
        console.log('plus')
        console.log(data.id)
    }

    componentDidMount() {
        const id_user = this.parseJwt()
        this.setState({
            id_user: id_user
        }, () => {
            this.getAllCart()
        })
    }

    render() {
        return (

            <Fragment>
                <div className="header-cart">

                </div>
                <div className="container-cart">
                    {
                        this.state.cart !== 'undefined' && this.state.cart.length > 0 ?
                            this.state.cart.map(data => {
                                return (
                                    <Items key={data.id} data={data} minus={() => this.handleMinus(data)} plus={() => this.handlePlus(data)} />
                                )
                            })
                            : (
                                <p>Loading</p>
                            )
                    }


                </div>
                <div className="footer-cart"></div>
            </Fragment>
        );
    }
}

export default Cart;