import React from "react";
import SideBar from "./SideBar"
import AuthNavBar from "../AuthNavBar"
import Footer from "../Footer"
import "../../styles/dashboard.css"
const AgentDashbord = () => {
    return (
        <section id="main-dashboard-container">
            <AuthNavBar />   
                 <p id="admin-label">Agent Dashboard</p>
            <section id="dashboard-casing">            
                <section className="sidebar">
                    <SideBar />
                </section>
            </section>
            < Footer />
        </section>
    )
}

export default AgentDashbord;