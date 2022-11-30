import React, { useState, useEffect, Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Upload, message, Spin, Image } from 'antd';
import { useSelector } from 'react-redux'
import './Upload.less';
import ReactPlayer from 'react-player';
import { AiOutlineClose } from "react-icons/ai";
import { ReactComponent as NoImg } from '../../../assets/user/no-image.svg';
import { uploadImgApi } from '../../../utility/site-apis';

function UploadImage(props) {
  const { value, onChange, multiple = false, type = null, uploadSize } = props;
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    randerData(value);
  }, [value]);

  const randerData = (newValue) => {
    if (multiple) {
      setImages(newValue || [])
    } else {
      setImage(newValue)
    }
  }

  const removeHandler = (keyName) => {
    if (multiple) {
      const data = [];
      for (const key in images) {
        if (key != keyName) {
          data.push(images[key]);
        }
      }
      onChange(data);
    } else {
      setImage({})
      onChange('');
    }


  }

  const handleUpload = async file => {
    if (multiple) {
      const newData = images;
      const data = await uploadImgApi(file, token)
      if (data) {
        newData.push({ path: data })
      }
      setImages(newData)
      onChange(newData)
    } else {
      setIsLoading(true)
      const data = await uploadImgApi(file, token)
      if (data.status && data.status == 'error') {
        console.log(data)
      } else {
        onChange(data)
      }
    }
    setIsLoading(false)
  };

  const newProps = {
    showUploadList: false,
    multiple,
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 30;
      if (!isLt2M) {
        message.error('File must smaller than 30MB!');
      }
      const isImage = /image/i.test(file.type);
      const isvideo = /video/i.test(file.type);
      if (!isImage && type === null) {
        message.error('You can only upload Images!');
      }
      if (!isvideo && type === 'video') {
        message.error('You can only upload Video!');
      }

      // console.log(uploadSize)
      // console.log(file)

      if (type === 'video') {
        return isvideo && isLt2M;
      }
      if (type === 'others') {
        return isLt2M;
      }
      return isImage && isLt2M;
    },
    action: handleUpload,
  };


  if (isLoading) {
    return (
      <Fragment>
        <Spin tip="Uploading ..."></Spin>
      </Fragment>
    );
  } if (multiple) {
    return (
      <Fragment>
        {type === 'video' && value ? (
          <div className={'avatarOuter'}>
            {images.map((item, key) => (
              <div key={key} className={'avatar'}>
                <ReactPlayer url={item ? item.path : ''} controls />
                <div className={'deleteBut'} onClick={() => removeHandler(key)}>
                  <AiOutlineClose />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={'avatarOuter'}>
            {images.map((item, key) => (
              <div key={key} className={'avatar'}>
                {type === 'others' ? item.path : <img src={item ? item.path : null} alt="avatar" />}
                <div className={'deleteBut'} onClick={() => removeHandler(key)}>
                  <AiOutlineClose />
                </div>
              </div>
            ))}
          </div>
        )}
        <Upload {...newProps}>
          <div className={'button_view'}>
            <Button>{type === 'video' ? 'Upload Videos' : 'Upload Items'}</Button>
          </div>
        </Upload>
      </Fragment>
    );
  }
  return (
    <Fragment>
      {type === 'video' && image ? (
        <div className={'avatar'}>
          {image && (<div className={'deleteButNew'} onClick={() => removeHandler()}>
            <AiOutlineClose />
          </div>)}
          <ReactPlayer url={image || ''} controls width={'100%'} height={'auto'} />
        </div>
      ) : (
        <div className={'avatar'}>
          {image && (<div className={'deleteButNew'} onClick={() => removeHandler()}>
            <AiOutlineClose />
          </div>)}
          {type === 'others' ? image : (image ? <Image src={image} alt="avatar" /> : <NoImg width={100} />)}
        </div>
      )}
      <Upload {...newProps}>
        <div className={'button_view'}>
          <Button>{type === 'video' ? 'Upload Video' : 'Upload Item'}</Button>
        </div>
      </Upload>
    </Fragment>
  );
}

UploadImage.propTypes = {
  value: PropTypes.node,
  multiple: PropTypes.bool,
  type: PropTypes.string,
  uploadSize: PropTypes.number,
  onChange: PropTypes.func,
};

export default UploadImage;
