import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';

function DetailProductPage(props) {
  const productId = props.match.params.productId; // 상품 uniq id

  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
        } else {
          alert('상세 정보 가져오기를 실패했습니다.');
        }
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <div style={{ width: '100%', padding: '3rem 4rem' }}>제품 상세 페이지</div>
  );
}

export default DetailProductPage;
