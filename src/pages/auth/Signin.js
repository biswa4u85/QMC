import React, { useEffect } from 'react';
import IntlMessages from '../../@crema/utility/IntlMessages';
import { useIntl } from 'react-intl';
import AppAnimateGroup from '../../@crema/core/AppAnimateGroup';
import AppRowContainer from '../../@crema/core/AppRowContainer';
import { Button, Card, Checkbox, Col, Form, Input } from 'antd';
import './index.style.less';
import AppPageMetadata from '../../@crema/core/AppPageMetadata';
import { ReactComponent as Logo } from '../../assets/user/login.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { adminLogin } from '../../store/AuthRedux'
import dixcologo from "../../assets/user/dixco-logo.png";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)

  const onFinish = (values) => {
    dispatch(adminLogin(values))
  };

  useEffect(() => {
    if (token) {
      navigate('/dashboards/viewprofile');
    }
  }, [token]);

  const onGoToForgetPassword = () => {
    navigate('/forget-password');
  };

  function onRememberMe(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  const { messages } = useIntl();
  return (
    <div className='login-pages'>
      <AppAnimateGroup type='bottom'>
        <AppPageMetadata title='Signin' />
        <div className='login-container'>
          <Card className='login-card login-card-lg'>
            <AppRowContainer>
              <Col xs={24} md={12}>
                <div className='login-styled-img'>
                  <Logo />
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div>
                <img style={{width:110,height:110,marginBottom:32}} src={dixcologo} />
                </div>
                {/* <div className='login-card-header'>
                  <h3>
                    <IntlMessages id='common.login' />
                  </h3>
                </div> */}

                <Form
                  className='login-form'
                  name='basic'
                  initialValues={{
                    remember: true,
                    email: 'someAdmin1@disco.com',
                    password: 'somePassword@123',
                  }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name='email'
                    className='form-field'
                    rules={[
                      { required: true, message: 'Please input your Email!' },
                    ]}>
                    <Input placeholder={messages['common.email']} />
                  </Form.Item>

                  <Form.Item
                    name='password'
                    className='form-field'
                    rules={[
                      { required: true, message: 'Please input your Password!' },
                    ]}>
                    <Input
                      type='password'
                      placeholder={messages['common.password']}
                    />
                  </Form.Item>

                  <Form.Item
                    className='login-field-action'
                    name='remember'
                    valuePropName='checked'>
                    <>
                      <span className='login-field-action-link ml-auto' onClick={onGoToForgetPassword}>
                        <IntlMessages id='common.forgetPassword' />
                      </span>
                    </>
                  </Form.Item>
                  <Button
                    type='primary'
                    htmlType='submit'
                    className='login-form-btn'>
                    <IntlMessages id='common.login' />
                  </Button>
                </Form>
              </Col>
            </AppRowContainer>
          </Card>
        </div>
      </AppAnimateGroup>
    </div>
  );
};

export default Signin;
