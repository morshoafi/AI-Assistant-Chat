import { useNavigate } from "react-router-dom";
import "./Page404.css";

export function Page404() {
    const navigate = useNavigate();

    return (
        <div className="page-404">
            <div className="content-404">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>The page you're looking for doesn't exist or has been moved.</p>
                <button onClick={() => navigate("/")} className="home-btn">
                    Back to Chat 💬
                </button>
            </div>
        </div>
    );
}