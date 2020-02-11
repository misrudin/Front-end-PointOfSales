import React, { Component, Fragment } from 'react'
import './Product.css'
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import axios from 'axios'

class TableProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            category: [],
            setShow: false,
            editShow: false,
            id: '',
            product: {
                name: '',
                description: '',
                price: '',
                image: null,
                id_category: '',
                stok: ''
            }
        }
        this.handleDelete = this.handleDelete.bind(this)
    }






    handleClose = () => {
        this.setState({
            setShow: false,
            editShow: false
        })
    }
    handleShow = (data) => {
        this.setState({
            setShow: true,
            id: data
        })
    }
    handleShowEdit = (product) => {
        let newProduct = { ...this.state.product };
        newProduct.name = product.name;
        newProduct.description = product.description;
        newProduct.image = product.image;
        newProduct.price = product.price;
        newProduct.stok = product.stok;
        newProduct.id_category = product.id_category;
        this.setState({
            editShow: true,
            product: newProduct,
            id: product.id
        })
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


    handleSave = (product) => {
        const id = this.state.id
        this.setState({
            editShow: false,
        })
        let fd = new FormData()
        fd.append('image', product.image, product.image.name)
        fd.set('name', product.name)
        fd.set('description', product.description)
        fd.set('stok', product.stok)
        fd.set('price', product.price)
        fd.set('id_category', product.id_category)
        axios.patch(`http://localhost:4001/api/v1/product/${id}`, fd, {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                console.log(response)
                window.location.href = "/home/product-add"
            })
            .catch(err => console.log(err))
    }

    handleDelete = () => {
        const id = this.state.id
        this.setState({
            setShow: false,
        })
        axios.delete(`http://localhost:4001/api/v1/product/${id}`, {
            headers: {
                token: localStorage.getItem('Token')
            }
        })
            .then(response => {
                window.location.href = "/home/product-add"
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
            <Fragment>
                <tr>
                    <td>{this.props.data.name}</td>
                    <td>{this.props.data.description}</td>
                    <td>Rp. {this.props.data.price}</td>
                    <td>{this.props.data.nama_category}</td>
                    <td>{this.props.data.stok}</td>
                    <td>
                        <p className="edit" onClick={() => this.handleShowEdit(this.props.data)}>Edit</p> | <p className="delete" onClick={() => this.handleShow(this.props.data.id)}> Delete</p>
                    </td>
                </tr>


                <Modal show={this.state.setShow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are You Sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Delete the selected item?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
              </Button>
                        <Button variant="danger" onClick={this.handleDelete}>
                            Delete
              </Button>
                    </Modal.Footer>
                </Modal>


                {/* edit */}
                <Modal
                    show={this.state.editShow} onHide={this.handleClose}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>

                            <Form.Group as={Row} controlId="formHorizontalName" className="justify-content-center">
                                <img className="preview" src={this.state.product.image} alt="img" />
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalName">
                                <Form.Label column sm={2}>
                                    Name</Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" value={this.state.product.name} className="txt" name="name" required onChange={this.handleChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalDes">
                                <Form.Label column sm={2}>
                                    Description</Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" value={this.state.product.description} className="txt" name="description" required onChange={this.handleChange} />
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
                                    <Form.Control type="number" value={this.state.product.price} className="txt" name="price" onChange={this.handleChange} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formHorizontalstok">
                                <Form.Label column sm={2}>
                                    Stok</Form.Label>
                                <Col sm={7}>
                                    <Form.Control type="number" value={this.state.product.stok} className="txt" name="stok" onChange={this.handleChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalCategory">
                                <Form.Label column sm={2}>
                                    Category</Form.Label>
                                <Col sm={7}>
                                    <Form.Control as="select" value={this.state.product.id_category} className="txt" name="id_category" onChange={this.handleChange}>
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
                        <Button variant="primary" onClick={() => this.handleSave(this.state.product)} > Save</Button>
                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal >
            </Fragment>

        )
    }
}

export default TableProduct 