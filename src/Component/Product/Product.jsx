import React, { Component, Fragment } from 'react'
import axios from 'axios'
import './Product.css'
import TableProduct from './Table'
import { Table, Modal, Button, Form, Col, Row, Alert } from 'react-bootstrap'


class AddProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalShow: false,
            product: [],
            keyword: '',
            category: [],
            dataproduct: {
                name: '',
                description: '',
                price: '',
                image: null,
                id_category: '',
                stok: 0
            },
            msg: ''
        }
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

    handleChange = (e) => {
        let newProduct = { ...this.state.dataproduct };
        newProduct[e.target.name] = e.target.value;
        this.setState({
            dataproduct: newProduct
        })
    }
    handleUpload = (ev) => {
        let newProduct = { ...this.state.dataproduct };
        newProduct.image = ev.target.files[0]
        this.setState({
            dataproduct: newProduct
        })
    }

    handleSubmit = () => {
        let product = this.state.dataproduct
        let fd = new FormData()
        fd.append('image', product.image, product.image.name)
        fd.set('name', product.name)
        fd.set('description', product.description)
        fd.set('stok', product.stok)
        fd.set('price', product.price)
        fd.set('id_category', product.id_category)
        axios.post('http://localhost:4001/api/v1/product', fd, {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                console.log(response)
                this.handleClose()
            })
            .catch(err => console.log(err))
    }

    componentDidMount = () => {
        this.getProduct()
        axios.get('http://localhost:4001/api/v1/category', {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
            .then((res) => {
                this.setState({
                    category: res.data.result
                })
            })
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
                {/* <ModalCenter show={this.state.modalShow} onHide={this.handleClose} btnSave={() => this.handleSubmit} /> */}
                <Modal
                    show={this.state.modalShow}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Alert key="warning" variant="warning" className='alert'>{this.state.msg}</Alert>

                        <Form>
                            <Form.Group as={Row} controlId="formHorizontalName">
                                <Form.Label column sm={2}>
                                    Name</Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" className="txt" name="name" required onChange={this.handleChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalDes">
                                <Form.Label column sm={2}>
                                    Description</Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" className="txt" name="description" required onChange={this.handleChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalImage">
                                <Form.Label column sm={2}>
                                    Image</Form.Label>
                                <Col sm={10}>
                                    <Form.Control className="upload txt" type="file" name="image" accept="image/*" onChange={this.handleUpload} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalPrice">
                                <Form.Label column sm={2}>
                                    Price</Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="number" className="txt" name="price" onChange={this.handleChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalCategory">
                                <Form.Label column sm={2}>
                                    Category</Form.Label>
                                <Col sm={7}>
                                    <Form.Control as="select" className="txt" name="id_category" onChange={this.handleChange}>
                                        <option>Chose...</option>
                                        {
                                            this.state.category.map(data => {
                                                return (
                                                    <option key={data.id} value={data.id} >{data.nama_category} </option>
                                                )
                                            })
                                        }
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formHorizontal">

                            </Form.Group>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={(e) => this.handleSubmit()} > Save</Button>
                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal >
            </Fragment >
        )
    }
}

export default AddProduct