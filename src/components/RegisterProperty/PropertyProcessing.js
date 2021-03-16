import React, { Component } from 'react';
import WithAuthHeader from '../WithAuthHeaderFooter/WithAuthHeader';
import {
    Layout, Button, Divider, Row, Col, Space, message, Collapse, Tabs, Alert
} from 'antd';

import { DownloadOutlined, CheckOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './register-property.css';
import '../css/global.css'
import { Link } from 'react-router-dom';
import BaseUrl from '../services/axios-url';
import WithAuthFooter from '../WithAuthHeaderFooter/WithAuthFooter';
import Cookies from 'universal-cookie';
import logoRound from '../images/logo-round.png';

const axios = require('axios');
const { Content } = Layout;

const { Panel } = Collapse;
const { TabPane } = Tabs;

class PropertyProcessing extends Component {
    state = {
        showVerification: false,
        loading: false,
        visible: false,
        ongoingPropertyData: [],
        confirmPropertyData: [],
        CCLoading: false,
        notLoggenInUser: false,
        propertyCount: 0
    }


    componentDidMount() {
        const cookie = new Cookies();
        const memberId = cookie.get('UU')

        // Ongoing property list
        const cookies = new Cookies();
        var cookieName = btoa('zeeps');
        // console.log('encodedStringBtoA', cookieName);
        var finalCookieName = '';
        finalCookieName = cookieName.replace('=', 'aAaA')

        var encodedStringBtoA = btoa('authorized');
        // console.log('encodedStringBtoA', encodedStringBtoA);
        var finalCookieValue = '';
        finalCookieValue = encodedStringBtoA.replace('==', 'aAaA')


        // Form data begins
        let apiEndpoint = '';
        let formData = new FormData();

        // already logged in user
        if (cookies.get(finalCookieName) == finalCookieValue) {
            axios
                .get(BaseUrl + '/memberapi/GetOnGoingPropertyDeatilByMemberId/' + memberId)
                .then((res) => {
                    // console.log(res)
                    if (res.data.status == 1 || res.data.status == '1') {
                        this.setState({ ongoingPropertyData: res.data.data })
                    } else {
                        message.error('Sorry!! Unable to fetch data from server..');
                    }

                })
                .catch((error) => {
                    console.log(error);
                    message.error('Server error');
                })


            // get confirmed contract list
            axios
                .get(BaseUrl + '/memberapi/GetConfirmedClosedPropertyByMemberId/' + memberId)
                .then((res) => {
                    // console.log(res)
                    if (res.data.status == 1 || res.data.status == '1') {
                        this.setState({ confirmPropertyData: res.data.data })
                    } else {
                        message.error('Sorry!! Unable to fetch data from server..');
                    }

                })
                .catch((error) => {
                    console.log(error);
                    message.error('Server error');
                })

            // get member name and total number of contracts
            axios
                .get(BaseUrl + '/memberapi/GetPropertyCountByMemberId/' + memberId)
                .then((res) => {
                    console.log(res)
                    if (res.data.status == 1 || res.data.status == '1') {
                        this.setState({
                            memberName: res.data.data.name,
                            propertyCount: res.data.data.propertyCount
                        })
                    } else {
                        message.error('Sorry!! Unable to fetch data from server..');
                    }

                })
                .catch((error) => {
                    console.log(error);
                    message.error('Server error');
                })


        }
        // Not logged in user
        else if (cookies.get(finalCookieName) == undefined || cookies.get(finalCookieName) == 'undefined') {
            this.setState({
                ongoingPropertyData: [],
                confirmPropertyData: [],
                notLoggenInUser: true
            })


            // axios
            //     .post("https://zeepsapis.herokuapp.com/adminapi/UpdateFeatureList", {
            //     .post("https://zeepsapis.herokuapp.com/adminapi/UpdateFacilityList", {
            //         "id": 12,
            //         "propertyFeatures": "싱크대"
            // "propertyFacility":"abc"
            //     })
            //     .then((res) => {
            //         console.log(res)
            //         if (res.data.status == 1 || res.data.status == '1') {
            //             message.success('ok');
            //             // this.setState({
            //             //     memberName: res.data.data.name,
            //             //     propertyCount: res.data.data.propertyCount
            //             // })
            //         } else {
            //         }

            //     })
            //     .catch((error) => {
            //         console.log(error);
            //         message.error('Server error');
            //     })

        }
        // Not a normal user
        else {
            message.error('Unauthenticated User!')
            return;
        }


    }

    confirmContract = (id) => {
        console.log(id)
        this.setState({ CCLoading: true })

        axios.post(BaseUrl + "/memberapi/UpdatePropertyStatusByPropertyId", {
            "id": id,
            "memberContractStatus": "confirmed"
        })
            .then(res => {
                console.log(res)
                if (res.data.status == 1) {
                    message.success('Contract confirmed successfully')

                    const cookie = new Cookies();
                    const memberId = cookie.get('UU')

                    axios
                        .get(BaseUrl + '/memberapi/GetOnGoingPropertyDeatilByMemberId/' + memberId)
                        .then((res) => {
                            // console.log(res)
                            if (res.data.status == 1 || res.data.status == '1') {
                                this.setState({ ongoingPropertyData: res.data.data })
                            } else {
                                message.error('Sorry!! Unable to fetch data from server..');
                            }

                        })
                        .catch((error) => {
                            console.log(error);
                            message.error('Server error');
                        })

                }
                else {
                    message.error(res.data.message);
                }
                this.setState({ CCLoading: false })
            })
            .catch((error) => {
                console.log(error);
                message.error('Sorry!! Something went wrong');
                this.setState({ CCLoading: false })
            })

    }

    render() {

        const { loading, ongoingPropertyData, confirmPropertyData, CCLoading, notLoggenInUser, memberName, propertyCount } = this.state;

        const onFinish = values => {
            console.log('Success:', values);
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        console.log(this.state.confirmPropertyData)
        // File Upload code end ------------------------------------------------------------------------------

        return (
            <Layout className="register-property-layout">

                <WithAuthHeader />

                <Content>

                    <Layout className="site-layout-background" >
                        <Space direction="vertical" size={'large'}>
                            <Content className="content-padding" >
                                <Row className="">
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 8 }} >
                                        {/* Left Side */}
                                    </Col>
                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 8 }} className="" >
                                        <Row>

                                            <Col className="text-center mb-15" span={24} >
                                                {/* <h2>Logo</h2> */}
                                                <img src={logoRound} />
                                            </Col>

                                            <Col className="text-center mb-15" span={24} >
                                                <h2>{memberName}</h2>
                                                <p>{propertyCount}건</p>
                                            </Col>

                                            <Col className=" mb-15" span={24} >
                                                <Button type="primary" className="theme-btn width100" ><Link to="/register-property">집 내놓기</Link></Button>
                                            </Col>

                                            <Divider />

                                            <Tabs defaultActiveKey="1" className="width100 mb-15" >
                                                <TabPane tab="중개중 부동산" key="1">
                                                    {
                                                        notLoggenInUser && <Row>
                                                            <Col span={24}>
                                                                <Alert
                                                                    showIcon
                                                                    message="로그인 해주세요"
                                                                    description="진행중인 부동산 목록을 보려면 로그인하십시오" type="info"
                                                                    type="info"
                                                                />
                                                            </Col>
                                                        </Row>
                                                    }

                                                    {ongoingPropertyData.map((d, i) => {
                                                        return <Row key={i} className="border-light p-10 mb-10">
                                                            <Col className=" mb-15" span={12} >
                                                                <b>계약정보∙계약대기</b>
                                                            </Col>
                                                            <Col className="text-right mb-15" span={12} >
                                                                <Button shape="round" className="theme-btn-default">계약서 히스토리</Button>
                                                            </Col>

                                                            <Col span={24}>
                                                                <Link to={'/property-detail/' + d.id}>
                                                                    <h2 className="theme-color">
                                                                        {d.name}
                                                                    </h2>
                                                                </Link>
                                                            </Col>

                                                            <Col className=" mb-15" span={12} >담당자 </Col>
                                                            <Col className="text-right mb-15" span={12} >
                                                                <b>{d.manager}</b>
                                                            </Col>

                                                            <Col className=" mb-15" span={12} >주소   </Col>
                                                            <Col className="text-right mb-15" span={12} >
                                                                <b>{d.address}</b>
                                                            </Col>

                                                            <Col className=" mb-15" span={12} >거래유형 </Col>
                                                            <Col className="text-right mb-15" span={12} >
                                                                <b>{d.propertyType}</b>
                                                            </Col>

                                                            {/* <Col className=" mb-15" span={12} >Maintenance fee </Col> */}
                                                            <Col className=" mb-15" span={12} >관리비 </Col>
                                                            <Col className="text-right mb-15" span={12} >
                                                                <b>{d.maintanceFee}</b>
                                                            </Col>

                                                            {/* <Col className=" mb-15" span={12} >Floor </Col> */}
                                                            <Col className=" mb-15" span={12} >층 </Col>
                                                            <Col className="text-right mb-15" span={12} >
                                                                <b>7th</b>
                                                            </Col>

                                                            <Collapse className=" mb-15" defaultActiveKey="" style={{ width: '100%' }} >
                                                                <Panel header="&nbsp;" key="1">
                                                                    <Row>
                                                                        <Col className=" mb-15" span={12} >
                                                                            방 번호
                                                                        </Col>
                                                                        <Col className="text-right mb-15" span={12} >
                                                                            <b>{d.rooms}</b>
                                                                        </Col>

                                                                        <Col className=" mb-15" span={12} >방향 </Col>

                                                                        <Col className="text-right mb-15" span={12} >
                                                                            <b>{d.direction}</b>
                                                                        </Col>
                                                                        <Col className=" mb-15" span={12} >전용 구역</Col>
                                                                        <Col className="text-right mb-15" span={12} >
                                                                            <b>{d.areaSquare}</b>
                                                                        </Col>
                                                                        <Col className=" mb-15" span={12} >엘리베이터 </Col>
                                                                        <Col className="text-right mb-15" span={12} >
                                                                            <b>{d.elevator ? 'Available' : 'Not Available'}</b>
                                                                        </Col>
                                                                        <Col className=" mb-15" span={12} >입주 가능 날짜  </Col>
                                                                        <Col className="text-right mb-15" span={12} >
                                                                            <b>{d.availableMoveInDate}</b>
                                                                        </Col>
                                                                    </Row>
                                                                </Panel>
                                                            </Collapse>

                                                            {d.manager ?
                                                                <Space>
                                                                    <Row>
                                                                        <Col className=" mb-15" style={{ 'marginRight': '5px' }} xs={24} sm={11} >
                                                                            <Button block shape="round" icon={<DownloadOutlined />} className="theme-btn-default">계약서 다운로드 </Button>
                                                                        </Col>
                                                                        <Col className="text-right mb-15" xs={24} sm={11} >
                                                                            <Button
                                                                                block
                                                                                shape="round"
                                                                                icon={<CheckOutlined />} className="theme-btn"
                                                                                onClick={() => this.confirmContract(d.id)}
                                                                                loading={CCLoading}
                                                                            >
                                                                                계약서 컨펌하기
                                                                        </Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Space>
                                                                :
                                                                <Space>
                                                                    <Row>
                                                                        <Col className=" mb-15" style={{ 'marginRight': '5px' }} xs={24} sm={11} >
                                                                            <Button block shape="round" icon={<DownloadOutlined />} className="disabled-btn-default" disabled="disabled">계약서 다운로드 </Button>
                                                                        </Col>
                                                                        <Col className="text-right mb-15" xs={24} sm={11}>
                                                                            <Button block shape="round" icon={<CheckOutlined />} className="disabled-btn" disabled="disabled"
                                                                            >계약서 컨펌하기 </Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Space>
                                                            }
                                                        </Row>

                                                    })}
                                                </TabPane>

                                                <TabPane tab="마이 부동산" key="2">

                                                    {
                                                        notLoggenInUser && <Row>
                                                            <Col span={24}>
                                                                <Alert
                                                                    showIcon
                                                                    message="로그인 해주세요"
                                                                    description="속성 목록을 보려면 로그인하십시오" type="info"
                                                                    type="info"
                                                                />
                                                            </Col>
                                                        </Row>
                                                    }
                                                    {confirmPropertyData.map((d, i) => {
                                                        return <Row key={i} className="border-light p-10 mb-10">
                                                            <Col className=" mb-15" span={12} >
                                                                <b>계약정보∙계약완료</b>
                                                            </Col>
                                                            <Col className="text-right mb-15" span={12} >
                                                                <Button shape="round" className="theme-btn-default">계약서 히스토리 </Button>
                                                            </Col>

                                                            <Col span={24}>
                                                                <Link to={'/property-detail/' + d.id}>
                                                                    <h2 className="theme-color">
                                                                        {d.name}
                                                                    </h2>
                                                                </Link>
                                                            </Col>

                                                            <Col className=" mb-15" span={12} >담당자 </Col>
                                                            <Col className="text-right mb-15" span={12} >
                                                                <b>{d.manager}</b>
                                                            </Col>

                                                            <Col className=" mb-15" span={12} >주소   </Col>
                                                            <Col className="text-right mb-15" span={12} >
                                                                <b>{d.address}</b>
                                                            </Col>

                                                            <Col className=" mb-15" span={12} >거래유형 </Col>
                                                            <Col className="text-right mb-15" span={12} >
                                                                <b>{d.propertyType}</b>
                                                            </Col>

                                                            <Col className=" mb-15" span={12} >관리비 </Col>
                                                            <Col className="text-right mb-15" span={12} >
                                                                <b>{d.maintanceFee}</b>
                                                            </Col>

                                                            <Col className=" mb-15" span={12} >층 </Col>
                                                            <Col className="text-right mb-15" span={12} >
                                                                <b>7th</b>
                                                            </Col>

                                                            <Collapse className=" mb-15" defaultActiveKey="" style={{ width: '100%' }} >
                                                                <Panel header="&nbsp;" key="1">
                                                                    <Row>
                                                                        <Col className=" mb-15" span={12} >
                                                                            방 번호
                                                                        </Col>
                                                                        <Col className="text-right mb-15" span={12} >
                                                                            <b>{d.rooms}</b>
                                                                        </Col>

                                                                        <Col className=" mb-15" span={12} >방향 </Col>

                                                                        <Col className="text-right mb-15" span={12} >
                                                                            <b>{d.direction}</b>
                                                                        </Col>
                                                                        <Col className=" mb-15" span={12} >전용 구역</Col>
                                                                        <Col className="text-right mb-15" span={12} >
                                                                            <b>{d.areaSquare}</b>
                                                                        </Col>
                                                                        <Col className=" mb-15" span={12} >엘리베이터 </Col>
                                                                        <Col className="text-right mb-15" span={12} >
                                                                            <b>{d.elevator ? 'Available' : 'Not Available'}</b>
                                                                        </Col>
                                                                        <Col className=" mb-15" span={12} >입주 가능 날짜  </Col>
                                                                        <Col className="text-right mb-15" span={12} >
                                                                            <b>{d.availableMoveInDate}</b>
                                                                        </Col>
                                                                    </Row>
                                                                </Panel>
                                                            </Collapse>

                                                            {/* {d.manager ?
                                                                <Space>
                                                                    <Col className=" mb-15" span={24} >
                                                                        <Button block shape="round" icon={<DownloadOutlined />} className="theme-btn-default">Download Contract </Button>
                                                                    </Col>
                                                                    <Col className="text-right mb-15" span={24} >
                                                                        <Button block shape="round" icon={<CheckOutlined />} className="theme-btn">Confirm Contract </Button>
                                                                    </Col>
                                                                </Space>
                                                                :
                                                                <Space>
                                                                    <Col className=" mb-15" span={24} >
                                                                        <Button shape="round" icon={<DownloadOutlined />} className="disabled-btn-default" disabled="disabled">Download Contract </Button>
                                                                    </Col>
                                                                    <Col className="text-right mb-15" span={12} >
                                                                        <Button shape="round" icon={<CheckOutlined />} className="disabled-btn" disabled="disabled">Confirm Contract </Button>
                                                                    </Col>
                                                                </Space>
                                                            } */}
                                                        </Row>

                                                    })}
                                                    {/*                                                     
                                                    <Row className="border-light p-10">
                                                        <Col className=" mb-15" span={12} >
                                                            <b>Contract info </b>
                                                        </Col>
                                                        <Col className="text-right mb-15" span={12} >
                                                            <Button shape="round" className="theme-btn-default">Contract history </Button>
                                                        </Col>

                                                        <Col span={24}>
                                                            <h2 className="theme-color">Lorem Ipsum Dollar sit amet</h2>
                                                        </Col>

                                                        <Col className=" mb-15" span={12} >Manager </Col>
                                                        <Col className="text-right mb-15" span={12} >
                                                            <b>lorem ipsum</b>
                                                        </Col>

                                                        <Col className=" mb-15" span={12} >Address   </Col>
                                                        <Col className="text-right mb-15" span={12} >
                                                            <b>lorem ipsum</b>
                                                        </Col>

                                                        <Col className=" mb-15" span={12} >Type </Col>
                                                        <Col className="text-right mb-15" span={12} >
                                                            <b>lorem ipsum</b>
                                                        </Col>

                                                        <Col className=" mb-15" span={12} >Maintenance fee </Col>
                                                        <Col className="text-right mb-15" span={12} >
                                                            <b>lorem ipsum</b>
                                                        </Col>

                                                        <Col className=" mb-15" span={12} >Floor </Col>
                                                        <Col className="text-right mb-15" span={12} >
                                                            <b>7th</b>
                                                        </Col>

                                                       
                                                        <Collapse className=" mb-15" defaultActiveKey={['1']} style={{ width: '100%' }} >
                                                            <Panel header="&nbsp;" key="1">
                                                                <Row>
                                                                    <Col className=" mb-15" span={12} >
                                                                    방 번호</Col>
                                                                    <Col className="text-right mb-15" span={12} >
                                                                        <b>lorem ipsum</b>
                                                                    </Col>

                                                                    <Col className=" mb-15" span={12} >Direction </Col>

                                                                    <Col className="text-right mb-15" span={12} >
                                                                        <b>lorem ipsum</b>
                                                                    </Col>
                                                                    <Col className=" mb-15" span={12} >전용 구역</Col>
                                                                    <Col className="text-right mb-15" span={12} >
                                                                        <b>lorem ipsum</b>
                                                                    </Col>
                                                                    <Col className=" mb-15" span={12} >엘리베이터 </Col>
                                                                    <Col className="text-right mb-15" span={12} >
                                                                        <b>lorem ipsum</b>
                                                                    </Col>
                                                                    <Col className=" mb-15" span={12} >입주 가능 날짜  </Col>
                                                                    <Col className="text-right mb-15" span={12} >
                                                                        <b>lorem ipsum</b>
                                                                    </Col>
                                                                </Row>
                                                            </Panel>
                                                        </Collapse>

                                                    </Row> */}

                                                </TabPane>
                                            </Tabs>


                                        </Row>



                                    </Col>

                                    <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 6 }} >
                                        {/* Right Side */}
                                    </Col>



                                </Row>

                            </Content>
                        </Space>
                    </Layout>
                </Content>

                <WithAuthFooter />

            </Layout >

        );
    }
}

export default PropertyProcessing;