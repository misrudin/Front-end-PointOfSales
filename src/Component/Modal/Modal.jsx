import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ModalCart = props => {
  const [showme, setShow] = useState(true);

  const close = () => {
    setShow(false);
  };
  return (
    <Modal show={true} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Checkout</Modal.Title>
      </Modal.Header>
      <Modal.Body>Checkout all item?</Modal.Body>
      <Modal.Footer>
        <Button variant="primary">Yes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCart;
