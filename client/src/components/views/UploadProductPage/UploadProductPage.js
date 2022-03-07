import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
const { TextArea } = Input;

function UploadProductPage(props) {
  const [title, setTitle] = useState('');

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2> 여행 상품 업로드</h2>
      </div>

      <Form>
        {/* DropZone */}

        <br />
        <br />
        <label>이름</label>
        <Input onChange={titleChangeHandler} value={title} />
        <br />
        <br />
        <label>설명</label>
        <TextArea />
        <br />
        <br />
        <label>가격($)</label>
        <Input type='number' />
        <br />
        <br />
        <select>
          <option value=''></option>
        </select>
        <br />
        <br />
        <button type='submit'>확인</button>
      </Form>
    </div>
  );
}
export default UploadProductPage;
