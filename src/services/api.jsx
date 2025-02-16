import axios from "axios";

const API_URL = "http://localhost:8082/verse";
const ENDPOINTS = {
  LOGIN: "/auth/login",
  SIGNUP: "/auth/register",
  GET_USER: "/users/",
  ADD_ADDRESS: "/users/",
  GET_PRODUCTS: "/products/",
  CART: "/cart",
  CHECKOUT: "/cart/checkout",
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { api, ENDPOINTS };
