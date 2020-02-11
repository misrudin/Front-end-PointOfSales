import React, { Component, Fragment } from 'react'
import axios from 'axios'
import './Product.css'
import TableProduct from './Table'
import { Table, Button } from 'react-bootstrap'


class AddProduct extends Component {
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
            < Fragment >
                <div className="daftar">
                    <Button className="btn btn-info">Add Product</Button>
                    <input type="text" />
                    <Table responsive="m" className="mt-4">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Stok</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.product.map(product => {
                                    return (
                                        <TableProduct key={product.id} data={product} />
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </Fragment >
        )
    }
}

export default AddProduct