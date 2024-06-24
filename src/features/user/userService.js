import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const register = async (userData) => {
  const response = await axios.post(`${base_url}user/register`, userData);
  if (response.data) {
    if (response.data) {
      localStorage.setItem("customer", JSON.stringify(response.data));
    }
    return response.data;
  }
};

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/login`, userData);
  if (response.data) {
    return response.data;
  }
};

const getUserWishlist = async () => {
  const response = await axios.get(`${base_url}user/wishlist`, config);
  if (response.data) {
    return response.data;
  }
};

const getUserCart = async () => {
  const response = await axios.get(`${base_url}user/cart`, config);
  if (response.data) {
    return response.data;
  }
};

const addToCart = async (cartData) => {
  const response = await axios.post(`${base_url}user/cart`, cartData, config);
  if (response.data) {
    return response.data;
  }
};

const removeProdFromCart = async (id) => {
  const response = await axios.delete(
    `${base_url}user/delete-product-cart/${id}`,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const updateQuantityFromCart = async (cartDetails) => {
  const response = await axios.put(
    `${base_url}user/update-quantity`,
    cartDetails,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const createOrder = async (orderDetails) => {
  const response = await axios.post(
    `${base_url}user/cart/create-order`,
    orderDetails,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const getMyOrders = async () => {
  const response = await axios.get(`${base_url}user/getmyorders`, config);
  if (response.data) {
    return response.data;
  }
};

const updateUserDetails = async (data) => {
  const response = await axios.put(`${base_url}user/update-user`, data, config);
  if (response.data) {
    return response.data;
  }
};

const forgotPassToken = async (data) => {
  const response = await axios.post(
    `${base_url}user/forgot-password-token`,
    data
  );
  if (response) {
    return response.data;
  }
};

const resetPassword = async (data) => {
  const response = await axios.put(
    `${base_url}user/reset-password/${data.token}`,
    {password:data?.password}
  );
  if (response) {
    return response.data;
  }
};

export const authService = {
  register,
  login,
  getUserWishlist,
  getUserCart,
  addToCart,
  removeProdFromCart,
  updateQuantityFromCart,
  createOrder,
  getMyOrders,
  updateUserDetails,
  forgotPassToken,
  resetPassword
};
