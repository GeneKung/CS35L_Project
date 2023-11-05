import { useState } from 'react';
import './Header.css';

export default function Header() {
    return (
        <div className="Header">
            <div className="Logo">
                <h1>Food-App</h1>
            </div>
            <div className="Login">
                <button class = "Login-Button">Log In</button>
            </div>
        </div>
    )
}