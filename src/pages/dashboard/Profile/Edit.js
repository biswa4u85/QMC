import React, { useEffect, useRef, createRef } from 'react';
import { Button, Breadcrumb, Form, Row, Col, Input, Space, Upload, } from 'antd';
import ListWapper from "../../common/ListWapper";
import { useIntl } from 'react-intl';
import { AiFillBackward } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import UploadImage from "../../common/UploadImage";
import Selectbox from "../../common/AntForms/SelectBox";
import { useSelector, useDispatch } from 'react-redux'
import { editProfile } from '../../../store/AuthRedux'
import PhoneView from "../../common/Phone/PhoneView";

const Editrofile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { messages } = useIntl()
    const formRef = createRef();
    const token = useSelector((state) => state.auth.token)
    const userdata = useSelector((state) => state.auth.userdata)
    const isEditData = useSelector((state) => state.auth.isEditData)
    const pageActive = useRef(false);
    const genderLists = [{ _id: 'male', name: 'Male' }, { _id: 'female', name: 'Female' }, { _id: 'others', name: 'Others' }]
    const onFinish = (values) => {
        let params = { ...values, token, userId: userdata._id }
        pageActive.current = true;
        dispatch(editProfile(params))
    };

    // Redirect After Add/Edit
    useEffect(() => {
        if (isEditData && pageActive.current) {
            pageActive.current = false
            navigate('/dashboards/viewprofile');
        }
    }, [isEditData]);
    return (
        <ListWapper>
            <Row gutter={{ xs: 16, sm: 16, md: 32 }}>
                <Col xs={24} lg={24} >
                    <div className='profile-border'>
                        <Row>
                            <Col span={12} >
                                <Space>
                                    <Breadcrumb separator='>'>
                                        <Breadcrumb.Item>{messages['user.dshboards']}</Breadcrumb.Item>
                                        <Breadcrumb.Item >{messages['user.edit']}</Breadcrumb.Item>
                                    </Breadcrumb>
                                </Space>
                            </Col>
                            <Col span={12} >
                                <div className='promo-rightbtn'>
                                    <Button type='primary' danger onClick={() => navigate(-1)}><AiFillBackward size={17} />{messages['brand.back']}</Button>
                                </div>
                            </Col>

                        </Row>
                    </div>
                </Col>
                <Col xs={24} lg={24}>
                    <Form
                        ref={formRef}
                        initialValues={userdata}
                        onFinish={onFinish}>
                        <Row gutter={{ xs: 16, sm: 16, md: 32 }}>
                            <Col xs={24} lg={24}></Col>
                            <Col xs={24} lg={20}>
                                <Form.Item
                                    {...formItemLayout}
                                    name='name'
                                    label={'Name'}
                                    getValueFromEvent={e => (e.target.value).trimStart()}
                                    rules={[
                                        {
                                            required: true,
                                            message: ['Please enter name'],
                                        },
                                        {
                                            pattern: new RegExp("([a-zA-Z]{3,30}\\s*)+"),
                                            message: "Invalid character"
                                        }
                                    ]}>
                                    <Input type='text' placeholder={'Name'} />
                                </Form.Item>

                                <Form.Item
                                    {...formItemLayout}
                                    name='age'
                                    label={'Age'}
                                    getValueFromEvent={e => (e.target.value).trimStart()}
                                    rules={[
                                        {
                                            required: true,
                                            message: ['Please enter age'],
                                        },
                                        {
                                            pattern: new RegExp("^[1-9][0-9]+$"),
                                            message: "Invalid character"
                                        },
                                        {
                                            pattern: new RegExp("^[0-9]+$"),
                                            message: "Invalid character"
                                        }
                                    ]}>
                                    <Input max={120} type={'number'} placeholder={'Age'} />
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    name='avatar'
                                    label={'Profile Image'}
                                    rules={[
                                        {
                                            required: true,
                                            message: ['Please enter avatar'],
                                        },
                                    ]}>
                                    <UploadImage />
                                </Form.Item>

                                <Form.Item

                                    {...formItemLayout}
                                    name='gender'
                                    label={'Gender'}
                                    rules={[
                                        {
                                            required: true,
                                            message: ['Please select gender'],
                                        },
                                    ]}>
                                    <Selectbox showSearch={false} title="name" placeholder={'select gender'} data={genderLists} />
                                </Form.Item>

                                <Form.Item
                                    {...formItemLayout}
                                    name='email'
                                    label={'Email'}
                                    getValueFromEvent={e => (e.target.value).trimStart()}
                                    rules={[
                                        {
                                            required: true,
                                            message: ['Please enter Email'],
                                        },
                                        {
                                            pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                                            message: ['Please enter valid Email'],
                                        },
                                    ]}>
                                    <Input placeholder={'Email'} />
                                </Form.Item>
                                <Form.Item

                                    {...formItemLayout}
                                    name='phone'
                                    label={messages['common.phone']}
                                    rules={[
                                        {
                                            required: true,
                                            message: [messages['validation.phoneNumberRequired']],
                                        },
                                        {
                                            pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                                            message: "Invalid Number",
                                        },
                                    ]}
                                >
                                    <PhoneView />
                                </Form.Item>

                                <Form.Item
                                    {...tailLayout}>
                                    <Space size='large' >
                                        <Button type='primary' htmlType='submit'>{messages['common.update']}</Button>
                                        <Button onClick={() => navigate(-1)}>{messages['brand.cancel']}</Button>
                                    </Space>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </ListWapper>


    );
};


const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const formItemLayout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 12,
    },
};

const formTailLayout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 12,
        offset: 0,
    },
};


export default Editrofile;