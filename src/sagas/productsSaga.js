import { call, put, takeLatest } from "redux-saga/effects";
import { loadProductsData } from "../api/api";

function* fetchProductsData() {
  try {
    const response = yield call(loadProductsData);

    if (response.status === 200) {
      yield put({ type: "GET_PRODUCTS_SUCCESS", products: response.data });
    }
  } catch (e) {
    yield put({ type: "GET_PRODUCTS_FAILED", message: e.message });
  }
}

function* addProductToCart({ payload: items, payload }) {
  try {
    yield put({ type: "ADD_CART_SUCCESS", payload: payload });
  } catch (e) {
    const msg = "Product Not added";
    yield put({ type: "ADD_CART_FAILED", message: msg });
  }
}

function* removeProductFromCart({ payload: items, payload }) {
  try {
    yield put({ type: "REMOVE_CART_SUCCESS", payload: payload });
  } catch (e) {
    const msg = "Product Not added";
    yield put({ type: "REMOVE_CART_FAILED", message: msg });
  }
}

function* searchProductRequest({ payload: searchText, payload }) {
  try {
    yield put({ type: "SEARCH_PRODUCT_SUCCESS", payload: payload });
  } catch (e) {
    yield put({ type: "SEARCH_PRODUCT_FAILED", message: e.message });
  }
}

function* productsSaga() {
  yield takeLatest("GET_PRODUCTS_REQUESTED", fetchProductsData);
  yield takeLatest("ADD_CART_REQUESTED", addProductToCart);
  yield takeLatest("REMOVE_CART_REQUESTED", removeProductFromCart);
  yield takeLatest("SEARCH_PRODUCT_REQUISTED", searchProductRequest);
}

export default productsSaga;
