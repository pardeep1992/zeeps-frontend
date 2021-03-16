import React, { Component } from 'react';

import {
  Layout, Form, Input, Button, Select, Menu, Divider, DatePicker, message
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
const { Option } = Select;

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



class EditMember extends Component {

  state = {
    loading: false,
  }

  onFinish = values => {
    this.setState({ loading: true });
    console.log('Success:', values);

    axios
      .post(BaseUrl + "/adminapi/UpdateMember", {
        "id": window.location.pathname.split("/").pop(),
        "name": values.name,
        "mobile": values.mobile,
        "address": values.address,
        "email": values.email,
        "ismember": values.leave_status
      })
      .then(res => {
        console.log(res)
        if (res.data.status == 1) {
          message.success('Success.. Member information updated successfully')
          this.setState({ loading: false });
        } else {
          message.success('Sorry.. Something went wrong')
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
        message.error('Sorry!! Something went wrong');
      })
  };

  formRef = React.createRef();

  componentDidMount() {

    var memberId = window.location.pathname.split("/").pop();

    axios
      .get(BaseUrl + '/adminapi/GetMemberDeatilById/' + memberId)
      .then((response) => {
        console.log('data->', response.data.data)

        if (response.data.status == 1 || response.data.status == '1') {
          // console.log("dddd: ", data.data.id);

          this.formRef.current.setFieldsValue({
            name: response.data.data.name,
            password: '******',
            confirm: '******',
            mobile: response.data.data.mobile,
            leave_status: response.data.data.ismember ? 'true' : 'false' ,
            email: response.data.data.email,
            address: response.data.data.address
          });

        } else {
          message.error('Sorry!! Unable to fetch data from server..');
        }

      })
      .catch((error) => {
        console.log(error);
        message.error('Sorry!! Unable to fetch data from server..');
      })
  }


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
                    <p>회원 등록</p>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 12 }} >

                    <Button loading={loading} type="primary" className="theme-btn float-right" shape="round" htmlType="submit">
                      회원 저장
                      </Button>


                    <Button className="theme-btn-default float-right" shape="round" style={{ 'marginRight': '20px' }}>
                      <Link to="/member-setting" >
                        회원 목록
                        </Link>
                    </Button>
                  </Col>

                  <Divider />

                  <Col xs={{ span: 24 }} sm={{ span: 20 }} lg={{ span: 20 }} >
                    <p>기본 정보 </p>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 4 }} lg={{ span: 4 }} >

                  </Col>


                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }} >
                    <Form.Item
                      {...compLayout}
                      label="이름"
                      name="name"
                      rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} >
                    <Form.Item
                      {...regLayout}
                      label="비밀번호(필수)"
                      name="password"
                      rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                      <Input.Password readOnly disabled />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} >
                    <Form.Item
                      {...regLayout}
                      name="confirm"
                      label="비밀번호 확인"
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
                      <Input.Password readOnly disabled />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} >
                    <Form.Item
                      {...regLayout}
                      label="휴대폰 번호"
                      name="mobile"
                      rules={[{ required: true, message: 'Please input your mobile number!' }]}
                    >
                      <Input  />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 12 }} >
                    <Form.Item
                      {...regLayout}
                      label="탈퇴여부"
                      name="leave_status"
                      rules={[{ required: true, message: 'Please input your Leave Status!' }]}
                    >
                      <Select style={{ width: '100%' }} >
                        <Option value="">Select</Option>
                        <Option value="true">True</Option>
                        <Option value="false">False</Option>
                      </Select>

                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }} >
                    <Form.Item
                      {...compLayout}
                      label="이메일"
                      name="email"
                      rules={[{ required: true, message: 'Please input your Email address!' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 24 }} >
                    <Form.Item
                      {...compLayout}
                      label="주소"
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

export default EditMember;