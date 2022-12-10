import React, { useState } from 'react';
import { Divider, Steps, Button, Space, Card, Checkbox, Col, Form, Input, DatePicker, Radio, InputNumber, Select, Modal } from 'antd';
import ListWapper from "../common/ListWapper";
import AppRowContainer from '../../@crema/core/AppRowContainer';
import { useIntl } from 'react-intl';
import { AiFillEdit } from "react-icons/ai";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { getProfile } from '../../store/AuthRedux'
import IntlMessages from '../../@crema/utility/IntlMessages';
const { Step } = Steps;

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { messages } = useIntl()

  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    console.log('onChange:', current);
    setCurrent(value);
  };

  const onFinish = (values) => {
    values['loginType'] = "email"
    dispatch(adminLogin(values))
  };
  const description = 'This is a description.';
  const [value, setValue] = useState(1);


  const [step, setStep] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [isModal1, setIsModal1] = useState(false);

  return (
    <ListWapper>
      <div className='participation'>
        {/* 1t */}
        {step === 0 && (<>
          <h3>REGISTRATION</h3>
          <h3> Welcome to our easy 3 step registration!</h3>

          <h3>Are you currently teaching ?</h3>
          <Space className='button-sec'>
            <Button onClick={() => setStep(1)} type="primary">Yes</Button>
            <Button onClick={() => navigate('/home')}>No</Button>
          </Space>
        </>)}

        {(step === 1 || step === 2 || step === 3) && (<Steps current={current}>
          <Step title="Personal Details" description={'Step 1'} />
          <Step title="Verification" description={'Step 2'} />
          <Step title="Registration" description={'Step 3'} />
        </Steps>)}



        {/* 1 */}
        {step === 1 && (<Card className='login-card login-card-lg'>
          <AppRowContainer>
            <Col xs={24} lg={24}>
              <div className='form-sec'>
                <Form
                  className='login-form'
                  name='basic'
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name='Name*'
                    className='form-field'
                    rules={[
                      {
                        required: true,
                        message: 'Please input the Name*!',
                      },
                    ]}>
                    <Input
                      placeholder="Name"
                    />
                  </Form.Item>

                  <Form.Item
                    name='Date of Birth*'
                    className='form-field'
                    rules={[
                      { required: true, message: 'Please input your Date of Birth*!' },
                    ]}>
                    <DatePicker onChange={onChange} placeholder="DD/MM/YYYY" />
                  </Form.Item>

                  <Form.Item label="Gender">
                    <Radio.Group name="radiogroup" defaultValue={1}>

                      <Radio value={1}>Male</Radio>
                      <Radio value={2}>Female</Radio>
                      <Radio value={3}>Prefer not to say</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    name="Grade*"
                    rules={[
                      {
                        required: true,
                        message: 'Please input the Grade*!',
                      },
                    ]}
                  >
                    <Select mode="multiple" placeholder="Grade">
                      <Option value="red">Red</Option>
                      <Option value="green">Green</Option>
                      <Option value="blue">Blue</Option>
                    </Select>
                  </Form.Item>


                  <Form.Item
                    name="Subject*"
                    rules={[
                      {
                        required: true,
                        message: 'Please input the Subject*!',
                      },
                    ]}
                  >
                    <Select mode="multiple" placeholder="Subject">
                      <Option value="red">Red</Option>
                      <Option value="green">Green</Option>
                      <Option value="blue">Blue</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name='School'
                    className='form-field'
                    rules={[
                      {
                        required: true,
                        message: 'Please input the School!',
                      },
                    ]}>
                    <Input
                      placeholder="School"
                    />
                  </Form.Item>

                  <Form.Item
                    name='Pincode'
                    className='form-field'
                    rules={[
                      {
                        required: true,
                        message: 'Please input the Pincode!',
                      },
                    ]}>
                    <Input
                      placeholder="Pincode"
                    />
                  </Form.Item>

                  <Form.Item
                    name='State'
                    className='form-field'
                    rules={[
                      {
                        required: true,
                        message: 'Please input the Email State!',
                      },
                    ]}>
                    <Input
                      placeholder="State"
                    />
                  </Form.Item>


                  <Form.Item
                    name='City'
                    className='form-field'
                    rules={[
                      {
                        required: true,
                        message: 'Please input the City!',
                      },
                    ]}>
                    <InputNumber min="aa" max="jndsd" defaultValue="City" onChange={onChange} />
                  </Form.Item>


                  <Form.Item
                    name='Mobile Number*'
                    className='form-field'
                    rules={[
                      {
                        required: true,
                        message: 'Please input the Email Mobile Number*!',
                      },
                    ]}>
                    <Input
                      placeholder="Mobile Number*"
                    />
                  </Form.Item>


                  <Form.Item
                    name='Email address'
                    className='form-field'
                    rules={[
                      {
                        required: true,
                        message: 'Please input the Email Email address!',
                      },
                    ]}>
                    <Input
                      placeholder="Email address"
                    />
                  </Form.Item>

                  <Form.Item
                    name='Re-enter Email address'
                    className='form-field'
                    rules={[
                      {
                        required: true,
                        message: 'Please input the Email Re-enter Email address!',
                      },
                    ]}>
                    <Input
                      placeholder="Re-enter Email address"
                    />
                  </Form.Item>
                  <Space className='button-sec'>
                    <Button
                      type='primary'
                      className='login-form-btn'
                      htmlType='submit' onClick={() => {setCurrent(1); setStep(2)}}>
                      Verify details
                    </Button>
                  </Space>
                </Form>
              </div>
            </Col>
          </AppRowContainer>
        </Card>)}


        {/* 2 */}
        {step === 2 && (<>
          <h3>Please enter the one-Time Password to Verify your account</h3>
          <p>A one-Time Passwordto has been send to 98531212*32</p>
          <div className='form-sec'>
            <Form
              className='login-form mb-0'
              name='basic'
              initialValues={{ remember: true }}
              onFinish={onFinish}>

              <Form.Item
                name='Password'
                className='form-field'
                rules={[
                  {
                    required: true,
                    message: 'Please input the Password!',
                  },
                ]}>
                <Input
                  placeholder="Password"
                />
              </Form.Item>

              <Space className='button-sec'>
                <Button type="primary" onClick={() => {setCurrent(2); setStep(3)}}
                  htmlType='submit'
                  className='login-form-btn'

                >
                  Validate
                </Button>


                <Button
                  htmlType='submit'
                  className='login-form-btn'
                >
                  No
                </Button>
              </Space>

              <div className='button-sec'>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='login-form-btn'>
                  Entered wrong mobile number ?
                </Button>
              </div>
            </Form>
          </div></>)}

        {/* 3d */}
        {step === 3 && (<>
          <h3>Your details are verified <br />Pick your username and password to start making questions.</h3>
          <div className='form-sec'>
            <Form
              className='login-form mb-0'
              name='basic'
              initialValues={{ remember: true }}
              onFinish={onFinish}>

              <Form.Item
                name='Username'
                className='form-field'
                rules={[
                  {
                    required: true,
                    message: 'Please input the Username!',
                  },
                ]}>
                <Input
                  placeholder="Username"
                />
              </Form.Item>

              <Form.Item
                name='Set Password'
                className='form-field'
                rules={[
                  {
                    required: true,
                    message: 'Please input the Set Password!',
                  },
                ]}>
                <Input
                  placeholder="Set Password"
                />
              </Form.Item>

              <Form.Item
                name='Confirm password'
                className='form-field'
                rules={[
                  {
                    required: true,
                    message: 'Please input the Confirm password!',
                  },
                ]}>
                <Input
                  placeholder="Confirm password"
                />
              </Form.Item>
            </Form>
          </div>
          <h3>Terms and Conditions</h3>
          <p>Terms and Conditions These terms and conditions outline the rules and regulations for the use of The CBSE's W ebsite, located at http://qmc.com. Cookies: The website uses cookies to help personalize your online experience. By accessing Question Making Competition Website, you agreed to use the required cookies. A cookie is a text file that is placed on your hard disk by a web page server. Cookies cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely assigned to you and can only be read by a web server in the domain that issued the cookie to you.A cookie is a text file that is placed on your hard disk by a web page server. Cookies cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely assigned to you and can only be read by a web server in the domain that issued the cookie to you.</p>
          <Checkbox onChange={onChange}>Checkbox</Checkbox>
          <div className='button-sec'>
            <Button type="primary" onClick={() => navigate('/home')}
              htmlType='submit'
              className='login-form-btn'
            >
              Finish Registration
            </Button>
          </div></>)}

      </div>

    </ListWapper>
  );
};


export default Registration;