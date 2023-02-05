import React from "react";
import SideBar from "./SideBar"
import NavBar from "../NavBar"
import Footer from "../Footer"
import "../../styles/dashboard.css"


const AdminDashboard = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    
    const logOut = () => {
        localStorage.removeItem('idToken')
        window.location.href = "/login";
        setIsLoggedIn(false);
    }

    return (
        <section id="main-dashboard-container">
            <NavBar isLoggedIn={isLoggedIn} />   
            <section  className="check">
                 <p id="admin-label">Admin Dashboard</p>
                 <button id="logout-btn" onClick={logOut}>Logout </button>
            </section>
            <section id="dashboard-casing">            
                <section className="sidebar">
                    <SideBar />
                </section>
            </section>
            < Footer />
        </section>
    )
}

export default AdminDashboard;