import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Descriptions } from 'antd';
import { addToCart } from '../../../../_actions/user_actions';

function ProductImage(props) {
  const { _id, price, sold, views, description } = props.detail;
  const dispatch = useDispatch();

  const clickHandler = () => {
    //필요한 정보를 Cart 필드에다가 넣어 준다.
    dispatch(addToCart(_id));
  };
  return (
    <>
      <Descriptions title='Product Info'>
        <Descriptions.Item label='Price'>{price}</Descriptions.Item>
        <Descriptions.Item label='Sold'>{sold}</Descriptions.Item>
        <Descriptions.Item label='View'>{views}</Descriptions.Item>
        <Descriptions.Item label='Description'>{description}</Descriptions.Item>
      </Descriptions>

      <br />
      <br />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button size='large' shape='round' type='danger' onClick={clickHandler}>
          Add to Cart
        </Button>
      </div>
    </>
  );
}

export default ProductImage;
