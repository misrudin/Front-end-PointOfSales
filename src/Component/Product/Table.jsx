import React, { Component, Fragment } from 'react'
import './Product.css'
import { Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getAllCategory } from '../../redux/actions/category'

class TableProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            category: [],
            setShow: false,
        }
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

    getCategory = async () => {
        await this.props.dispatch(getAllCategory())
        this.setState({
            category: this.props.category.categoryData
        })
    }

    componentDidMount = () => {
        this.getCategory()
    }

    render() {
        return (
            <Fragment>
                <tr>
                    <td>{this.props.data.name}</td>
                    <td>{this.props.data.description}</td>
                    <td>Rp. {this.props.data.price}</td>
                    <td>{this.props.data.stok}</td>
                    <td>
                        <p className="edit" onClick={() => this.props.edit(this.props.data)}>Edit</p> | <p className="delete" onClick={() => this.props.delete(this.props.data.id)}> Delete</p>
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
            </Fragment>

        )
    }
}


const mapStateToProps = ({ category }) => {
    return {
        category
    }
}


export default connect(mapStateToProps)(TableProduct) 