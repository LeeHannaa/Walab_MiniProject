import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {Document, Text, Page, Font} from '@react-pdf/renderer';
// 스타일 객체 직접 생성
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
    },
};
Font.register({
    family: 'Roboto',
    src: 'https://fonts.googleapis.com/css?family=Roboto',
});
function StuInfoComponent() {
    const { studentId } = useParams();
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
                <Text style={styles.text}>djsfjo: {studentInfo.id}</Text>
                <Text style={styles.text}>{studentInfo.name}</Text>
                <Text style={styles.text}>{studentInfo.department}</Text>
                <Text style={styles.text}>{studentInfo.campname}</Text>
                <Text style={styles.text}>{studentInfo.campstartdate}</Text>
                <Text style={styles.text}>{studentInfo.campfinishdate}</Text>
            </Page>
        </Document>
    );
}

export default StuInfoComponent;