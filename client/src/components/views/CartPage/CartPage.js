import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems } from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';

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

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h1>My Cart</h1>

      <div>
        <UserCardBlock products={props.user.cartDetail} />
      </div>
    </div>
  );
}

export default CartPage;
