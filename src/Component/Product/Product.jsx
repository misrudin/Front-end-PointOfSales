import React, { Component, Fragment } from 'react'
import axios from 'axios'
import './Product.css'
import TableProduct from './Table'
import { Table, Button } from 'react-bootstrap'
import ModalCenter from '../Modal/Modal'


class AddProduct extends Component {
    state = {
        modalShow: false,
        product: [],
        keyword: ''
    }


    getProduct = () => {
        axios.get('http://localhost:4001/api/v1/product', {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
            .then((res) => {
                this.setState({
                    product: res.data.result
                })
            })
    }



    componentDidMount = () => {
        this.getProduct()
    }

    handleClose = () => {
        this.setState({ modalShow: false })
        this.getProduct()
    }
    getData = (e) => {
        const keyword = e.target.value
        this.setState({
            keyword: keyword
        })
    }

    render() {
        let filterProduct = this.state.product.filter((product) => {
            return product.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1;
        })
        return (
            < Fragment >
                <div className="daftar">
                    <Button className="btn btn-info" onClick={() => this.setState({ modalShow: true })}>Add Product</Button>
                    <input type="text" name="keyword" placeholder="Search..." className="keyword" onChange={this.getData} />
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
                                filterProduct.map(product => {
                                    return (
                                        <TableProduct key={product.id} data={product} />
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
                <ModalCenter
                    show={this.state.modalShow}
                    onHide={this.handleClose}
                />
            </Fragment >
        )
    }
}

export default AddProduct