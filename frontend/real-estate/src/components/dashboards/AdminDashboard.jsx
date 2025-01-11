import React, { useState } from "react";
import SideBar from "./SideBar"
import AuthNavBar from "../AuthNavBar"
import Footer from "../Footer"
import RightPane from "./RightPane";
import DashboardCards from "./DashboardCards";
import "../../styles/dashboard.css";
import { checkToken } from "../forms/LoginForm";


const AdminDashboard = () => {
    const isLoggedIn = checkToken();
    const [rightPane, setRightPane] = useState(<DashboardCards />); // Default to DashboardCards
   
    return (
        <section id="main-dashboard-container">
            <AuthNavBar loggedIn={isLoggedIn}/>   
            <section  className="check">
                 <p id="admin-label">Admin Dashboard</p>
            </section>
            <section id="dashboard-casing">                            
                <section className="sidebar">
                    <SideBar setRightPane={setRightPane} />
                </section>
                <section className="dashboard-content">
                    <RightPane rightPane={rightPane} />
                </section>                
            </section>
            < Footer />
        </section>
    )
}

export default AdminDashboard;