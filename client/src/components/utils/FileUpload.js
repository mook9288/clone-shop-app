import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import axios from 'axios';

const FileUpload = (props) => {
  const [images, setImages] = useState([]);
  const dropHandler = (files) => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/fomr-data' },
    };
    formData.append('file', files[0]);

    axios.post('/api/product/image', formData, config).then((response) => {
      if (response.data.success) {
        // console.log(response.data);
        setImages([...images, response.data.filePath]);
        props.refreshFunction([...images, response.data.filePath]);
      } else {
        alert('파일을 저장하는데 실패했습니다.');
      }
    });
  };

  const deleteImageHandler = (img) => {
    const currentIndex = images.indexOf(img);
    let newImages = [...images];
    newImages.splice(currentIndex, 1);
    console.log(newImages);
    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: 300,
              height: 240,
              border: '1px solid lightgray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Icon type='plus' style={{ fontSize: '3rem' }} />
          </div>
        )}
      </Dropzone>

      <div
        style={{
          display: 'flex',
          width: '350px',
          height: '240px',
          overflowX: 'scroll',
        }}
      >
        {images.map((img, index) => {
          console.log(img, images);
          return (
            <div key={index} onClick={() => deleteImageHandler(img)}>
              <img
                style={{ minWidth: '300px', width: '300px', height: '240px' }}
                src={`http://localhost:5000/${img}`}
                alt=''
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FileUpload;
