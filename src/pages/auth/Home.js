import React, { useEffect, } from 'react';
import { Button, Breadcrumb, Row, Col, Space, Image, } from 'antd';
import ListWapper from "../common/ListWapper";
import { useIntl } from 'react-intl';
import { AiFillEdit } from "react-icons/ai";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { getProfile } from '../../store/AuthRedux'

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { messages } = useIntl()


  return (
    <ListWapper>
      <Row gutter={{ xs: 16, sm: 16, md: 32 }}>
        <Col xs={24} lg={24} >
          Home design
        </Col>
      </Row>
    </ListWapper>
  );
};


export default Home;