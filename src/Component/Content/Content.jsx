import React, { Component } from 'react';
import './Content.css'
import Product from './Product/Product'
import axios from 'axios'
import Cart from '../Cart/Cart'
// import { RootContext } from '../../index'

class Content extends Component {
    state = {
        product: [],
        cart: {
            id_user: '',
            qty: 1,
            id_product: ''
        },
        refresh: false,
        dataproduct: {
            name: '',
            description: '',
            price: '',
            image: null,
            id_category: '',
            stok: 0
        },
        keyword: '',
        nomor: 1
    }

    searchProduct = (e) => {
        const keyword = e.target.value
        this.setState({
            keyword: keyword
        })
    }

    getProduct = () => {
        const nomor = this.state.nomor
        axios.get(`http://localhost:4001/api/v1/product/page/${nomor}`, {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
            .then((res) => {
                console.log(res.data[0])
                console.log(res.data[1])
                this.setState({
                    product: res.data[2],
                    nomor: res.data[1]
                })
            })

        this.handleAddToCart = this.handleAddToCart.bind(this)
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

    reloadCart = () => {
        return (
            <Cart refresh={this.state.refresh} />
        )
    }

    handleAddToCart = (product) => {
        if (product.stok > 0) {
            const id_product = product.id
            const id_user = this.parseJwt()
            const newCart = { ...this.state.cart }
            newCart.id_product = id_product
            newCart.id_user = id_user
            this.setState({
                cart: newCart
            }, () => {
                const data = this.state.cart
                axios.post('http://localhost:4001/api/v1/product/addtocart', data, {
                    headers: {
                        token: localStorage.getItem('Token')
                    }
                })
                    .then((res) => {
                        console.log(res)
                        this.getProduct()
                        this.setState({
                            refresh: true
                        })
                        window.location.href = "/home/product"
                    })
            })
        }
    }

    reloadCart = () => {
        this.setState({
            refresh: false
        })
    }

    prev = () => {
        this.setState({
            page: this.state.page - 1
        }, () => {
            console.log(this.state.page)
            // this.getProduct()
        })
    }
    next = () => {
        this.setState({
            page: 2
        }, () => {
            console.log(this.state.nomor)
            // this.getProduct()
        })
    }

    componentDidMount = () => {
        this.getProduct()
    }

    render() {
        let filterProduct = this.state.product.filter((product) => {
            return product.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1;
        })
        return (
            // <RootContext.Provider>
            //     {
            //         value => {
            //             console.log(value)
            //             return (
            < div className="content" >
                <div className="items">
                    {
                        filterProduct !== 'undefined' && filterProduct.length > 0 ?
                            filterProduct.map(product => {
                                return (
                                    <Product key={product.id} data={product} crt={() => this.handleAddToCart(product)} />
                                )
                            })
                            : (
                                <p>Empty..</p>
                            )
                    }
                </div>
                <Cart refresh={() => this.reloadCart()} />

                <div className="sch">
                    <input type="text" onChange={this.searchProduct} placeholder="Search Product....." />
                </div>
                <div className="page">
                    <p className="prev" onClick={() => this.prev()}>Previous</p>
                    <p className="next" onClick={() => this.prev()}>Next</p>
                </div>
            </div >
            //             )
            //         }
            //     }
            // </RootContext.Provider >
        )
    }
}

export default Content;