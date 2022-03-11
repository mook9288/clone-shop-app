import React, { useEffect } from 'react';
import axios from 'axios';
import { FaCode } from 'react-icons/fa';

function LandingPage() {
  useEffect(() => {
    axios.post('/api/product/products').then((response) => {
      if (response.data.success) {
        console.log('상품 노출');
        console.log(response.data);
      } else {
        alert(' 상품들을 가져오는데 실패 했습니다.');
      }
    });
  }, []);

  return (
    <>
      <div className='app'>
        <FaCode style={{ fontSize: '4rem' }} />
        <br />
        <span style={{ fontSize: '2rem' }}>Let's Start Coding!</span>
      </div>
      <div style={{ float: 'right' }}>
        Thanks For Using This Boiler Plate by John Ahn
      </div>
    </>
  );
}

export default LandingPage;
