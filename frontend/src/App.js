import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PdfPage from "./pages/PdfPage";
import CreatePage from "./pages/CreatePage";
import UpdatePage from "./pages/UpdatePage";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/student/:studentId" element={<PdfPage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/update/:studentId" element={<UpdatePage />} />
            </Routes>
        </Router>
    );
}
export default App;