import React, { useEffect, useState } from "react";
import { FolderOpenOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Table, theme } from "antd";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

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

    useEffect(() => {
        fetchStudent();
    }, []);

    const handleCampNameSelect = (campName) => {
        setSelectedCampName(campName);
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
                    {campNames.map((campName) => (
                        <Menu.Item key={campName} onClick={() => handleCampNameSelect(campName)}>
                            {campName}
                        </Menu.Item>
                    ))}
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} >
                    <h2><span><FolderOpenOutlined />  </span>캠프 수료증 PDF 자동 생성 프로그램</h2>
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
