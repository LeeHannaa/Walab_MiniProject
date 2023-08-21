import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PdfPage from "./pages/PdfPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/student/:studentId" element={<PdfPage />} />
            </Routes>
        </Router>
    );
}
export default App;