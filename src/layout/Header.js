import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import tempImage from "../public/productsimages/product.png";
import { removeProductFromCart } from "../redux/actions/productActions";
import { toast } from "react-toastify";

const Header = () => {
  const dispatch = useDispatch();
  const countCart = useSelector((state) => state.products.countCart);
  const storeData = useSelector((state) => state.products.cartData);
  const [localstoreData, setlocalstoreData] = useState("");

  const counts = localStorage.getItem("cartValue");

  useEffect(() => {
    const counts = localStorage.getItem("cartValue");
    const localstoreData = JSON.parse(localStorage.getItem("cartDatas"));
    if (localstoreData) {
      setlocalstoreData(localstoreData);
    }
  }, [counts]);

  const removeFromCart = (data) => {
    dispatch(removeProductFromCart(data));
    toast.success("Remove product successfully");
  };

  return (
    <>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars"></i>
            </a>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="fullscreen"
              href="#"
              role="button"
            >
              <i className="fas fa-expand-arrows-alt"></i>
            </a>
          </li>{" "}
          <li
            className={
              counts > 0 ? "nav-item dropdown show" : "nav-item dropdown"
            }
          >
            <a
              class="nav-link"
              data-toggle="dropdown"
              href="#"
              aria-expanded="false"
            >
              <i class="fas fa-shopping-bag"></i>
              <span class="badge badge-warning navbar-badge">
                {counts ? counts : 0}
              </span>
            </a>
            <div
              class="dropdown-menu dropdown-menu-lg dropdown-menu-right"
              style={{ left: "inherit", right: "0px" }}
            >
              <div class="dropdown-divider"></div>
              {localstoreData.length > 0 ? (
                localstoreData.map((data, index) => (
                  <a class="dropdown-item" key={index}>
                    <img
                      className="profile-user-img img-fluid img-circle"
                      style={{ maxWidth: "15%" }}
                      src={tempImage}
                    />{" "}
                    {data.quanitity > 0 ? data.pname : ""}
                    <span class="float-right text-muted text-sm">
                      {data.quanitity} Qty
                      <button
                        className="btn btn=sm"
                        onClick={() => removeFromCart(index)}
                      >
                        <i
                          className="fa fa-minus"
                          data-toggle="tooltip"
                          title="Remove from cart"
                        ></i>
                      </button>
                    </span>
                  </a>
                ))
              ) : (
                <a class="dropdown-item hide" style={{ textAlign: "center" }}>
                  Empty Cart
                </a>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
