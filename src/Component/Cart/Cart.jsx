import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux'



class Cart extends Component {
    state = {
        id_user: '',
        cart: [],
        qty: 0,
        setShow: false,
        id_cart: '',
        cekout: false,
        refresh: false
    }

    handleClose = () => {
        this.setState({
            setShow: false,
            cekout: false
        })
    }
    parseJwt = () => {
        const token = localStorage.getItem('Token')
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const decoded = JSON.parse(jsonPayload);
        return decoded.id_user
    };



    reloadMe = () => {
        this.getAllCart()
    }

    handleCheckout = () => {
        this.getAllCart()
    }


    // componentDidMount() {
    //     if (localStorage.getItem('Token')) {
    //         this.getAllCart()
    //     }
    // }

    componentDidUpdate() {
        // this.getAllCart()
        console.log('okw')
    }

    render() {
        const reloadMe = this.props.cart.reloadMe
        return (
            < Fragment >

            </Fragment >
        )
    }
}


const mapStateToProps = ({ cart }) => {
    return {
        cart
    }
}

export default connect(mapStateToProps)(Cart);