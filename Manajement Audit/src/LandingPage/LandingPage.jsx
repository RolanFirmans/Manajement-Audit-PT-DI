    import React from 'react'
    import '../App.css'

    export default function LandingPage() {
    return (
        <div>
        <header>
        <nav className="navbar">
            <div className="container">
            <a href="#">
                {/* <img src={logo} alt="Brand Logo" className="brand-logo" /> */}
            </a>
            <ul className="nav-list">
                <li><a href="">HOME</a></li>
                <li><a href="">ABOUT US</a></li>
                <li><a href="">ABOUT AUDIT ROLES</a></li>
            </ul>
            <Link to="/LoginPage" className="btn-login">Logout</Link>
            </div>
        </nav>
        </header>
        </div>
    )
    }
