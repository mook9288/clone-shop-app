import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems } from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';

function CartPage(props) {
  const dispatch = useDispatch();
  const propsUserData = props.user.userData;
  const [total, setTotal] = useState(0);
  const [showTotal, setShowTotal] = useState(false);

  useEffect(() => {
    let cartItems = []; // cart에 담긴 상품id 배열
    // Redux의 User state안에 cart 데이터 중 상품이 들어있는지 확인
    if (propsUserData && propsUserData.cart) {
      if (propsUserData.cart.length > 0) {
        propsUserData.cart.forEach((item) => {
          cartItems.push(item.id);
        });

        dispatch(getCartItems(cartItems, propsUserData.cart)).then(
          (response) => {
            calculateTotal(response.payload);
          }
        );
      }
    }
  }, [propsUserData]);

  let calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.map((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    setTotal(total);
    setShowTotal(true);
  };

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h1>My Cart</h1>

      <div>
        <UserCardBlock products={props.user.cartDetail} />
      </div>

      {showTotal && (
        <div style={{ marginTop: '3rem' }}>
          <h2>
            Total Amount: {'$'}
            {total}
          </h2>
        </div>
      )}
    </div>
  );
}

export default CartPage;
