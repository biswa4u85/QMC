import React, { useEffect } from 'react';
import IntlMessages from '../../@crema/utility/IntlMessages';
import AppAnimateGroup from '../../@crema/core/AppAnimateGroup';
import AppRowContainer from '../../@crema/core/AppRowContainer';
import { Button, Card, Checkbox, Col, Form, Input } from 'antd';
import { useIntl } from 'react-intl';
import './index.style.less';
import AppPageMetadata from '../../@crema/core/AppPageMetadata';
import { ReactComponent as Logo } from '../../assets/user/signup.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { adminLogin } from '../../store/AuthRedux'

const Forgetusername = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)

  const onFinish = (values) => {
    values['loginType'] = "email"
    dispatch(adminLogin(values))
  };

  useEffect(() => {
    if (token) {
      navigate('/login');
    }
  }, [token]);

  const { messages } = useIntl();

  return (
    <div className='login-pages'>
      <AppAnimateGroup type='bottom'>
        <AppPageMetadata title='Signup' />
        <div className='login-container' key='a'>
          <Card className='login-card login-card-lg'>
            <AppRowContainer>
              <Col xs={24} lg={12}>
                <div className='login-styled-img mln'>
                  <Logo />
                </div>
              </Col>

              <Col xs={24} lg={12}>
                <div className='login-card-header'>
                  <h3>
                    FORGET USERNAME/PASSWORD?
                  </h3>
                </div>

                <Form
                  className='login-form'
                  name='basic'
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name='name'
                    className='form-field'
                    rules={[
                      { required: true, message: 'Please input your Name!' },
                    ]}>
                    <Input placeholder={messages['common.name']} />
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
                    name='confirmPassword'
                    className='form-field'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Retype Password!',
                      },
                    ]}>
                    <Input
                      type='password'
                      placeholder={messages['common.retypePassword']}
                    />
                  </Form.Item>

                  <Button
                    type='primary'
                    className='login-form-btn'
                    htmlType='submit'>
                    SUBMIT
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

export default Forgetusername;
