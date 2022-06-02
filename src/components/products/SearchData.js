import React from "react";

const SearchData = ({ tempImage, searchProducts, MUIDataTable }) => {
  return (
    <MUIDataTable
      className="MuiTableCell-alignCenter"
      title="Product Data"
      data={searchProducts.map((searchProducts, index) => {
        return [
          index + 1,
          searchProducts.pname,

          <img
            style={{ borderRaduis: "50%", maxWidth: "30%" }}
            className="profile-user-img img-fluid img-circle"
            src={tempImage}
          />,
          "Rs." + searchProducts.price,
          searchProducts.brand,
          <div>
            <button size="sm" onClick={() => addToCart(searchProducts)}>
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
        selectableRows: false,
        rowsPerPage: 3,
        rowsPerPageOptions: [3, 6, 9],
        searchOpen: false,
        search: false,
      }}
    ></MUIDataTable>
  );
};

export default SearchData;
