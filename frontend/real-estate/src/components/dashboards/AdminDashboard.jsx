import React from "react";
import SideBar from "./SideBar"
import AuthNavBar from "../AuthNavBar"
import Footer from "../Footer"
import "../../styles/dashboard.css";
import { checkToken } from "../forms/LoginForm";


const AdminDashboard = () => {
    const isLoggedIn = checkToken();
    
    return (
        <section id="main-dashboard-container">
            <AuthNavBar loggedIn={isLoggedIn}/>   
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