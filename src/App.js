import React, { Component, Fragment } from 'react';
import './App.css'
import cartLogo from './img/commerce-and-shopping.svg'
import foodres from '../src/img/silverware.svg'
import clipboard from '../src/img/attendant-list.svg'
import addbtn from '../src/img/plus.svg'
import addbtnc from '../src/img/add.svg'
import logout from '../src/img/logout.svg'
import { Redirect, Link } from "react-router-dom"
import { connect } from 'react-redux'
// import { getQty } from './redux/actions/cart'

class App extends Component {
  state = {
    modalShow: false,
    product: [],
    cart: [],
    id_user: '',
    keyword: ''
  }

  handleSearch = (e) => {
    this.setState({
      keyword: e.target.value
    })
  }

  handleLogout = () => {
    localStorage.removeItem('Token')
    window.location.href = "/"
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

  componentDidMount() {
    if (localStorage.getItem('Token')) {
      const id_user = this.parseJwt()
      this.setState({
        id_user: id_user
      })
    } else {
      return <Redirect to="/" />
    }
  }


  render() {
    const qty = this.props.cart.qty
    if (localStorage.getItem('Token')) {
      return (
        <Fragment>
          <div className="mynav">
            <div className="menu">
              <Link to="/home/product">
                <div className="myTitlePage" >
                  <h3 className="home">POS</h3>
                </div>
              </Link>
            </div>


            <Link to="/home/product">
              <div className="cart">
                <img className="cart-logo" onClick={() => this.getAllCart} src={cartLogo} alt="Cart" width="45px" height="35px" />
                <p className="cartCount">{qty}</p>
              </div>
            </Link>
          </div>

          <div className="wrapper">
            <div className="sideBar">
              <div className="menuSide">
                <ul>
                  <li>
                    <Link to="/home/Product">
                      <img src={foodres} alt="menu" width="40px" />
                    </Link>
                    <p>Product</p>
                  </li>
                  <li>
                    <Link to="/home/history">
                      <img src={clipboard} alt="clipboard" width="40px" />
                    </Link>
                    <p>History</p>
                  </li>
                  <li>
                    <Link to="/home/product-add">
                      <img src={addbtn} alt="addbtn" width="40px" onClick={() => this.setState({ modalShow: true })} />
                    </Link>
                    <p>Add Product</p>
                  </li>
                  <li>
                    <Link to="/home/category">
                      <img src={addbtnc} alt="addbtn" width="40px" onClick={() => this.setState({ modalShow: true })} />
                    </Link>
                    <p>Add Category</p>
                  </li>
                  <li>
                    <img src={logout} onClick={() => this.handleLogout()} alt="Logout" width="40px" />
                    <p>Logout</p>
                  </li>
                </ul>
              </div>
            </div>
            {/* call children */}

          </div>
        </Fragment>
      )
    } else {
      return <Redirect to="/" />
    }
  }

}


const mapStateToProps = ({ cart }) => {
  return {
    cart
  }
}

export default connect(mapStateToProps)(App);
