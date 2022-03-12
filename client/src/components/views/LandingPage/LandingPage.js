import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(3);

  useEffect(() => {
    let body = { skip: skip, limit: limit };
    axios.post('/api/product/products', body).then((response) => {
      if (response.data.success) {
        console.log('상품 노출', response.data);
        setProducts(response.data.productInfo);
      } else {
        alert('상품들을 가져오는데 실패 했습니다.');
      }
    });
  }, []);

  const renderCards = products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card
          cover={
            <a href={`/product/${product._id}`}>
              <ImageSlider images={product.images} />
            </a>
          }
        >
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  const loadMoreHanlder = () => {
    console.log('상품카드 더 불러오기');
  };

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Let's Travel Anywhere </h2>
      </div>
      {/* Filter */}
      {/* Search */}
      {/* Cards */}
      <Row gutter={[16, 16]}>{renderCards}</Row>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={loadMoreHanlder}>더보기</button>
      </div>
    </div>
  );
}

export default LandingPage;
