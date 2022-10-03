import React from 'react';
import { image } from './components/images/logo.png';

export default function NavBar() {
    return (
        <header>
            <nav>
                <img src ={image} className="Logo" />
                <ul className="nav-items">
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                    <li>Property</li>
                    <li className="login">Login/Sign Up</li>
                </ul>
            </nav>
        </header>
    )
}