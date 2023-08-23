import React, { useState } from "react";
import {PlusOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, theme } from "antd";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const { Header, Content, Footer, Sider } = Layout;

const CreateButton = styled.button`
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-right: 20px;
    width: 120px;
    height: 40px;
    background: #000080;
    border: none;
    border-radius: 10px;
    color: white;
    cursor: pointer;
`;
const CancelButton = styled.button`
    width: 120px;
    height: 40px;
    background: #A9A9A9;
    color: white;
    border: none;
    border-radius: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
    cursor: pointer;
`;
const Div = styled.div`
    margin: 20px;
`;
const LabelText = styled.label`
    margin: 5px;
    font-size: 15px;
`;
const InputBox = styled.input`
  width: 400px;
  height: 40px;
`;

function CreatePage() {
    const {
        token: { colorBgContainer }
    } = theme.useToken();

    const [campData, setCampData] = useState({
        campfinishdate: '',
        campname: '',
        campstartdate: '',
        department: '',
        name: '',
        id: '',
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'date') {
            const dateValue = new Date(value);
            setCampData({ ...campData, [name]: dateValue.toISOString() });
        } else {
            setCampData({ ...campData, [name]: value });
        }
    };
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        await axios.post('http://localhost:8080/hgu/stuInfo/create', campData);

        // Reset the form fields
        setCampData({ id: '', name: '', department: '', campname: '', campstartdate: '', campfinishdate: '' });

        navigate(`/?campname=${campData.campname}`);

    };
    const handleCancelButtonClick = () => {
        navigate('/');
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider />
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} >
                    <h2>캠프 수료증 PDF 자동 생성 프로그램</h2>
                </Header>
                <Content style={{ margin: "0 16px" }}>
                    <Breadcrumb style={{ margin: "16px 0" }}>
                        <Breadcrumb.Item> <h3> HGU 캠프 수료자 추가</h3> </Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 550,
                            background: colorBgContainer
                        }}
                    >
                        <form onSubmit={handleSubmit}
                              style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Div>
                                <LabelText>학번</LabelText>
                                <InputBox
                                    type="text"
                                    name="id"
                                    value={campData.id}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Div>
                            <Div>
                                <LabelText>이름</LabelText>
                                <InputBox
                                    type="text"
                                    name="name"
                                    value={campData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Div>
                            <Div>
                                <LabelText>학부</LabelText>
                                <InputBox
                                    type="text"
                                    name="department"
                                    value={campData.department}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Div>
                            <Div>
                                <LabelText>캠프 이름</LabelText>
                                <InputBox
                                    type="text"
                                    name="campname"
                                    value={campData.campname}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Div>
                            <Div>
                                <LabelText>캠프 시작 일</LabelText>
                                <InputBox
                                    type="date"
                                    name="campstartdate"
                                    value={campData.campstartdate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Div>
                            <Div>
                                <LabelText>캠프 종료 일</LabelText>
                                <InputBox
                                    type="date"
                                    name="campfinishdate"
                                    value={campData.campfinishdate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Div>
                            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
                                <CreateButton type="submit"><PlusOutlined/> 추가</CreateButton>
                                <CancelButton onClick={handleCancelButtonClick}>취소</CancelButton>
                            </div>
                        </form>
                    </div>
                </Content>

                {/*Footer*/}
                <Footer style={{ textAlign: "center" }}>
                    HGU_Walab_MiniProject <a href="https://github.com/LeeHannaa/Walab_MiniProject.git" target="_blank" rel="noreferrer">@LeeHannaa</a>
                </Footer>
            </Layout>
        </Layout>
    );
}

export default CreatePage;