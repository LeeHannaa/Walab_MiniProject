import { useEffect, useState } from "react";
import axios from "axios";
import {Document, Text, Page, Font} from '@react-pdf/renderer';

const styles = {
    page: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff", // 페이지 배경색
    },
    text: {
        fontSize: 14,
        marginBottom: 10, // 텍스트 아래 여백
        color: "#000",
        fontFamily: 'SpoqaHanSans',
    },
    frame: {
        width: "100%",
        height: "auto",
    },
};
Font.register({
    family: 'SpoqaHanSans',
    src:
        'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansLight.ttf',
});

function StuInfoComponent({ studentId }) {
    console.log(studentId);
    const [studentInfo, setStudentInfo] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/hgu/stuInfo/${studentId}`)
            .then((response) => {
                setStudentInfo(response.data); // 학생 정보를 상태에 설정
                console.log(response.data);
            })
            .catch((error) => {
                console.error("학생 정보를 불러오는 중 오류 발생: ", error);
            });
    }, [studentId]);
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.text}>학번: {studentInfo.id}</Text>
                <Text style={styles.text}>이름: {studentInfo.name}</Text>
                <Text style={styles.text}>학부: {studentInfo.department}</Text>
                <Text style={styles.text}>캠프 이름: {studentInfo.campname}</Text>
                <Text style={styles.text}>캠프 시작일: {studentInfo.campstartdate}</Text>
                <Text style={styles.text}>캠프 종료일: {studentInfo.campfinishdate}</Text>
            </Page>
        </Document>
    );
}

export default StuInfoComponent;