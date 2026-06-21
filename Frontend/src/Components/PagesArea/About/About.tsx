import { useNavigate } from "react-router-dom";
import "./About.css";

export function About() {
    const navigate = useNavigate();

    return (
        <div className="about-container">
            <header className="about-header">
                <span className="badge">Next-Gen AI</span>
                <h2>Welcome to AI Assistant</h2>
                <p>A professional, context-aware AI chat platform designed for seamless interaction.</p>
                
                <div className="features-grid">
                    <div className="feature-card">
                        <span className="feature-icon">⚡</span>
                        <h3>Fast Responses</h3>
                        <p>Real-time AI processing with instant answers.</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">🤖</span>
                        <h3>Powered by OpenAI</h3>
                        <p>State-of-the-art smart language models.</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">🛡️</span>
                        <h3>Secure & Private</h3>
                        <p>Your conversations are processed with privacy in mind.</p>
                    </div>
                </div>

                <button className="chat-now-btn" onClick={() => navigate("/chat")}>
                    Start Chatting Now <span>→</span>
                </button>
            </header>

            <section className="about-me-section">
                <h3>About Me</h3>
                <p>
                    Hi, I'm Mor Shoafi. As a Full-Stack Web graduate from John Bryce, 
                    I am passionate about developing end-to-end solutions that bridge the gap 
                    between complex backend logic and seamless user experiences. 
                    This project represents the culmination of my training and my commitment 
                    to building high-performance, intelligent applications.
                </p>
            </section>

            <section className="project-vision">
                <h3>Project Vision</h3>
                <p>This application was developed to demonstrate high-performance integration between a robust FastAPI backend and a responsive React frontend, providing users with a seamless, context-aware AI chat experience.</p>
            </section>

            <section className="tech-section">
                <h3>Technical Stack</h3>
                <div className="tech-grid">
                    <div className="tech-card">
                        <span className="tech-icon">💻</span>
                        <h4>Frontend</h4>
                        <p>React, TypeScript, Vite, Axios</p>
                    </div>
                    <div className="tech-card">
                        <span className="tech-icon">⚙️</span>
                        <h4>Backend</h4>
                        <p>Python, FastAPI, Uvicorn</p>
                    </div>
                    <div className="tech-card">
                        <span className="tech-icon">🧠</span>
                        <h4>AI Integration</h4>
                        <p>OpenAI GPT-4o API</p>
                    </div>
                    <div className="tech-card">
                        <span className="tech-icon">🗄️</span>
                        <h4>Database</h4>
                        <p>MySQL relational storage</p>
                    </div>
                </div>
            </section>

            <footer className="about-footer">
                <div className="author-info">
                    <p>All code is managed with <strong>Git</strong> and hosted on <strong>GitHub</strong>.</p>
                    <a href="https://github.com/morshoafi/AI-Assistant-Chat" target="_blank" className="github-link">
                        View My Work on GitHub ➔
                    </a>
                </div>
            </footer>
        </div>
    );
}