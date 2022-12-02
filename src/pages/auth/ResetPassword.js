import React, { useRef, useEffect } from 'react';
import IntlMessages from '../../@crema/utility/IntlMessages';
import AppAnimateGroup from '../../@crema/core/AppAnimateGroup';
import { Button, Card, Col, Form, Input } from 'antd';
import { useIntl } from 'react-intl';
import AppRowContainer from '../../@crema/core/AppRowContainer';
import './index.style.less';
import AppPageMetadata from '../../@crema/core/AppPageMetadata';
import { ReactComponent as Logo } from '../../assets/user/reset-password.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { resetPassword } from '../../store/AuthRedux'

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const pageActive = useRef(false);
  const isEditData = useSelector((state) => state.auth.isEditData)
  const isEditDataPassword = useSelector((state) => state.auth.isEditDataPassword)

  const onFinish = (values) => {
    values['email'] = isEditData
    dispatch(resetPassword(values))
    pageActive.current = true
  };

  useEffect(() => {
    if (isEditDataPassword && pageActive.current) {
      pageActive.current = false
      navigate('/login');
    }
  }, [token]);
  const { messages } = useIntl();

  return (
    <div className='login-pages'>
      <AppAnimateGroup type='bottom'>
        <AppPageMetadata title='Reset Password' />
        <div className='login-container' key='a'>
          <Card className='login-card login-card-lg'>
            <AppRowContainer>
              <Col xs={24} md={12} className='login-styled-reset-img-col'>
                <div className='login-styled-img login-styled-img-auto'>
                  <Logo />
                </div>
              </Col>

              <Col xs={24} md={12}>
                <div className='login-card-header'>
                  <h3>
                  FORGET USERNAME/PASSWORD?
                  </h3>
                </div>
                <div className='login-card-header'>
                  <h5>
                  Enter the OTP received
                  </h5>
                </div>

                <Form
                  className='login-form mb-0'
                  name='basic'
                  initialValues={{ remember: true }}
                  onFinish={onFinish}>

                  <Form.Item
                    name='code'
                    className='form-field'
                    rules={[
                      {
                        required: true,
                        message: 'Please input the code!',
                      },
                    ]}>
                    <Input
                      placeholder="Enter OTP"
                    />
                  </Form.Item>

                  <Button
                    type='primary'
                    htmlType='submit'
                    className='login-form-btn'>
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

export default ResetPassword;
