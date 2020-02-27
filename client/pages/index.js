import { useState, useCallback } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const Index = () => {
  const [images, setImages] = useState([{
    name: "sample",
    url: "https://coacer-react-image.s3.amazonaws.com/スクリーンショット 2020-02-15 10.05.35.png"
  }]);

  const handleDrop = useCallback(files => {
    Promise.all(files.map(file => uploadImage(file)))
      .then(images => {
        setImages(images);
      })
      .catch(e => console.log(e));
  });

  const uploadImage = file => {
      console.log("success0");
    return axios.get('http://localhost:8080/upload', {
      params: {
        filename: file.name,
        filetype: file.type,
      }
    }).then(res => {
      console.log("success1");
      const options = {
        headers: {
          'Content-Type': file.type
        }
      };
      return axios.put(res.data.url, file, options)
    }).then(res => {
      console.log("success2");
      const { name } = res.config.data;
      return {
        name,
        url: `https://coacer-react-image.s3.amazonaws.com/${file.name}`
      };
    })
  };

  return (
    <>
      <Dropzone onDrop={handleDrop}>
    {({getRootProps, getInputProps}) => (
        <section>
          <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </section>
      )}
    </Dropzone>
      {images.map(({ name, url }) => (
        <img key={name} src={url} alt="name"/>
      ))}
    </>
  );
};

export default Index;
