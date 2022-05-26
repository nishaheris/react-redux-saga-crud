import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  getProducts,
} from "../../redux/actions/productActions";
import tempImage from "../../public/productsimages/product.png";

const Products = () => {
  const columns = ["Id", "Name", "Logo", "Price", "Brand", "Actions"];

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [checkLocaldata, setChecklocaldata] = useState(false);
  // const [Indexdata, setIndexdata] = useState([]);
  const Indexdata = [];
  //console.log(products);
  // const [productData, setProductData] = useState([]);
  // const localCartData = JSON.parse(localStorage.getItem("cartDatas"));

  // const result = products.filter((col) => {
  //   return localCartData.find((data) => data.id === col.id);
  // });
  // result.forEach(function (el, index) {
  //   // if (!findIndex) {

  //   const local = localCartData.find((data) => data.id === el.id);
  //   el.stock = Number(el.stock) - 1;
  //   Indexdata.push(el);
  //   // console.log(el);
  //   // }
  // });
  //console.log(Indexdata);
  // if (!checkLocaldata) {
  //   if (localCartData) {
  //     localCartData.forEach(function (local) {
  //       const cartIds = local.id;
  //       const oldStocks = local.stock;
  //     });
  //     console.log(products.filter((cartIds) => products.id === cartIds));
  //     setChecklocaldata(true);
  //   }
  // }

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const addToCart = (products) => {
    dispatch(addProductToCart(products));
  };

  return (
    <div className="content-wrapper">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div style={{ marginTop: "50px" }}>
              <MUIDataTable
                className="MuiTableCell-alignCenter"
                title="Product Data"
                data={products.map((products, index) => {
                  return [
                    index + 1,
                    products.pname,

                    <img
                      style={{ borderRaduis: "50%", maxWidth: "30%" }}
                      className="profile-user-img img-fluid img-circle"
                      src={tempImage}
                    />,
                    "Rs." + products.price,
                    products.brand,
                    <div>
                      <button size="sm" onClick={() => addToCart(products)}>
                        <i
                          className="fa fa-plus"
                          data-toggle="tooltip"
                          title="Add to cart"
                        ></i>
                      </button>
                    </div>,
                  ];
                })}
                columns={columns}
                options={{
                  filter: false,
                  download: false,
                  print: false,
                  viewColumns: false,
                  displayRowCheckbox: false,
                  rowsPerPage: 3,
                  rowsPerPageOptions: [3, 6, 9],
                }}
              ></MUIDataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
