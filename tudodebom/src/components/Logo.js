import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link to="/">
            <h1 className="logo">
                <span>
                    <img src="/imagens/logoIcon.png" alt="Logo do site" />
                </span>
            </h1>
        </Link>
    );
}

export default Logo;