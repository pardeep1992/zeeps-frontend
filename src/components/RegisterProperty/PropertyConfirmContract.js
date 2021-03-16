import React, { Component } from 'react';
import WithAuthHeader from '../WithAuthHeaderFooter/WithAuthHeader';
import {
    Layout, Button, Divider, Row, Col, Space, Modal, message, Carousel
} from 'antd';

import { DownloadOutlined, CheckOutlined, RightCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './register-property.css';
import '../css/global.css'
import { Link, Redirect } from 'react-router-dom';
import BaseUrl from '../services/axios-url';
import WithAuthFooter from '../WithAuthHeaderFooter/WithAuthFooter';
import Cookies from 'universal-cookie';
import logoRound from '../images/logo-round.png';

const axios = require('axios');
const { Content } = Layout;

// /property-detail/:id
class PropertyConfirmContract extends Component {
    state = {
        showVerification: false,
        loading: false,
        visible: false,
        propertyData: [],
        propertyImages: [],
        CCLoading: false,
        redirectTo404: false,
        actualMaintainenceArray: [],
        actualOptionsArray: []
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    confirmContract = (id) => {
        console.log(id)
        axios.post(BaseUrl + "/memberapi/UpdatePropertyStatusByPropertyId", {
            "id": id,
            "memberContractStatus": "confirmed"
        })
            .then(res => {
                console.log(res)
                if (res.data.status == 1) {
                    message.success('Contract confirmed successfully')

                    var propertyId = window.location.pathname.split("/").pop();
                    axios
                        .get(BaseUrl + '/adminapi/GetPropertyDetailById/' + propertyId)
                        .then((response) => {

                            if (response.data.status == 1 || response.data.status == '1') {
                                // console.log("dddd: ", data.data.id);

                                //   var AllData = response.data.data;
                                console.log(response.data.data)

                                this.setState({
                                    propertyData: response.data.data,
                                    propertyImages: response.data.data.images
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

    componentDidMount() {
        var propertyId = window.location.pathname.split("/").pop();
        axios
            .get(BaseUrl + '/adminapi/GetPropertyDetailById/' + propertyId)
            .then((response) => {

                if (response.data.status == 1 || response.data.status == '1') {
                    // console.log("dddd: ", data.data.id);

                    //   var AllData = response.data.data;
                    console.log(response.data.data)

                    const cookies = new Cookies();
                    var cookieName = btoa('zeeps');
                    // console.log('encodedStringBtoA', cookieName);
                    var finalCookieName = '';
                    finalCookieName = cookieName.replace('=', 'aAaA')

                    var encodedStringBtoA = btoa('authorized');
                    // console.log('encodedStringBtoA', encodedStringBtoA);
                    var finalCookieValue = '';
                    finalCookieValue = encodedStringBtoA.replace('==', 'aAaA')

                    // already logged in user
                    if (cookies.get(finalCookieName) == finalCookieValue) {
                        if (cookies.get('UU')) {
                            if (response.data.data.memberId == cookies.get('UU')) {
                                this.setState({
                                    propertyData: response.data.data,
                                    propertyImages: response.data.data.images
                                })

                                var maintanceFeeOfProperty = response.data.data.facilities;
                                var optionsOfProperty = response.data.data.features;

                                // get maintanence fee / facilities ------------------------------------------
                                var allMaintanenceData = [];
                                var allOptionsData = [];
                                var i = 0;
                                var j = 0;
                                var actualMaintainenceArray = [];
                                var actualOptionsArray = [];


                                axios
                                    .get(BaseUrl + '/adminapi/GetAllPropertyFacilities/')
                                    .then((resp) => {

                                        console.log(resp.data.data)
                                        if (resp.data.status == 1 || resp.data.status == '1') {

                                            allMaintanenceData = resp.data.data;

                                            for (i = 0; i < maintanceFeeOfProperty.length; i++) {
                                                for (j = 0; j < allMaintanenceData.length; j++) {
                                                    if (maintanceFeeOfProperty[i] == allMaintanenceData[j].id) {
                                                        actualMaintainenceArray[i] = {
                                                            id: allMaintanenceData[j].id,
                                                            image: allMaintanenceData[j].FacilityImage,
                                                            name: allMaintanenceData[j].propertyFacility
                                                        }
                                                    }

                                                }
                                            }
                                            console.log(actualMaintainenceArray)
                                            this.setState({
                                                actualMaintainenceArray: actualMaintainenceArray
                                            })

                                        } else {
                                            message.error(resp.data.message);
                                        }

                                    })
                                    .catch((error) => {
                                        console.log(error);
                                        message.error('Sorry!! Unable to fetch maintanence items');

                                    })

                                // get options ----------------------------------------------
                                axios
                                    .get(BaseUrl + '/adminapi/GetAllPropertyFeatures/')
                                    .then((res) => {

                                        console.log(res.data.data)
                                        if (res.data.status == 1 || res.data.status == '1') {
                                            allOptionsData = res.data.data;

                                            for (i = 0; i < optionsOfProperty.length; i++) {
                                                for (j = 0; j < allOptionsData.length; j++) {
                                                    if (optionsOfProperty[i] == allOptionsData[j].id) {
                                                        actualOptionsArray[i] = {
                                                            id: allOptionsData[j].id,
                                                            image: allOptionsData[j].FeatureImage,
                                                            name: allOptionsData[j].propertyFeatures
                                                        }
                                                    }

                                                }
                                            }
                                            console.log(actualOptionsArray)
                                            this.setState({
                                                actualOptionsArray: actualOptionsArray
                                            })

                                        } else {
                                            message.error(res.data.message);
                                        }

                                    })
                                    .catch((error) => {
                                        console.log(error);
                                        message.error('Sorry!! Unable to fetch options');

                                    })

                            }
                            else {
                                message.error('Not Found!!!')
                                this.setState({ redirectTo404: true })
                                return;
                            }
                        } else {
                            message.error('Not Found!!')
                            this.setState({ redirectTo404: true })
                            return;
                        }
                    }
                    // Not logged in user
                    else if (cookies.get(finalCookieName) == undefined || cookies.get(finalCookieName) == 'undefined') {
                        message.error('Not Found !!')
                        this.setState({ redirectTo404: true })
                        return;
                    }
                    // Not a normal user
                    else {
                        message.error('Not Found!')
                        this.setState({ redirectTo404: true })
                        return;
                    }


                } else {
                    message.error('Sorry!! Unable to fetch data from server..');
                }

            })
            .catch((error) => {
                console.log(error);
                message.error('Server error');
            })
    }

    render() {

        const { visible, loading, propertyData, propertyImages, CCLoading } = this.state;

        console.log(this.state.showVerification)
        // File Upload code end ------------------------------------------------------------------------------
        const contentStyle = {
            height: '280px',
            // color: '#fff',
            lineHeight: '280px',
            textAlign: 'center',
            // backgroundImage: url('https://dummyimage.com/350x40/'),
        };

        if (this.state.redirectTo404 === true) {
            return <Redirect
                to={{
                    pathname: '/not-found'
                }}
            />
        }

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
                                                <img src={logoRound} />
                                                <h2>목동아파트 112동</h2>
                                            </Col>


                                            <Col className="text-center" span={24} >
                                                <h2>{propertyData.name}</h2>
                                            </Col>

                                            <Divider />

                                            <Col span={24} className="mb-15">
                                                <Carousel autoplay effect="fade">
                                                    {propertyImages.map((img, i) => {
                                                        <div key={i}>
                                                            <img src={'https://zeepsapis.herokuapp.com/property/' + img} />
                                                        </div>
                                                    })}
                                                    <div>
                                                        <img src="https://placeimg.com/640/200/any" />
                                                    </div>
                                                    <div>
                                                        <img src="https://placeimg.com/640/200/tech" />
                                                    </div>
                                                </Carousel>
                                            </Col>

                                            <Col className=" mb-15" span={20} >
                                                <h4>담당자 <br /> <b>{propertyData.manager}</b> </h4>

                                            </Col>
                                            <Col className="text-right mb-15" span={4} >
                                                <Link onClick={this.showModal} to="#" className="theme-color font-30"><RightCircleOutlined /></Link>
                                            </Col>
                                        </Row>

                                        <Modal
                                            visible={visible}
                                            title="Manager information"
                                            onOk={this.handleOk}
                                            onCancel={this.handleCancel}
                                            footer={null}
                                            width={360}
                                        >
                                            <Row className="text-left">
                                                <p>
                                                담당자 <br />
                                                    <b>{propertyData.manager}</b> <br />
                                                    <b>{propertyData.managerContact}</b>
                                                </p>
                                                <Divider />

                                                <Space direction="vertical" className="width100">
                                                    <Col span={24}>
                                                        <Button key="back" className="width100 theme-btn" onClick={this.handleCancel} size={'large'}>
                                                            Confirmed
                                                        </Button>
                                                    </Col>
                                                </Space>
                                            </Row>
                                        </Modal>

                                        <Row className="border-light p-10">
                                            <Col className=" mb-15" span={12} >
                                                {/* <b>Property info </b> */}
                                                <b>매물정보 </b>
                                            </Col>
                                            <Col className="text-right mb-15" span={12} >
                                                <Button shape="round" className="theme-btn-default">계약서 히스토리 </Button>
                                            </Col>

                                            <Col className=" mb-15" span={12} >주소   </Col>
                                            <Col className="text-right mb-15" span={12} >
                                                <b>{propertyData.address}</b>
                                            </Col>

                                            <Col className=" mb-15" span={12} >거래유형 </Col>
                                            <Col className="text-right mb-15" span={12} >
                                                <b>{propertyData.propertyType}</b>
                                            </Col>

                                            <Col className=" mb-15" span={12} >관리비</Col>
                                            <Col className="text-right mb-15" span={12} >
                                                <b>{propertyData.maintanceFee}</b>
                                            </Col>

                                            <Col className=" mb-15" span={12} >층</Col>
                                            <Col className="text-right mb-15" span={12} >
                                                <b>7th</b>
                                            </Col>


                                            <Col className=" mb-15" span={12} >구조</Col>
                                            <Col className="text-right mb-15" span={12} >
                                                <b>{propertyData.rooms}</b>
                                            </Col>

                                            <Col className=" mb-15" span={12} >방향 </Col>
                                            <Col className="text-right mb-15" span={12} >
                                                <b>{propertyData.direction}</b>
                                            </Col>

                                            <Col className=" mb-15" span={12} >전용면적 </Col>
                                            <Col className="text-right mb-15" span={12} >
                                                <b>{propertyData.areaSquare}m2</b>
                                            </Col>

                                            <Col className=" mb-15" span={12} >엘레베이터 </Col>
                                            <Col className="text-right mb-15" span={12} >
                                                <b>{propertyData.elevator ? 'Available' : 'Not Available'}</b>
                                            </Col>

                                            <Col className=" mb-15" span={12} >입주가능일 </Col>
                                            <Col className="text-right mb-15" span={12} >
                                                <b>{propertyData.availableMoveInDate}</b>
                                            </Col>

                                            <Col className=" mb-15" span={24} >옵션  </Col>
                                            <Col className="mb-15" span={24} >
                                                <Row>
                                                    {
                                                        this.state.actualOptionsArray.map((o, i) => {
                                                            return <Col span={6} key={o.id}>
                                                                <img src=" https://placeimg.com/80/80/tech" />
                                                                {/* <img src={BaseUrl+o.image} /> */}
                                                                <br />
                                                                {o.name}
                                                            </Col>
                                                        })
                                                    }
                                                </Row>


                                            </Col>

                                            <Divider />

                                            <Col className=" mb-15" span={24} >관리비 포함 항목</Col>
                                            <Col className="mb-15" span={24} >

                                                <Row>
                                                    {
                                                        this.state.actualMaintainenceArray.map((m, i) => {
                                                            return <Col span={6} key={m.id}>
                                                                <img src=" https://placeimg.com/80/80" />
                                                                <br />
                                                                {/* <img src={BaseUrl+m.image} /> */}
                                                                {m.name}
                                                            </Col>
                                                        })
                                                    }
                                                </Row>
                                            </Col>

                                            <Col className=" mb-15" span={24} >상세위치 정보</Col>

                                            <Col className=" mb-15" span={24} >
                                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3411.9914896658825!2d75.76701051462322!3d31.220965168989835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391af4e636b784dd%3A0xd8f1509263158c8a!2sProtolabz%20Eservices!5e0!3m2!1sen!2sin!4v1611820347886!5m2!1sen!2sin" width="100%" height="200" frameborder="0" style={{ border: '0' }} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                                            </Col>

                                            <Button className=" mb-15" size={'large'} type="primary" block danger>
                                            국토교통부 실거래가 보기
                                            </Button>


                                            {propertyData.manager && propertyData.memberContractStatus == 'confirmation pending' ?
                                                <Space>
                                                    <Col className=" mb-15" span={24} >
                                                        {/* <Button block shape="round" icon={<DownloadOutlined />} className="theme-btn-default">Download Contract </Button> */}
                                                        <Button block shape="round" icon={<DownloadOutlined />} className="theme-btn-default">계약 다운로드 </Button>
                                                    </Col>
                                                    <Col className="text-right mb-15" span={24} >
                                                        <Button loading={CCLoading} block shape="round" icon={<CheckOutlined />} className="theme-btn" onClick={() => this.confirmContract(propertyData.id)} >계약 확인 </Button>
                                                    </Col>
                                                </Space>
                                                :
                                                <Space>
                                                    <Col className=" mb-15" span={24} >
                                                        <Button shape="round" icon={<DownloadOutlined />} className="disabled-btn-default" disabled="disabled">계약 다운로드 </Button>
                                                    </Col>
                                                    <Col className="text-right mb-15" span={12} >
                                                        <Button shape="round" icon={<CheckOutlined />} className="disabled-btn" disabled="disabled">계약 확인 </Button>
                                                    </Col>
                                                </Space>
                                            }

                                            {/* <Col className=" mb-15" span={12} >
                                                <Button shape="round" icon={<DownloadOutlined />} className="theme-btn-default">Download Contract </Button>
                                            </Col>
                                            <Col className="text-right mb-15" span={12} >
                                                <Button shape="round" icon={<CheckOutlined />} className="theme-btn">Confirm Contract </Button>
                                            </Col> */}

                                            <Col span={24} className="text-center">
                                                <Link to="/register-property">편집하다</Link>
                                            </Col>


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

export default PropertyConfirmContract;