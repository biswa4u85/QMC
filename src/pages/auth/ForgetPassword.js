import React, { useRef, useEffect } from 'react';
import IntlMessages from '../../@crema/utility/IntlMessages';
import AppAnimateGroup from '../../@crema/core/AppAnimateGroup';
import { Button, Card, Col, Form, Input } from 'antd';
import AppRowContainer from '../../@crema/core/AppRowContainer';
import { useIntl } from 'react-intl';
import './index.style.less';
import AppPageMetadata from '../../@crema/core/AppPageMetadata';
import { ReactComponent as Logo } from '../../assets/user/forgot-password.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { forgetPassword } from '../../store/AuthRedux'

const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const pageActive = useRef(false);
  const isEditData = useSelector((state) => state.auth.isEditData)

  const onFinish = (values) => {
    dispatch(forgetPassword(values))
    pageActive.current = true
  };

  useEffect(() => {
    if (isEditData && pageActive.current) {
      pageActive.current = false
      navigate('/reset-password');
    }
  }, [isEditData]);
  const { messages } = useIntl();

  return (
    <div className='login-pages'>
      <AppAnimateGroup type='bottom'>
        <AppPageMetadata title='Forgot Password' />
        <div className='login-container' key='a'>
          <Card className='login-card login-card-lg login-card-for-password'>
            <AppRowContainer>
              <Col xs={24} lg={12}>
                <div className='login-styled-img'>
                  <Logo />
                </div>
              </Col>
              <Col xs={24} lg={12}>
                <div className='login-styled-for-password'>
                  <div className='login-card-header'>
                    <h3>
                      <IntlMessages id='common.forgetPassword' />
                    </h3>
                  </div>

                  <div className='login-card-para'>
                    <p className='mb-0'>
                      <IntlMessages id='common.forgetPasswordTextOne' />
                    </p>
                    <p className='mb-0'>
                      <IntlMessages id='common.forgetPasswordTextTwo' />
                    </p>
                  </div>

                  <Form
                    className='login-form mb-0'
                    name='basic'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}>
                    <Form.Item
                      name='email'
                      className='form-field-lg'
                      rules={[
                        {
                          required: true,
                          message: 'Please input your Email Address!',
                        },
                      ]}>
                      <Input placeholder={messages['common.emailAddress']} />
                    </Form.Item>
                    <div style={{marginBottom:10}}>
                      <span className='login-field-action-link ml-auto' onClick={() => navigate('/signin')}>
                        Back to login
                      </span>
                    </div>
                    <Button
                      type='primary'
                      htmlType='submit'
                      className='login-form-btn'>
                      SUBMIT
                    </Button>
                  </Form>
                </div>
              </Col>
            </AppRowContainer>
          </Card>
        </div>
      </AppAnimateGroup>
    </div>
  );
};

export default ForgetPassword;
