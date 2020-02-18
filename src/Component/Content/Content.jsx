import React, { Component } from 'react';
import './Content.css'
import Product from './Product/Product'
import { connect } from 'react-redux'
import '../Cart/Cart.css'
import Items from '../Cart/Items'
import { Modal, Button } from 'react-bootstrap'
import { getAllProduct } from '../../redux/actions/product'
import { addProductToCart, getAllCart, getQty, checkOutAll, deleteAll, getDetail, addQty, minQty, deleteCart } from '../../redux/actions/cart'
import swal from 'sweetalert'
import picEmpty from '../../img/food-and-restaurant.svg'


class Content extends Component {
    state = {
        product: [],
        cartData: [],
        cart: {
            id_user: '',
            qty: 1,
            id_product: ''
        },
        dataproduct: {
            name: '',
            description: '',
            price: '',
            image: null,
            id_category: '',
            stok: 0
        },
        keyword: '',
        qty: 0,
        total: 0,
        modalCheckout: false,
        printCheckout: false,
        formCheckOut: {
            faktur: '',
            id_user: '',
            qty: '',
            total: ''
        },
        detailCart: [],
        id_user: '',
        username: ''
    }

    handleClose = () => {
        this.setState({
            modalCheckout: false,
            printCheckout: false
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
        return decoded
    };

    searchProduct = (e) => {
        const keyword = e.target.value
        this.setState({
            keyword: keyword
        })
    }

    sendQty = () => {
        const cart = this.state.cartData
        const newQty = []
        cart.forEach((e) => {
            newQty.push(e.qty)
        })
        this.setState({
            qty: newQty.reduce((a, b) => a + b, 0)
        })

        const newTotal = []
        cart.forEach((e) => {
            newTotal.push(e.qty * e.price)
        })
        this.setState({
            total: newTotal.reduce((a, b) => a + b, 0)
        })

        this.props.dispatch(getQty(this.state.qty))
    }

    getProduct = async () => {
        await this.props.dispatch(getAllProduct());
        this.setState({
            product: this.props.product.productData
        });
    }

    getAllCart = async () => {
        await this.props.dispatch(getAllCart())
        this.setState({
            cartData: this.props.cart.cartData
        })
        setTimeout(() => {
            this.sendQty()
        }, 100)
    }

    getDetailCart = async (faktur) => {
        // const faktur = this.state.formCheckOut.faktur
        await this.props.dispatch(getDetail(faktur))
        this.setState({
            detailCart: this.props.cart.cartDetail
        })
        setTimeout(() => {
            console.log(this.state.detailCart)
        }, 2000)
    }

    handleAddToCart = (product) => {
        if (product.stok > 0) {
            const newCart = { ...this.state.cart }
            newCart.id_product = product.id
            newCart.id_user = this.state.id_user
            this.setState({
                cart: newCart
            }, () => {
                const data = this.state.cart
                this.props.dispatch(addProductToCart(data))
                setTimeout(() => {
                    this.getAllCart()
                }, 200)
            })
        }
    }

    checkoutOk = () => {
        const data = this.state.formCheckOut
        this.props.dispatch(checkOutAll(data))
        setTimeout(() => {
            this.getAllCart()
            this.getDetailCart(data.faktur)
            this.setState({
                printCheckout: true
            })
        }, 100)
    }

    handleCheckout = () => {
        const newCheckOut = { ...this.state.formCheckOut }
        newCheckOut.faktur = new Date().getTime()
        newCheckOut.id_user = this.state.id_user
        newCheckOut.qty = this.state.qty
        newCheckOut.total = this.state.total
        this.setState({
            formCheckOut: newCheckOut
        })
        swal({
            title: "Continue checkout?",
            text: "Press Ok to continue or Cancel to exit",
            buttons: true
        })
            .then((willCheckout) => {
                if (willCheckout) {
                    this.checkoutOk()
                }
            });
    }

    handleAll = () => {
        swal({
            title: "Are you sure?",
            text: "Cancel the transaction?",
            icon: "warning",
            buttons: true,
            dangerMode: true
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.props.dispatch(deleteAll())
                    this.getAllCart()
                    swal("Poof! Cart has been deleted!", {
                        icon: "success",
                    });
                } else {
                    this.getAllCart()
                }
            });
    }


    handleMinus = (data) => {
        const id_cart = data.id
        const newQty = data.qty - 1
        if (newQty < 1) {
            this.handleDelete(data)
        } else {
            this.props.dispatch(minQty(id_cart))
            this.getAllCart()
        }
    }
    handlePlus = (data) => {
        const id_cart = data.id
        this.props.dispatch(addQty(id_cart))
        this.getAllCart()
    }

    handleDelete = (data) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will delete this item",
            icon: "warning",
            dangerMode: true,
            buttons: true
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.props.dispatch(deleteCart(data.id));
                    this.getAllCart()
                }
            });
    }

    componentDidMount = () => {
        if (localStorage.getItem('Token')) {
            this.getProduct()
            this.getAllCart()
            const user = this.parseJwt()
            this.setState({
                id_user: user.id_user,
                username: user.username
            })
        }
    }

    render() {
        let filterProduct = this.state.product.filter((product) => {
            return product.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1;
        })
        return (
            < div className="content" >
                <div className="items">
                    {
                        filterProduct !== 'undefined' && filterProduct.length > 0 ?
                            filterProduct.map(product => {
                                return (
                                    <Product key={product.id} data={product} addToCart={() => this.handleAddToCart(product)} />
                                )
                            })
                            : (
                                <p>Empty..</p>
                            )
                    }
                </div>
                <div className="sch">
                    <input type="text" onChange={this.searchProduct} placeholder="Search Product....." />
                </div>

                {/* CART */}
                <div className="cover">
                    <div className="container-cart">
                        {
                            this.state.cartData.length > 0 ?
                                this.state.cartData.map(data => {
                                    return (
                                        <Items key={data.id} data={data} minus={() => this.handleMinus(data)} plus={() => this.handlePlus(data)} delete={() => this.handleDelete(data)} />
                                    )
                                })
                                : (
                                    <div className="empty">
                                        <img src={picEmpty} alt="empty" className="picEmpty" />
                                        <h5>Your cart is empty</h5>
                                        <p>Please add some items from the menu</p>
                                    </div>
                                )
                        }
                    </div>
                    <div className="footerTotal">
                        <p>Total</p> <p>Rp. {this.state.total}*</p>
                    </div>
                    <div className="footerBtn">
                        <p>*Belum termasuk ppn</p>
                        <Button className="btn btn-primary" onClick={() => this.handleCheckout()}>Checkout</Button>
                        <Button className="btn btn-danger" onClick={() => this.handleAll()}>Cancel</Button>
                    </div>
                </div>

                {/* checkoout */}
                <Modal show={this.state.modalCheckout} onHide={this.handleClose}>
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

                <Modal
                    show={this.state.printCheckout}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <div className="printCheckout">
                        <div className="modalBody">
                            <h5>Checkout</h5>
                            <p className="cashier">Cashier: {this.state.username}</p> <p className="faktur">Receipet no: {this.state.formCheckOut.faktur}</p>
                        </div>

                        {
                            this.state.detailCart.map(data => {
                                return (
                                    <div className="modalDetail">
                                        <p className="name">{data.name} {data.qtyDetail}x</p>
                                        <p className="harga">Rp. {data.totalDetail}</p>
                                    </div>
                                )
                            })
                        }

                        <div className="modalppn">
                            <p className="ppn">Ppn 10%</p><p className="ppn">Rp. {this.state.formCheckOut.total * 10 / 100}</p>
                        </div>

                        <div className="modaltotal">
                            <p className="total">Total: Rp. {(this.state.formCheckOut.total * 10 / 100) + this.state.formCheckOut.total}</p><br />
                            <p className="pay">Payment: Cash</p>
                        </div>

                        <div className="modalFooter">
                            <Button variant="primary" className='btnPrint' type="submit" onClick={this.editProductData} >Print</Button>
                            <p>Or</p>
                            <Button variant="secondary" className='btnEmail' onClick={this.handleClose}>Send Email</Button>
                        </div>
                    </div>
                </Modal >

            </div >
        )
    }
}


const mapStateToProps = ({ product, cart }) => {
    return {
        product,
        cart
    }
}

export default connect(mapStateToProps)(Content);