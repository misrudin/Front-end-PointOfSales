import React, { Component, Fragment } from 'react'
import './Category.css'

class TableCategory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            category: [],
            dataCategory: {
                nama_category: ''
            },
            setShow: false,
            editShow: false,
            id: ''
        }
    }


    render() {
        return (
            <Fragment>
                <tr>
                    <td>{this.props.data.nama_category}</td>
                    <td>
                        <p className="edit" onClick={() => this.props.edit(this.props.data)} >Edit</p> | <p className="delete" onClick={() => this.props.delete(this.props.data.id)}> Delete</p>
                    </td>
                </tr>
            </Fragment>

        )
    }
}

export default TableCategory 