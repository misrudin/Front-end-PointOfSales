import React, { useState } from "react";
import bar from "../img/bar.svg";
import { useSelector } from "react-redux";
export const Header = props => {
  return (
    <div>
      <div className="mynav">
        <div className="menu">
          <img src={bar} alt="menu" width="40px" className="bar" id="bar" />
        </div>
      </div>
    </div>
  );
};

export const HeaderCart = props => {
  const { qty, isPending } = useSelector(state => state.cart);

  return (
    <div>
      <div className="cartNav">
        <p className="cartCount" id="count">
          Cart({qty})
        </p>
        <p className="cartCountbig">Cart({qty})</p>

        {isPending ? (
          <div className="loadingCat">
            <div className="lds-hourglass"></div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export const HeaderSearch = props => {
  const [q, setQ] = useState("");

  const handleChange = e => {
    if (e.key === "Enter") {
      props.onSearch(q.trim());
    }
  };
  return (
    <div>
      <div className="mynav">
        <div className="menu">
          <img src={bar} alt="menu" width="40px" className="bar" id="bar" />
          <div className="searchForm">
            <input
              type="text"
              className="txtSearch"
              placeholder="Search ..."
              name="q"
              onChange={e => setQ(e.target.value)}
              value={q}
              onKeyPress={e => handleChange(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
