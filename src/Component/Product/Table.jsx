import React, { Component, Fragment } from 'react'
import './Product.css'
import { connect } from 'react-redux'


class TableProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            category: [],
            setShow: false,
        }
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