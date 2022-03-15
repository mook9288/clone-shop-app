import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  getCartItems,
  removeCartItem,
  onSuccessBuy,
} from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';
import { Empty, Result } from 'antd';
import Paypal from '../../utils/Paypal';

function CartPage(props) {
  const dispatch = useDispatch();
  const propsUserData = props.user.userData;
  const [total, setTotal] = useState(0);
  const [showTotal, setShowTotal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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

  let removeFromCart = (productId) => {
    dispatch(removeCartItem(productId)).then((response) => {
      if (response.payload.productInfo.length <= 0) {
        setShowTotal(false);
      }
    });
  };

  const transactionSuccess = (data) => {
    dispatch(
      onSuccessBuy({
        paymentData: data,
        cartDetail: props.user.cartDetail,
      })
    ).then((response) => {
      if (response.payload.success) {
        setShowTotal(false);
        setShowSuccess(true);
      }
    });
  };

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h1>My Cart</h1>

      <div>
        <UserCardBlock
          products={props.user.cartDetail}
          removeItem={removeFromCart}
        />
      </div>

      <div style={{ marginTop: '3rem' }}>
        {showTotal ? (
          <h2>
            Total Amount: {'$'}
            {total}
          </h2>
        ) : showSuccess ? (
          <Result status='success' title='Successfully Purchased Items' />
        ) : (
          <Empty description={false} />
        )}
      </div>

      {showTotal && (
        <div style={{ marginTop: '3rem', textAlign: 'right' }}>
          <Paypal total={total} onSuccess={transactionSuccess} />
        </div>
      )}
    </div>
  );
}

export default CartPage;
