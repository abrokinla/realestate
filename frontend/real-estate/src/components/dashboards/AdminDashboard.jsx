import React from "react";
import SideBar from "./SideBar"
import NavBar from "../NavBar"
import Footer from "../Footer"
import "../../styles/dashboard.css"


const AdminDashbord = () => {

    const logOut = () => {
        localStorage.removeItem("idToken");
        window.location.replace("/login");
    }

    return (
        <section id="main-dashboard-container">
            <NavBar />   
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

export default AdminDashbord;