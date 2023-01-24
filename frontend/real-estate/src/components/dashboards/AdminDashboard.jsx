import React from "react";
import SideBar from "./SideBar"
import NavBar from "../NavBar"
import "../../styles/dashboard.css"
const AdminDashbord = () => {
    return (
        <section id="main-dashboard-container">
            <NavBar />   
                 <p>Admin Dashboard</p>
            <section id="dashboard-casing">            
                <section className="sidebar">
                    <SideBar />
                </section>
            </section>
        </section>
    )
}

export default AdminDashbord;