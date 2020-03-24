import React, { Fragment } from "react";
// import { useSelector } from "react-redux";

const TableHistory = props => {
  //   const { alldetail } = useSelector(state => state.cart);

  return (
    <Fragment>
      <tr>
        <td>{props.data.faktur}</td>
        <td>{props.data.username}</td>
        <td>{props.data.date_pay}</td>
        <td>{props.data.qty}</td>
        <td>{props.data.total}</td>
      </tr>
    </Fragment>
  );
};

export default TableHistory;
