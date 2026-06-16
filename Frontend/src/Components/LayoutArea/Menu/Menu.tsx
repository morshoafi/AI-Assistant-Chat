import { NavLink } from "react-router-dom";
import "./Menu.css";

export function Menu() {
    return (
        <div className="Menu">
            <NavLink to="/chat">Chat</NavLink>
            <span> | </span>
            <NavLink to="/about">About</NavLink>
        </div>
    );
}