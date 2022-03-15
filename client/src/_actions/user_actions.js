import axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_CART_ITEM,
} from './types';
import { USER_SERVER, PRODUCT_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios
    .get(`${USER_SERVER}/logout`)
    .then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

export function addToCart(id) {
  let body = {
    productId: id,
  };
  const request = axios
    .post(`${USER_SERVER}/add_to_cart`, body)
    .then((response) => response.data);

  return {
    type: ADD_TO_CART,
    payload: request,
  };
}

export function getCartItems(cartItems, userCart) {
  // cartItems: cart에 담긴 상품id 배열
  // userCart: Redux User의 cart에 담긴 상품 정보

  // .get(`${PRODUCT_SERVER}/products_by_id?id=${cartItems}&type=array`)
  // 제품 상세 페이지에서는 해당 제품 1개만 가져오기 때문에 type=single
  // 카트에서는 여러개를 가져오기 때문에 type=array
  const request = axios
    .get(`${PRODUCT_SERVER}/products_by_id?id=${cartItems}&type=array`)
    .then((response) => {
      // CartItem들에 해당하는 정보들을 Product Collection에서 가져온 후에 Quantity 정보를 넣어 준다.
      userCart.forEach((cartItem) => {
        // response 상품의 정보
        response.data.forEach((productDetail, index) => {
          if (cartItem.id === productDetail._id) {
            response.data[index].quantity = cartItem.quantity;
          }
        });
      });
      return response.data;
    });

  return {
    type: GET_CART_ITEMS,
    payload: request,
  };
}

export function removeCartItem(productId) {
  console.log('productId', `${USER_SERVER}/remove_from_cart`);
  const request = axios
    .get(`${USER_SERVER}/remove_from_cart?id=${productId}`)
    .then((response) => {
      //productInfo, cart 정보를 조합해서 CartDetail을 만든다.
      response.data.cart.forEach((item) => {
        response.data.productInfo.forEach((product, index) => {
          if (item.id === product._id) {
            response.data.productInfo[index].quantity = item.quantity;
          }
        });
      });
      return response.data;
    });

  return {
    type: REMOVE_CART_ITEM,
    payload: request,
  };
}
