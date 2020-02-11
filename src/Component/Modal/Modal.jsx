import React, { Component } from 'react'
import { Modal, Button, Form, Col, Row, Alert } from 'react-bootstrap'
import './Modal.css'
import axios from 'axios'

class ModalCenter extends Component {


    state = {
        category: [],
        product: {
            name: '',
            description: '',
            price: '',
            image: null,
            id_category: '',
            stok: 0
        },
        msg: ''
    }


    handleChange = (e) => {
        let newProduct = { ...this.state.product };
        newProduct[e.target.name] = e.target.value;
        this.setState({
            product: newProduct
        })
    }
    handleUpload = (ev) => {
        let newProduct = { ...this.state.product };
        newProduct.image = ev.target.files[0]
        this.setState({
            product: newProduct
        })
    }

    handleSubmit = (product) => {
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
            })
            .catch(err => console.log(err))
    }


    componentDidMount = () => {
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

    render() {
        return (
            <Modal
                {...this.props
                }
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
                    <Button variant="primary" onClick={(e) => this.handleSubmit(this.state.product)} > Save</Button>
                    <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal >
        );
    }
}

export default ModalCenter