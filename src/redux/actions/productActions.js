import * as type from "../types";

export function getProducts(products) {
  return {
    type: type.GET_PRODUCTS_REQUESTED,
    payload: products,
  };
}

export function addProductToCart(items) {
  return {
    type: type.ADD_CART_REQUESTED,
    payload: items,
  };
}

export function removeProductFromCart(items) {
  return {
    type: type.REMOVE_CART_REQUESTED,
    payload: items,
  };
}

export function searchProduct(searchText) {
  return {
    type: type.SEARCH_PRODUCT_REQUISTED,
    payload: searchText,
  };
}
