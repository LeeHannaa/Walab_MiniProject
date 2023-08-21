import React, {useEffect, useState} from "react";
import { FolderOpenOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import axios from 'axios';

const { Header, Content, Footer, Sider } = Layout;

function getItem(
    label,
    key,
    icon,
    children
) {
    return {
        key,
        icon,
        children,
        label
    };
}

const items = [
    getItem("CampName", "name1", <FolderOpenOutlined />, [
        getItem("Tom", "1"),
        getItem("Bill", "2"),
        getItem("Alex", "3")
    ])
];

function App() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer }
    } = theme.useToken();
    //Read
    const [studentList, setStudentList] = useState([]);
    const fetchStudent = async () => {
        const response = await axios.get('http://localhost:8080/hgu/stuInfo');
        setStudentList(response.data);
    };
    useEffect(() => {
        fetchStudent();
    }, []);

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
                    items={items}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}} >
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
                        캠프 수료한 사람들 명단 리스트
                        <ul>
                            {studentList.map((student) => (
                                <li key={student.id}><h3>{student.name} - {student.department} , {student.campname}</h3>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    HGU_Walab_MiniProject <a href="https://github.com/LeeHannaa/Walab_MiniProject.git" target="_blank" rel="noreferrer">@LeeHannaa</a>
                </Footer>
            </Layout>
        </Layout>
    );
}

export default App;

