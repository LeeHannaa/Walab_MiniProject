import React from "react"
import { PDFViewer } from '@react-pdf/renderer';
import StuInfoComponent from "../components/StuInfoComponent";
import {useParams} from "react-router-dom";

function PdfPage() {
    const { studentId } = useParams();
    return (
        <PDFViewer width="100%" height="800px">
            <StuInfoComponent studentId={studentId}/>
        </PDFViewer>
    );
}

export default PdfPage;
