import * as type from "../types";

const initialState = {
  products: [],
  loading: false,
  error: null,
  countCart: 0,
  cartData: [],
  findProducts: [],
};

function products(state = initialState, action) {
  switch (action.type) {
    case type.GET_PRODUCTS_REQUESTED:
    case type.ADD_CART_REQUESTED:
    case type.REMOVE_CART_REQUESTED:
    case type.SEARCH_PRODUCT_REQUISTED:
      return {
        ...state,
        loading: true,
      };
    case type.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.products,
      };

    case type.ADD_CART_SUCCESS:
      const _countCart = localStorage.getItem("cartValue");

      if (_countCart !== 0) {
        localStorage.setItem("cartValue", Number(_countCart) + 1);
      } else {
        localStorage.setItem("cartValue", state.countCart + 1);
      }
      const _finalcountCart = localStorage.getItem("cartValue");

      if (state.countCart === 0) {
        let cart = {
          id: action.payload.id,
          quanitity: 1,
          pname: action.payload.pname,
          price: action.payload.price,
          brand: action.payload.brand,
          stock: action.payload.stock,
        };
        state.cartData.push(cart);
      } else {
        let exist = false;
        state.cartData.map((item, key) => {
          if (item.id === action.payload.id) {
            state.cartData[key].quanitity++;
            exist = true;
          }
        });

        if (!exist) {
          let cart = {
            id: action.payload.id,
            quanitity: 1,
            pname: action.payload.pname,
            price: action.payload.price,
            brand: action.payload.brand,
            stock: action.payload.stock,
          };
          state.cartData.push(cart);
        }
      }

      localStorage.setItem("cartDatas", JSON.stringify(state.cartData));
      return {
        ...state,
        countCart: _finalcountCart,
      };

    case type.REMOVE_CART_SUCCESS:
      state.cartData = JSON.parse(localStorage.getItem("cartDatas"));

      const _removeCountCart = localStorage.getItem("cartValue");

      if (_removeCountCart) {
        localStorage.setItem("cartValue", _removeCountCart - 1);
      }
      const _removeFinalcountCart = localStorage.getItem("cartValue");

      if (state.cartData[action.payload].quanitity > 1) {
        state.cartData[action.payload].quanitity--;
        localStorage.setItem("cartDatas", JSON.stringify(state.cartData));
      } else {
        localStorage.setItem(
          "cartDatas",
          JSON.stringify(
            state.cartData.filter(
              (item) => item.id !== state.cartData[action.payload].id
            )
          )
        );
      }

      return {
        ...state,
        loading: false,
        countCart: _removeFinalcountCart,
      };

    case type.SEARCH_PRODUCT_SUCCESS:
      const searchValue = action.payload;
      return {
        ...state,
        loading: false,
        findProducts: state.products.filter(
          (item) =>
            `${item.pname}`
              .toLocaleLowerCase()
              .includes(searchValue.toLocaleLowerCase()) ||
            `${item.price}`
              .toLocaleLowerCase()
              .includes(searchValue.toLocaleLowerCase())
        ),
      };

    case type.GET_PRODUCTS_FAILED:
    case type.ADD_CART_FAILED:
    case type.REMOVE_CART_FAILED:
    case type.SEARCH_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}

export default products;
