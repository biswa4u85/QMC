import React from 'react';
import { AppLoader } from '../index';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'

const AuthRoutes = ({ children }) => {
  const isFetching = useSelector((state) => state.auth.isFetching)
  return <>{children} {isFetching && (<AppLoader />)}</>
};

export default AuthRoutes;

AuthRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
