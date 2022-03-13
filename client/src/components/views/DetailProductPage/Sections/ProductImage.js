import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';

function ProductImage(props) {
  const BASE_URL = 'http://localhost:5000';
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (props.detail.images && props.detail.images.length > 0) {
      let images = [];

      props.detail.images.map((item) => {
        images.push({
          original: `${BASE_URL}/${item}`,
          thumbnail: `${BASE_URL}/${item}`,
        });
      });
      setImages(images);
    }
  }, [props.detail]);
  // depth를 넣어준 이유?
  // props.detail의 값이 바뀔 때마다 다시 랜더링이 될 수 있도록

  return (
    <div>
      <ImageGallery items={images} />
    </div>
  );
}

export default ProductImage;
