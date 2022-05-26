import axios from "axios";

export const loadUserPrfile = async () =>
  await axios.get("http://localhost:3003/userProfile");

export const loadProductsData = async () =>
  await axios.get("http://localhost:3003/products");
