import React, { useEffect } from 'react';
import IntlMessages from '../../@crema/utility/IntlMessages';
import { useIntl } from 'react-intl';
import AppAnimateGroup from '../../@crema/core/AppAnimateGroup';
import AppRowContainer from '../../@crema/core/AppRowContainer';
import { Button, Card, Col, Form, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.style.less';
import AppPageMetadata from '../../@crema/core/AppPageMetadata';
import { ReactComponent as Logo } from '../../assets/user/login.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { adminLogin } from '../../store/AuthRedux'


const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)

  const onFinish = (values) => {
    // dispatch(adminLogin(values))
  };

  useEffect(() => {
    if (token) {
      // navigate('/dashboards/viewprofile');
    }
  }, [token]);

  const onGoToForgetPassword = () => {
    navigate('/forget-password');
  };

  function onRememberMe(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

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
                  <h3> Welcome back!</h3>
                </div>
                <div className='login-card-header'>
                  <h5>
                    Sign In With
                  </h5>
                </div>

                <Form
                  className='login-form'
                  name='basic'
                  initialValues={{
                    remember: true,
                    email: '',
                    password: '',
                  }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name='email'
                    className='form-field'
                    rules={[
                      { required: true, message: 'Please input your name!' },
                    ]}>
                    <Input size="large" placeholder="Username or email" prefix={<UserOutlined />} />
                  </Form.Item>

                  <Form.Item
                    name='password'
                    className='form-field'
                    rules={[
                      { required: true, message: 'Please input your Password!' },
                    ]}>
                    <Input placeholder="password" prefix={<LockOutlined />} />
                  </Form.Item>

                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <br />
                  <br />
                  <Button
                    type='primary'
                    htmlType='submit'
                    className='login-form-btn'>
                    <IntlMessages id='common.login' />
                  </Button>
                </Form>
                <a onClick={() => navigate('/forget-password')}> Trouble logging in?</a>
                <br />
                <br />
                <div>
                  <a>Haven’t signed up?</a>
                  <Button onClick={() => navigate('/registration')}>Sign Up!</Button>
                </div>
              </Col>

            </AppRowContainer>
          </Card>
        </div>
      </AppAnimateGroup>
    </div>
  );
};

export default Signin;
