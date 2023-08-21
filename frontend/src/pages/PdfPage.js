import React from "react"
import { PDFViewer } from '@react-pdf/renderer';
import StuInfoComponent from "../components/StuInfoComponent";

function PdfPage() {

    return (
        <PDFViewer width="100%" height="800px">
            <StuInfoComponent />
        </PDFViewer>
    );
}

export default PdfPage;
