import React from "react";
import SideBar from "./SideBar"
import AuthNavBar from "../AuthNavBar"
import Footer from "../Footer"
import "../../styles/dashboard.css"


const AdminDashboard = () => {
    
    return (
        <section id="main-dashboard-container">
            <AuthNavBar />   
            <section  className="check">
                 <p id="admin-label">Admin Dashboard</p>
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