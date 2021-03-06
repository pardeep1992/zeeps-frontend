import React, { Component, useState } from 'react';

import {
  Layout, Form, Input, Button, Menu, message, DatePicker, Divider, Switch
} from 'antd';


import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';

import BaseUrl from '../../services/axios-url';
import TopNav from '../WithAuthHeaderFooter/TopNav';
import WithAuthFooter from '../WithAuthHeaderFooter/WithAuthFooter';
import MemberSettingsAside from './member-settings-aside';

const axios = require('axios');

const { Content } = Layout;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const compLayout = {
  labelCol: { span: 4 },
  wrapperCol: { offset: 0, span: 20 },
};
const regLayout = {
  labelCol: { span: 8 },
  wrapperCol: { offset: 0, span: 23 },
}

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

function GoBack() {
  window.history.back();
}

class RegisterManager extends Component {

  formRef = React.createRef();

  state = {
    loading: false,
    status: true
  }

  onStatusChange = (checked) => {
    // console.log(`switch to ${checked}`);
    this.setState({
      status: checked
    })
  }

  onFinish = values => {
    this.setState({ loading: true });
    console.log('Success:', values);

    axios
      .post(BaseUrl + "/adminapi/InsertNewManager", {
        "name": values.name,
        "mobile": values.mobile,
        "email": values.email,
        "password": values.password,
        "status": this.state.status,
        "address": values.address
      })
      .then(res => {
        console.log(res)
        if (res.data.status == 1) {
          message.success('Success.. Manager registered successfully')
          this.formRef.current.resetFields();
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
        message.error('Sorry!! Something went wrong');
      })
  };

  render() {

    const { loading } = this.state;

    return (
      <Layout>

        <TopNav />

        <Content >
          <Layout className="site-layout-background" >

            < MemberSettingsAside />

            <Content style={{ padding: '10px 24px' }}>


              <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={onFinishFailed}
                ref={this.formRef}
              >
                <Row>

                  <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 12 }} >
                    <p>????????? ?????? </p>
                    {/* <p>Register manager </p> */}
                  </Col>

                  

                  <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 12 }} >

                    <Button loading={loading} type="primary" className="theme-btn float-right" shape="round" htmlType="submit">
                    ????????? ??????
                      </Button>

                    <Button className="theme-btn-default float-right" shape="round" style={{ 'marginRight': '20px' }}>
                      <Link to="/managing-manager" >
                      ????????? ??????
                        </Link>
                    </Button>

                  </Col>

                  <Divider />

                  <Col xs={{ span: 24 }} sm={{ span: 20 }} lg={{ span: 20 }} >
                    <p>?????? ?????? </p>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 4 }} lg={{ span: 4 }} >

                  </Col>


                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }} >
                    <Form.Item
                      {...compLayout}
                      label="????????? ??????"
                      name="name"
                      rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} >
                    <Form.Item
                      {...regLayout}
                      label="????????????(??????)"
                      name="password"
                      rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                      <Input.Password />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} >
                    <Form.Item
                      {...regLayout}
                      name="confirm"
                      label="???????????? ??????"
                      dependencies={['password']}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                          validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                          },
                        }),
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} >
                    <Form.Item
                      {...regLayout}
                      label="????????? ??????"
                      name="mobile"
                      rules={[{ required: true, message: 'Please input your mobile number!' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} >
                    <Form.Item
                      {...regLayout}
                      label="????????? ?????????"
                      name="activation_status"
                      rules={[{ required: true, message: 'Please select your Status!' }]}
                    >
                      <Switch onChange={this.onStatusChange} />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }} >
                    <Form.Item
                      {...compLayout}
                      label="?????????"
                      name="email"
                      rules={[{ required: true, message: 'Please input your Email address!' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }} >
                    <Form.Item
                      {...compLayout}
                      label="??????"
                      name="address"
                      rules={[{ required: true, message: 'Please input your  address!' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>


                </Row>


              </Form>


            </Content>

          </Layout>
        </Content>

        <WithAuthFooter />

      </Layout>

    );
  }
}

export default RegisterManager;