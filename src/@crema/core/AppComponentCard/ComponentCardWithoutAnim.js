import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import AppScrollbar from '../AppScrollbar';
import './index.style.less';
import AppCard from '../AppCard';

const ComponentCardWithoutAnim = ({
  title,
  description,
  className,
  maxHeight,
  component: Component,
}) => {
  return (
    <AppCard
      className={clsx('comp-card', className)}
      title={
        <>
          <span>{title}</span>
          <span className='comp-card-title-description text-truncate'>
            {description}
          </span>
        </>
      }>
      <AppScrollbar className='comp-scrollbar' style={{ maxHeight: maxHeight }}>
        <div className='component-root'>
          <Component />
        </div>
      </AppScrollbar>
    </AppCard>
  );
};

export default ComponentCardWithoutAnim;

ComponentCardWithoutAnim.defaultProps = {
  description: '',
  maxHeight: 500,
};

ComponentCardWithoutAnim.propTypes = {
  component: PropTypes.any.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.node,
  maxHeight: PropTypes.number,
  className: PropTypes.string,
  size: PropTypes.number,
};
