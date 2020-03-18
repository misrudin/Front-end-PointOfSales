import React, { Component, Fragment } from "react";
import "./Content.css";
import Product from "./Product/Product";
import { connect } from "react-redux";
import "../Cart/Cart.css";
import Items from "../Cart/Items";
import { Modal, Button, Form, FormControl } from "react-bootstrap";
import { pagination } from "../../redux/actions/product";
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

class Content extends Component {
  state = {
    category: [],
    product: [],
    cartData: [],
    cart: {
      id_user: "",
      qty: 1,
      id_product: ""
    },
    dataproduct: {
      name: "",
      description: "",
      price: "",
      image: null,
      id_category: "",
      stok: 0
    },
    keyword: "",
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
    await this.props.dispatch(pagination(page));
    console.log(this.props.product.productData);
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
    setTimeout(() => {
      this.sendQty();
    }, 100);
  };

  getDetailCart = async faktur => {
    // const faktur = this.state.formCheckOut.faktur
    await this.props.dispatch(getDetail(faktur));
    this.setState({
      detailCart: this.props.cart.cartDetail
    });
    setTimeout(() => {
      console.log(this.state.detailCart);
    }, 2000);
  };

  handleAddToCart = product => {
    if (product.stok > 0) {
      const newCart = { ...this.state.cart };
      newCart.id_product = product.id;
      newCart.id_user = this.state.id_user;
      this.setState(
        {
          cart: newCart
        },
        () => {
          const data = this.state.cart;
          this.props.dispatch(addProductToCart(data));
          setTimeout(() => {
            this.getAllCart();
          }, 200);
        }
      );
    }
  };

  checkoutOk = () => {
    const data = this.state.formCheckOut;
    this.props.dispatch(checkOutAll(data));
    setTimeout(() => {
      this.getAllCart();
      this.getDetailCart(data.faktur);
      this.getProduct();
      this.setState({
        printCheckout: true
      });
    }, 1000);
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
        this.props.dispatch(deleteAll());
        this.getAllCart();
        setTimeout(() => {
          this.getAllCart();
        }, 1000);
        swal("Poof! Cart has been deleted!", {
          icon: "success"
        });
      } else {
        setTimeout(() => {
          this.getAllCart();
        }, 100);
      }
    });
  };

  handleMinus = data => {
    const id_cart = data.id;
    const newQty = data.qty - 1;
    if (newQty < 1) {
      // this.handleDelete(data)
      this.props.dispatch(deleteCart(data.id));
      this.getAllCart();
      setTimeout(() => {
        this.getAllCart();
      }, 20);
    } else {
      this.props.dispatch(minQty(id_cart));
      this.getAllCart();
      setTimeout(() => {
        this.getAllCart();
      }, 20);
    }
  };

  handlePlus = data => {
    const id_cart = data.id;
    this.state.product.forEach(e => {
      if (data.id_product === e.id) {
        if (data.qty >= e.stok) {
          swal("Stok limit!", {
            icon: "warning"
          });
        } else {
          this.props.dispatch(addQty(id_cart));
          this.getAllCart();
          setTimeout(() => {
            this.getAllCart();
          }, 20);
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
        this.props.dispatch(deleteCart(data.id));
        this.getAllCart();
      }
    });
  };

  handleNextPage = e => {
    if (this.state.page < this.props.product.productData[0]) {
      this.setState({
        page: this.state.page + 1
      });
      setTimeout(() => {
        this.getProduct();
      }, 100);
    }
  };
  handlePrevPage = e => {
    if (this.state.page > 1) {
      this.setState({
        page: this.state.page - 1
      });
      setTimeout(() => {
        this.getProduct();
      }, 100);
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
      }, 200);
      const user = this.parseJwt();
      this.setState({
        id_user: user.id_user,
        username: user.username
      });
    }
  };

  render() {
    console.log(this.state.product);
    let filterProduct = this.state.product.filter(
      product => product.stok !== 0
    );
    console.log(filterProduct);
    return (
      <Fragment>
        <div className="content" id="content">
          <div className="items" id="items">
            {this.state.product.map(product => {
              return (
                <Product
                  key={product.id}
                  data={product}
                  addToCart={() => this.handleAddToCart(product)}
                  dataCart={this.state.cartData}
                />
              );
            })}
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
            <p className="prev" onClick={this.handlePrevPage}>
              &#8678;
            </p>
            <p>{this.props.product.productData[1]}</p>
            <p className="next" onClick={this.handleNextPage}>
              &#8680;
            </p>
          </div>

          <div className="sch">
            <Form inline>
              <Form.Control
                as="select"
                className="mr-sm-1 ml-2 option"
                name="categoryKey"
                onChange={this.sortProduct}
              >
                <option value="">All</option>
                {this.state.category.map(data => {
                  return (
                    <option key={data.id} value={data.id}>
                      {data.nama_category}{" "}
                    </option>
                  );
                })}
              </Form.Control>
              <FormControl
                type="text"
                onChange={this.handleChange}
                placeholder="Search Product....."
                className="mr-sm-1"
              />
            </Form>
          </div>

          {/* CART */}
          <div className="cover">
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
                onClick={this.editProductData}
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
