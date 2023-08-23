import { useEffect, useState } from "react";
import axios from "axios";
import {Document, Text, Page, Font, View, Image} from '@react-pdf/renderer';
import HGU from "../assets/img/hgu.png";

Font.register({ //한글 폰트 설정
    family: 'SpoqaHanSans',
    src:
        'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansLight.ttf',
});
const styles = {
    page: {
        flexDirection: "column",
        backgroundColor: "#ffffff",
    },
    horizontalContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // 두 텍스트 사이에 공간을 둡니다.
    },
    title: {
        fontSize: 50,
        marginTop: 80,
        marginBottom: 50,
        color: "#000",
        fontFamily: 'SpoqaHanSans',
        textAlign: 'center',
    },
    ho: {
        fontSize: 15,
        marginTop: 30,
        marginLeft: 30,
        color: "black",
        fontFamily: 'SpoqaHanSans',
        textAlign: 'left',
    },
    logo: {
        width: 50,
        height: 50,
        marginTop: 40,
        marginRight: 50,
        textAlign: 'right',
    },
    info: {
        fontSize: 14,
        marginTop: 3,
        marginLeft: 350,
        color: "#000",
        fontFamily: 'SpoqaHanSans',
        textAlign: 'left',
    },
    date: {
        fontSize: 13,
        marginTop: 3,
        marginLeft: 350,
        color: "#000",
        fontFamily: 'SpoqaHanSans',
        textAlign: 'left',
    },
    ment1: {
        fontSize: 20,
        marginTop: 75,
        color: "#000",
        fontFamily: 'SpoqaHanSans',
        textAlign: 'center',
    },
    ment2: {
        fontSize: 20,
        marginTop: 5,
        color: "#000",
        fontFamily: 'SpoqaHanSans',
        textAlign: 'center',
    },
    ment3: {
        fontSize: 20,
        marginTop: 5,
        marginBottom: 30,
        color: "#000",
        fontFamily: 'SpoqaHanSans',
        textAlign: 'center',
    },
    text: {
        fontSize: 14,
        marginBottom: 10,
        color: "#000",
        fontFamily: 'SpoqaHanSans',
    },
    outerBorder: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        border: "2px solid gray",
        margin: "20px",
        padding: "2px",
    },
    today: {
        fontSize: 18,
        marginTop: 50,
        color: "#000",
        fontFamily: 'SpoqaHanSans',
        textAlign: 'center',
    },
    hgu: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 20,
        color: "#000",
        fontFamily: 'SpoqaHanSans',
        textAlign: 'center',
    },
};


function StuInfoComponent({ studentId }) {
    const [studentInfo, setStudentInfo] = useState({});
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const currentDate = `${year}년   ${month}월   ${day}일`;

    useEffect(() => {
        axios.get(`http://localhost:8080/hgu/stuInfo/${studentId}`)
            .then((response) => {
                setStudentInfo(response.data);
            })
            .catch((error) => {
                console.error("학생 정보를 불러오는 중 오류 발생: ", error);
            });
    }, [studentId]);
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.outerBorder}>
                    <View style={styles.horizontalContainer}>
                        <Text style={styles.ho}>[2023년 제 0001호]</Text>
                        <Image source={HGU} style={styles.logo}></Image>
                    </View>

                    <Text style={styles.title}>수 료 증</Text>
                    <Text style={styles.info}>성       명 :     {studentInfo.name}</Text>
                    <Text style={styles.info}>학       번 :     {studentInfo.id}</Text>
                    <Text style={styles.info}>학       부 :     {studentInfo.department}</Text>
                    <Text style={styles.info}>캠   프   기   간 :  </Text>
                    <Text style={styles.date}>{studentInfo.campstartdate} ~ {studentInfo.campfinishdate}</Text>
                    <Text style={styles.ment1}>
                        위 사람은 한동대학교에서 주최한 2023학년도
                    </Text>
                    <Text style={styles.ment2}>
                        '{studentInfo.campname}' 프로그램에 참가하여
                    </Text>
                    <Text style={styles.ment3}>
                        과정을 충실히 이수하였으므로 이 증서를 수여합니다.
                    </Text>
                    <Text style={styles.today}>{currentDate}</Text>
                    <Text style={styles.hgu}>한동대학교 SW아카데미</Text>
                </View>
            </Page>
        </Document>
    );
}

export default StuInfoComponent;