import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PdfPage() {
    const { studentId } = useParams();
    const [studentInfo, setStudentInfo] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/hgu/stuInfo/${studentId}`)
            .then((response) => {
                setStudentInfo(response.data); // 학생 정보를 상태에 설정
            })
            .catch((error) => {
                console.error("학생 정보를 불러오는 중 오류 발생: ", error);
            });
    }, [studentId]);

    return (
        <div>
            <h1>{studentInfo.id}</h1>
            <h1>{studentInfo.name}</h1>
            <h1>{studentInfo.department}</h1>
            <h1>{studentInfo.campname}</h1>
            <h1>{studentInfo.campstartdate}</h1>
            <h1>{studentInfo.campfinishdate}</h1>
        </div>
    );
}

export default PdfPage;
