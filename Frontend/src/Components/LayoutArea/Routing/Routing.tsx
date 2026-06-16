import { Navigate, Route, Routes } from "react-router-dom";
import { Page404 } from "../../PagesArea/Page404/Page404";
import { ChatPage } from "../../PagesArea/ChatPage/ChatPage";
import { About } from "../../PagesArea/About/About";

export function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/chat" replace />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/about" element={<About />} />
            
            {/* Catch-all for undefined routes */}
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}