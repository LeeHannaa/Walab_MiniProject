import React, { useEffect, useState } from "react";
import { FolderOpenOutlined, FilePdfOutlined, DeleteOutlined, PlusOutlined, PaperClipOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Table, theme } from "antd";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import styled from "styled-components";


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu; // SubMenu 컴포넌트 추가

const CreateButton = styled.button`
    text-align: center;
    float: right;
    margin-bottom: 20px;
    align-items: right;
    width: 150px;
    height: 30px;
    background: #000080;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
`;
function HomePage() {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer }
    } = theme.useToken();
    // Read
    const [studentList, setStudentList] = useState([]);
    const [campNames, setCampNames] = useState([]);
    const [selectedCampName, setSelectedCampName] = useState("");

    const columns = [
        {
            title: "학번",
            dataIndex: "id",
            key: "id",
            align: "center",
        },
        {
            title: "이름",
            dataIndex: "name",
            key: "name",
            align: "center",
        },
        {
            title: "학부",
            dataIndex: "department",
            key: "department",
            align: "center",
        },
        {
            title: "캠프 이름",
            dataIndex: "campname",
            key: "campname",
            align: "center",
        },
        {
            title: "캠프 시작일",
            dataIndex: "campstartdate",
            key: "campstartdate",
            align: "center",
        },
        {
            title: "캠프 마감일",
            dataIndex: "campfinishdate",
            key: "campfinishdate",
            align: "center",
        },
        {
            title: "PDF 생성",
            dataIndex: "generatePdf",
            key: "generatePdf",
            align: "center",
            render: (text, student) => (
                <span
                    style={{ cursor: "pointer" , display: "flex", justifyContent: "center" }}
                    onClick={() => handleGeneratePdfClick(student)} // 클릭 이벤트 핸들러 호출
                >
                    <FilePdfOutlined />
                </span>
            ),
        },
        {
            title: "수정",
            dataIndex: "update",
            key: "update",
            align: "center",
            render: (text, student) => (
                <span
                    style={{ cursor: "pointer", display: "flex", justifyContent: "center" }}
                    onClick={() => handleUpdateStudentClick(student.id)} // 클릭 이벤트 핸들러 호출
                >
                    <PaperClipOutlined />
                </span>
            ),
        },
        {
            title: "삭제",
            dataIndex: "delete",
            key: "delete",
            align: "center",
            render: (text, student) => (
                <span
                    style={{ cursor: "pointer", display: "flex", justifyContent: "center" }}
                    onClick={() => handleDeleteStudent(student.id)} // 클릭 이벤트 핸들러 호출
                >
                    <DeleteOutlined />
                </span>
            ),
        },
    ];

    const handleGeneratePdfClick = (student) => {
        // 클릭한 학생 정보를 다른 페이지로 전달
        navigate(`/student/${student.id}`);
    };
    const fetchStudent = async () => {
        try {
            const response = await axios.get('http://localhost:8080/hgu/stuInfo');
            setStudentList(response.data);

            // 중복 없는 캠프 이름 추출
            const uniqueCampNames = [...new Set(response.data.map(student => student.campname))];
            setCampNames(uniqueCampNames);

            // 기본값은 첫 번째 캠프 이름으로 설정
            if (uniqueCampNames.length > 0) {
                setSelectedCampName(uniqueCampNames[0]);
            }
        } catch (error) {
            console.error("학생 목록을 불러오는 중 오류 발생: ", error);
        }
    };
    const handleDeleteStudent = async (studentId) => {
        // 클라이언트에서 서버로 DELETE 요청을 보내서 학생 정보를 삭제
        const result = window.confirm('이 뉴스를 정말 지우겠습니까?');
        if (result) {
            try {
                await axios.delete(`http://localhost:8080/hgu/stuInfo/${studentId}`);
                setStudentList((prevStudentList) =>
                    prevStudentList.filter((student) => student.id !== studentId)
                );
            } catch (error) {
                // 오류 처리
                console.error("삭제 실패", error);
            }
        }
    };

    useEffect(() => {
        fetchStudent();
    }, []);

    const handleCampNameSelect = (campName) => {
        setSelectedCampName(campName);
    };

    const handleCreateStudentClick = () => {
        navigate('/create');
    };

    const handleUpdateStudentClick = async (studentId) => {
        navigate(`/update/${studentId}`);
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    defaultSelectedKeys={["1"]}
                    mode="inline"
                >
                    <SubMenu key="campMenu" title="CampName" icon={<FolderOpenOutlined />}>
                        {campNames.map((campName) => (
                            <Menu.Item key={campName} onClick={() => handleCampNameSelect(campName)}>
                                {campName}
                            </Menu.Item>
                        ))}
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} >
                    <h2>캠프 수료증 PDF 자동 생성 프로그램</h2>
                </Header>
                <Content style={{ margin: "0 16px" }}>
                    <Breadcrumb style={{ margin: "16px 0" }}>
                        <Breadcrumb.Item> <h3> HGU 캠프 수료 명단 </h3> </Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 550,
                            background: colorBgContainer
                        }}
                    >
                        <CreateButton onClick={handleCreateStudentClick}><PlusOutlined></PlusOutlined> 수료 학생 추가하기</CreateButton>
                        <Table columns={columns} dataSource={studentList.filter(student => student.campname === selectedCampName)} />
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

export default HomePage;
