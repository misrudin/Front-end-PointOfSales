import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getDetail } from '../../redux/actions/cart'

class TableHistory extends Component {
    state = {
        detail: []
    }
    getOrders = async () => {
        const faktur = this.props.data.faktur
        await this.props.dispatch(getDetail(faktur))
        this.setState({
            detail: this.props.cart.cartDetail[0].name
        })
    }


    render() {
        return (
            <Fragment>
                <tr>
                    <td>{this.props.data.faktur}</td>
                    <td>{this.props.data.username}</td>
                    <td>{this.props.data.date_pay}</td>
                    <td>{this.props.data.qty}</td>
                    <td>{this.props.data.total}</td>
                </tr>
            </Fragment>

        )
    }
}

const mapStateToProps = ({ cart }) => {
    return {
        cart
    }
}

export default connect(mapStateToProps)(TableHistory)