import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import Checkbox from './Sections/CheckBox';
import Radiobox from './Sections/RadioBox';
import { continents, price } from './Sections/Datas';

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(3);
  const [postSize, setPostSize] = useState(0);
  const [filters, setFilters] = useState({
    continents: [],
    price: [],
  });

  useEffect(() => {
    let body = { skip: skip, limit: limit };
    getProducts(body);
  }, []);

  const getProducts = (body) => {
    // 더보기 버튼 클릭 후, 상품카드 더 불러올 때
    // axios를 한번 더 호출해주게 되므로
    // 코드 재사용을 위해 함수화
    axios.post('/api/product/products', body).then((response) => {
      if (response.data.success) {
        // 상품 리스트를 더 불러올때, 기존의 리스트를 유지한 채로 보여주기
        if (body.loadMore) {
          setProducts([...products, ...response.data.productInfo]);
        } else {
          setProducts(response.data.productInfo);
        }
        setPostSize(response.data.postSize);
      } else {
        alert('상품들을 가져오는데 실패 했습니다.');
      }
    });
  };

  const showFilteredResults = (filtering) => {
    let body = {
      skip: 0,
      limit: limit,
      filters: filtering,
    };

    getProducts(body);
    setSkip(0);
  };

  const handleFilters = (filtering, category) => {
    // filtering: 선택된 값 id
    // category: 선택한 카테고리
    const newFilters = { ...filters };

    newFilters[category] = filtering;

    console.log('filtering', filtering);

    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

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
    let skipCount = skip + limit;
    let body = {
      skip: skipCount,
      limit: limit,
      loadMore: true, // 더보기 버튼이라는 걸 알려주기 위해
    };
    getProducts(body);
    setSkip(skipCount);
  };

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Let's Travel Anywhere </h2>
      </div>
      {/* Filter */}

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          {/* CheckBox */}
          <Checkbox
            list={continents}
            handleFilters={(filtering) =>
              handleFilters(filtering, 'continents')
            }
          />
        </Col>
        <Col lg={12} xs={24}>
          {/* RadioBox */}
          <Radiobox />
        </Col>
      </Row>

      {/* Search */}
      {/* Cards */}
      <Row gutter={[16, 16]}>{renderCards}</Row>
      {postSize >= limit && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={loadMoreHanlder}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
