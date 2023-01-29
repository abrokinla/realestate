import React from "react";
import SideBar from "./SideBar"
import NavBar from "../NavBar"
import Footer from "../Footer"
import "../../styles/dashboard.css"


const AdminDashbord = () => {
    return (
        <section id="main-dashboard-container">
            <NavBar />   
                 <p id="admin-label">Admin Dashboard</p>
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