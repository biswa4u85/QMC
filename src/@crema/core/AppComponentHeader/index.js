import React from 'react';
import { Button, Typography } from 'antd';
import PropTypes from 'prop-types';
import { MdArrowBackIos } from 'react-icons/md';
import './index.style.less';
import AppAnimateGroup from '../AppAnimateGroup';

const { Title } = Typography;

const AppComponentHeader = ({ title, description, backUrl }) => {
  return (
    <AppAnimateGroup type='top' height='auto' interval={100} duration={450}>
      <div className='container-header' key={'header'}>
        <div className='header-title'>
          <Title level={3} className='title-h3'>
            {title}
          </Title>
          {description ? (
            <Title level={5} className='text-base'>
              {description}
            </Title>
          ) : null}
        </div>
        {backUrl ? (
          <div style={{ height: 30 }}>
            <Button
              type='primary'
              ghost
              onClick={() => history.back()}
              icon={<MdArrowBackIos />}>
              Back
            </Button>
          </div>
        ) : null}
      </div>
    </AppAnimateGroup>
  );
};

export default AppComponentHeader;

AppComponentHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  backUrl: PropTypes.string,
};
AppComponentHeader.defaultProps = {};
