import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems } from '../../../_actions/user_actions';

function CartPage(props) {
  const dispatch = useDispatch();
  const propsUserData = props.user.userData;

  useEffect(() => {
    let cartItems = []; // cart에 담긴 상품id 배열
    // Redux의 User state안에 cart 데이터 중 상품이 들어있는지 확인
    if (propsUserData && propsUserData.cart) {
      if (propsUserData.cart.length > 0) {
        propsUserData.cart.forEach((item) => {
          cartItems.push(item.id);
        });

        dispatch(getCartItems(cartItems, propsUserData.cart));
      }
    }
  }, [propsUserData]);
  return <div>CartPage</div>;
}

export default CartPage;
