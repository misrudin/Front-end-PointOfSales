import React, { Component, Fragment } from "react";
import "./Content.css";
import Product from "./Product/Product";
import { connect } from "react-redux";
import "../Cart/Cart.css";
import Items from "../Cart/Items";
import { Modal, Button } from "react-bootstrap";
import { pagination, getAllProduct } from "../../redux/actions/product";
import {
  addProductToCart,
  getAllCart,
  getQty,
  checkOutAll,
  deleteAll,
  getDetail,
  addQty,
  minQty,
  deleteCart
} from "../../redux/actions/cart";
import swal from "sweetalert";
import picEmpty from "../../img/food-and-restaurant.svg";
import { getAllCategory } from "../../redux/actions/category";
import { HeaderSearch } from "../Header";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productall: [],
      category: [],
      product: [],
      cartData: [],
      cart: {
        id_user: "",
        qty: 1,
        id_product: "",
        name: "",
        image: "",
        price: ""
      },
      dataproduct: {
        name: "",
        description: "",
        price: "",
        image: null,
        id_category: "",
        stok: 0
      },
      key: "",
      categoryKey: "",
      qty: 0,
      total: 0,
      modalCheckout: false,
      printCheckout: false,
      formCheckOut: {
        faktur: "",
        id_user: "",
        qty: "",
        total: ""
      },
      detailCart: [],
      id_user: "",
      username: "",
      page: 1,
      loading: true,
      hasMore: true
    };
  }

  handleClose = () => {
    this.setState({
      modalCheckout: false,
      printCheckout: false
    });
  };

  getCategory = async () => {
    await this.props.dispatch(getAllCategory());
    this.setState({
      category: this.props.category.categoryData
    });
  };

  parseJwt = () => {
    const token = localStorage.getItem("Token");
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function(c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    const decoded = JSON.parse(jsonPayload);
    return decoded;
  };

  sendQty = () => {
    const cart = this.state.cartData;
    const newQty = [];
    cart.forEach(e => {
      newQty.push(e.qty);
    });
    this.setState({
      qty: newQty.reduce((a, b) => a + b, 0)
    });

    const newTotal = [];
    cart.forEach(e => {
      newTotal.push(e.qty * e.price);
    });
    this.setState({
      total: newTotal.reduce((a, b) => a + b, 0)
    });

    this.props.dispatch(getQty(this.state.qty));
  };

  getProduct = async () => {
    this.setState({ loading: true });
    const page = this.state.page;
    await this.props.dispatch(pagination(this.state.key, page));
    // console.log(this.props.product.productData);
    this.setState({
      product: this.props.product.productData[2],
      loading: false
    });
  };

  getAllCart = async () => {
    await this.props.dispatch(getAllCart());
    this.setState({
      cartData: this.props.cart.cartData
    });
    this.sendQty();
  };

  getDetailCart = async faktur => {
    await this.props.dispatch(getDetail(faktur));
    this.setState({
      detailCart: this.props.cart.cartDetail,
        printCheckout: true
    });

  };

  handleAddToCart = product => {
    if (product.stok > 0) {
      const newCart = { ...this.state.cart };
      newCart.id_product = product.id;
      newCart.id_user = this.state.id_user;
      newCart.name = product.name;
      newCart.image = product.image;
      newCart.price = product.price;
      this.setState(
        {
          cart: newCart
        },
        () => {
          const data = this.state.cart;
          this.props.dispatch(addProductToCart(data)).then(() => {
            this.getAllCart();
          });
        }
      );
    }
  };

  checkoutOk = () => {
    const data = this.state.formCheckOut;
    this.props.dispatch(checkOutAll(data)).then(() => {
      this.getAllCart();
      this.getDetailCart(data.faktur);
      this.getProduct();
      
    });
  };

  handleCheckout = () => {
    const newCheckOut = { ...this.state.formCheckOut };
    newCheckOut.faktur = new Date().getTime();
    newCheckOut.id_user = this.state.id_user;
    newCheckOut.qty = this.state.qty;
    newCheckOut.total = this.state.total;
    this.setState({
      formCheckOut: newCheckOut
    });
    swal({
      title: "Continue checkout?",
      text: "Press Ok to continue or Cancel to exit",
      buttons: true
    }).then(willCheckout => {
      if (willCheckout) {
        this.checkoutOk();
      }
    });
  };

  handleAll = () => {
    swal({
      title: "Are you sure?",
      text: "Cancel the transaction?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this.props.dispatch(deleteAll()).then(() => {
          this.getAllCart();
        });
        swal("Poof! Cart has been deleted!", {
          icon: "success"
        });
      } else {
        this.getAllCart();
      }
    });
  };

  handleMinus = data => {
    const id_cart = data.id;
    const newQty = data.qty - 1;
    if (newQty < 1) {
    swal({
      text: `Delete ${data.name} from cart ?`,
      buttons: true,
    }).then(willDelete => {
      if (willDelete) {
        this.props.dispatch(deleteCart(data.id)).then(() => {
        this.getAllCart();
      });
      }
    });
      
    } else {
      this.props.dispatch(minQty(id_cart)).then(() => {
        this.getAllCart();
      });
    }
  };

  handlePlus = data => {
    // console.log(this.props.product.productall);
    const id_cart = data.id;
    this.props.product.productall.forEach(e => {
      if (data.id_product === e.id) {
        if (data.qty >= e.stok) {
          swal("Stok limit!", {
            icon: "warning"
          });
        } else {
          this.props.dispatch(addQty(id_cart)).then(() => {
            this.getAllCart();
          });
        }
      }
    });
  };

  handleDelete = data => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will delete this item",
      icon: "warning",
      dangerMode: true,
      buttons: true
    }).then(willDelete => {
      if (willDelete) {
        this.props.dispatch(deleteCart(data.id)).then(() => {
          this.getAllCart();
        });
      }
    });
  };

  handleNextPage = e => {
    if (this.state.page < this.props.product.productData[0]) {
      this.setState(
        {
          page: this.state.page + 1
        },
        () => {
          this.getProduct();
        }
      );
    }
  };
  handlePrevPage = e => {
    if (this.state.page > 1) {
      this.setState(
        {
          page: this.state.page - 1
        },
        () => {
          this.getProduct();
        }
      );
    }
  };

  handleChange = e => {
    this.setState({
      keyword: e.target.value
    });
    setTimeout(() => {
      this.getProduct();
    }, 100);
  };

  sortProduct = e => {
    this.setState({
      categoryKey: e.target.value
    });
    this.getProduct();
    setTimeout(() => {}, 100);
  };

  componentDidMount = () => {
    if (localStorage.getItem("Token")) {
      setTimeout(() => {
        this.getProduct();
        this.getAllCart();
        this.getCategory();
        this.props.dispatch(getAllProduct());
      }, 200);
      const user = this.parseJwt();
      this.setState({
        id_user: user.id_user,
        username: user.username
      });
    }
  };

  search = key => {
    this.setState(
      {
        key: key,
        page: 1
      },
      () => {
        this.getProduct();
      }
    );
    // console.log(key);
  };

  render() {
    return (
      <Fragment>
        <HeaderSearch onSearch={key => this.search(key)} />
        <div className="content" id="content">
          <div className="items" id="items">
            {this.state.product !== undefined ? (
              this.state.product.map(product => {
                return (
                  <Product
                    key={product.id}
                    data={product}
                    addToCart={() => this.handleAddToCart(product)}
                    dataCart={this.state.cartData}
                  />
                );
              })
            ) : (
              <div className="kosong">
                <p>Result not found with key : {this.state.key}</p>
              </div>
            )}
            {this.state.loading ? (
              <div className="load">
                <div className="lds-ripple">
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="pages">
            {this.state.page !== 1 ? (
              <p className="prev" onClick={this.handlePrevPage}>
                &#8678;
              </p>
            ) : (
              <p> </p>
            )}
            <p className="page">{this.state.page}</p>
            {this.state.page !== this.props.product.productData[0] ? (
              <p className="next" onClick={this.handleNextPage}>
                &#8680;
              </p>
            ) : (
              <p> </p>
            )}
          </div>

          {/* CART */}
          <div className="cover" id="cart">
            <div className="container-cart">
              {this.state.cartData.length > 0 ? (
                this.state.cartData.map(data => {
                  return (
                    <Items
                      key={data.id}
                      data={data}
                      minus={() => this.handleMinus(data)}
                      plus={() => this.handlePlus(data)}
                      delete={() => this.handleDelete(data)}
                    />
                  );
                })
              ) : (
                <div className="emptyCart">
                  <img src={picEmpty} alt="empty" className="picEmpty" />
                  <h5>Your cart is empty</h5>
                  <p>Please add some items from the menu</p>
                </div>
              )}
            </div>
            {this.state.cartData.length > 0 ? (
              <>
                <div className="footerTotal">
                  <p>Total</p> <p>Rp. {this.state.total}*</p>
                </div>
                <div className="footerBtn">
                  <p>*Belum termasuk ppn</p>
                  <Button
                    className="btn btn-primary"
                    onClick={() => this.handleCheckout()}
                  >
                    Checkout
                  </Button>
                  <Button
                    className="btn btn-danger"
                    onClick={() => this.handleAll()}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : null}
          </div>
        </div>
        {/* checkoout */}
        <Modal show={this.state.modalCheckout} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Checkout</Modal.Title>
          </Modal.Header>
          <Modal.Body>Checkout all item?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.checkoutOk}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.printCheckout}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <div className="printCheckout">
            <div className="modalBody">
              <h5>Checkout</h5>
              <p className="cashier">Cashier: {this.state.username}</p>{" "}
              <p className="faktur">
                Receipet no: {this.state.formCheckOut.faktur}
              </p>
            </div>

            {this.state.detailCart.map(data => {
              return (
                <div className="modalDetail">
                  <p className="name">
                    {data.name} {data.qtyDetail}x
                  </p>
                  <p className="harga">Rp. {data.totalDetail}</p>
                </div>
              );
            })}

            <div className="modalppn">
              <p className="ppn">Ppn 10%</p>
              <p className="ppn">
                Rp. {(this.state.formCheckOut.total * 10) / 100}
              </p>
            </div>

            <div className="modaltotal">
              <p className="total">
                Total: Rp.{" "}
                {(this.state.formCheckOut.total * 10) / 100 +
                  this.state.formCheckOut.total}
              </p>
              <br />
              <p className="pay">Payment: Cash</p>
            </div>

            <div className="modalFooter">
              <Button
                variant="primary"
                className="btnPrint"
                type="submit"
                onClick={this.handleClose}
              >
                Print
              </Button>
              <p>Or</p>
              <Button
                variant="secondary"
                className="btnEmail"
                onClick={this.handleClose}
              >
                Send Email
              </Button>
            </div>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ product, cart, category }) => {
  return {
    product,
    cart,
    category
  };
};

export default connect(mapStateToProps)(Content);
