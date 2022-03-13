import React from 'react';
import { Carousel } from 'antd';

function ImageSlider(props) {
  // const BASE_URL = process.env.REACT_APP_API_HOST;
  const BASE_URL = 'http://localhost:5000';

  return (
    <div>
      <Carousel autoplay>
        {props.images.map((image, index) => (
          <div key={index}>
            <img
              style={{ width: '100%', maxHeight: '150px' }}
              src={`${BASE_URL}/${image}`}
              alt='상품 이미지'
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
