import React from "react"
import { PDFViewer } from '@react-pdf/renderer';
import StuInfoComponent from "../components/StuInfoComponent";
import {useParams, useNavigate} from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

function PdfPage() {
    const { studentId } = useParams();
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/'); // -1은 이전 페이지로 이동합니다.
    };
    const buttonStyle = {
        background: "none", // 배경색 제거
        border: "none", // 테두리 제거
        fontSize: "24px", // 이모티콘 크기 조정
        cursor: "pointer",
    };
    return (
        <>
            <button onClick={goBack} style={buttonStyle}>
                <HomeOutlined /> 메인페이지
            </button>
            <PDFViewer width="100%" height="800px">
                <StuInfoComponent studentId={studentId}/>
            </PDFViewer>
        </>
    );
}

export default PdfPage;
