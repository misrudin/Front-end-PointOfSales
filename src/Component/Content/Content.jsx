import React, { Component } from 'react';
import './Content.css'
import Product from './Product/Product'
import axios from 'axios'

class Content extends Component {
    state = {
        product: []
    }

    getProduct = () => {
        axios.get('http://localhost:4001/api/v1/product', {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
            .then((res) => {
                this.setState({
                    product: res.data.result,
                })
            })
    }


    componentDidMount = () => {
        this.getProduct()
    }

    render() {
        return (
            <div className="content">
                <div className="items">
                    {
                        this.state.product.map(product => {
                            return (
                                <Product key={product.id} name={product.name} price={product.price} image={product.image} />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Content;