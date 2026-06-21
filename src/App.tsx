import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConfigPage from "@/pages/ConfigPage";
import PreviewPage from "@/pages/PreviewPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConfigPage />} />
        <Route path="/preview" element={<PreviewPage />} />
      </Routes>
    </Router>
  );
}
