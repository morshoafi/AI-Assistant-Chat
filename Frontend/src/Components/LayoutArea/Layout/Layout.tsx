import { Header } from "../Header/Header";
import { Menu } from "../Menu/Menu";
import { Routing } from "../Routing/Routing";
import "./Layout.css";

export function Layout() {
    return (
        <div className="Layout">
            <div className="top-section">
                <Header />
                <Menu />
            </div>
            <main>
                <div className="page-card">
                    <Routing />
                </div>
            </main>
        </div>
    );
}