import React, { useEffect, } from 'react';
import { Button, Breadcrumb, Row, Col, Space, Image, } from 'antd';
import ListWapper from "../common/ListWapper";
import { useIntl } from 'react-intl';
import { AiFillEdit } from "react-icons/ai";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { getProfile } from '../../store/AuthRedux'
import { HomeOutlined, UserOutlined } from '@ant-design/icons';



const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { messages } = useIntl()


  return (
    <ListWapper>
      <div className='participation'>
        <Row gutter={{ xs: 16, sm: 16, md: 32 }}>
          <Col xs={24} lg={20} >
            <Breadcrumb separator=" ">
              <Breadcrumb.Item href='#'>
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item href='#'>Participation Corner</Breadcrumb.Item>
              <Breadcrumb.Item href='#'>Resources</Breadcrumb.Item>
              <Breadcrumb.Item href='#'>Placeholder</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col xs={24} lg={4} >
            <Breadcrumb separator=" ">
              <Breadcrumb.Item >English</Breadcrumb.Item>
              <Button >Sign In</Button>
            </Breadcrumb>
          </Col>
        </Row>
        <div className='banner'></div>

        <p>Question Making Competition is a unique platform for all teachers across the country to showcase their question making skills. All educators across grades and subjects are invited to participate in the competition by creating high quality questions using their creativity, critical thinking and subject knowledge.</p>
        <p>Check out the ‘Participation Corner’ for more details to participate.</p>
        <h5>Message from the Chairperson</h5>
        <br/>
        <br/>

        <Row gutter={{ xs: 16, sm: 16, md: 32 }}>
          <Col xs={24} lg={12} >
          <div className='banner'></div>
          </Col>
          <Col xs={24} lg={12} >
            <p>It is indeed a great opportunity for our teachers to share their question making skills and for the board to reward their talent.</p>
            <h5>-ABC</h5>
            <p>It is indeed a great opportunity for our teachers to share their question making skills and for the board to reward their talent.</p>
          </Col>
        </Row>
          <span><a href=''>Register </a> for QMC</span>
      </div>

    </ListWapper>
  );
};


export default Home;