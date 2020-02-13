import React, { Component, Fragment } from 'react'
import './Cart.css'
// import { RootContext } from '../../App'
import axios from 'axios'
import Items from './Items'
import { Modal, Button } from 'react-bootstrap'


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_user: '',
            cart: [],
            qty: 0,
            setShow: false,
            id_cart: '',
            cekout: false,
            refresh: false
        }
    }

    handleClose = () => {
        this.setState({
            setShow: false,
            cekout: false
        })
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
        const id_user = this.parseJwt()
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

        // console.log(data.qty - 1)
        const newQty = data.qty - 1
        if (newQty < 1) {
            this.handleDelete(data)
        } else {
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
    }
    handlePlus = (data) => {
        const id_cart = data.id
        // console.log(data.id)
        axios.patch(`http://localhost:4001/api/v1/cart/add/${id_cart}`, {
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
    handleDelete = (data) => {
        this.setState({
            id_cart: data.id,
            setShow: true
        })
    }
    deleteOk = () => {
        const id_cart = this.state.id_cart
        axios.delete(`http://localhost:4001/api/v1/cart/${id_cart}`, {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
            .then((res) => {
                this.setState({
                    cart: res.data.result
                }, () => {
                    this.getAllCart()
                    this.handleClose()
                })
            })
    }
    handleAll = () => {
        const id_user = this.parseJwt()
        axios.delete(`http://localhost:4001/api/v1/cart/user/${id_user}`, {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
            .then((res) => {
                this.setState({
                    cart: res.data.result
                }, () => {
                    this.getAllCart()
                    this.handleClose()
                })
            })
    }

    handleCheckout = () => {
        this.setState({
            cekout: true
        })
    }
    checkoutOk = () => {
        const id_user = this.parseJwt()
        axios.get(`http://localhost:4001/api/v1/cart/checkout/all/${id_user}`, {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
            .then((res) => {
                this.setState({
                    cart: res.data.result
                }, () => {
                    this.handleClose()
                    window.location.href = "/home/history"
                })
            })
    }

    componentDidMount() {
        if (localStorage.getItem('Token')) {
            const id_user = this.parseJwt()
            this.setState({
                id_user: id_user
            }, () => {
                this.getAllCart()
                console.log(this.state)
            })
        }
    }

    render() {
        return (
            < Fragment >
                <div className="cover">
                    <div className="container-cart">
                        {
                            this.state.cart.length > 0 ?
                                this.state.cart.map(data => {
                                    return (
                                        <Items key={data.id} data={data} minus={() => this.handleMinus(data)} plus={() => this.handlePlus(data)} delete={() => this.handleDelete(data)} />
                                    )
                                })
                                : (
                                    <p>Cart Empty!</p>
                                )
                        }
                    </div>
                    <div className="footer">
                        {/* <p>Total</p> <p>Rp. {this.state.total}</p> */}
                        <Button className="btn btn-primary" onClick={() => this.handleCheckout()}>Checkout</Button>
                        <Button className="btn btn-danger" onClick={() => this.handleAll()}>Cancel</Button>
                    </div>
                </div>



                <Modal show={this.state.setShow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are You Sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Delete the selected item?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                  </Button>
                        <Button variant="danger" onClick={this.deleteOk}>
                            Delete
                  </Button>
                    </Modal.Footer>
                </Modal>

                {/* checkoout */}
                <Modal show={this.state.cekout} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Checkout</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Checkout all item?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cancel
                  </Button>
                        <Button variant="primary" onClick={this.checkoutOk}>
                            Yes
                  </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment >
        )
    }
}

export default Cart;