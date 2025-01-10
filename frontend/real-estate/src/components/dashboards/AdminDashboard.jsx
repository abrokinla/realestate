import React from "react";
import SideBar from "./SideBar"
import AuthNavBar from "../AuthNavBar"
import Footer from "../Footer"
import "../../styles/dashboard.css";
import { checkToken } from "../forms/LoginForm";


import imgPropAppraisals from "../images/realEstIcons/appraisal.png"
import imgReportedProps from "../images/realEstIcons/reportedProps.png"
import imgTotalProps from "../images/realEstIcons/totalProps.png"
import imgAgentOverview from "../images/realEstIcons/agentOverview.png"
import imgUsersOverview from "../images/realEstIcons/Profile.png"

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

                {/* Property Appraisal card */}
                <section className="dash-cards"> 
                    <section className="d-card">
                        <section className="icon-container">
                            <img
                                src={imgPropAppraisals}
                                alt="property appraisal icon"                            
                            />
                        </section>
                        <section className="d-card-details">
                            <p>Property Appraisal</p>
                            <h2>12</h2>
                        </section>
                    </section>                

                    {/* Reported Properties Card */}                
                    <section className="d-card">
                        <section className="icon-container">
                            <img
                                src={imgReportedProps}
                                alt="reported properties icon"                            
                            />
                        </section>
                        <section className="d-card-details">
                            <p>Reported Properties</p>
                            <h2>4</h2>
                        </section>
                    </section>

                    {/* Total Properties card */}
                    <section className="d-card">
                        <section className="icon-container">
                            <img
                                src={imgTotalProps}
                                alt="total properties icon"                            
                            />
                        </section>
                        <section className="d-card-details">
                            <p>Total Properties</p>
                            <h2>4</h2>
                        </section>
                    </section>

                    {/* Agent overview card */}
                    <section className="d-card">
                        <section className="icon-container">
                            <img
                                src={imgAgentOverview}
                                alt="agent overview icon"                            
                            />
                        </section>
                        <section className="d-card-details">
                            <p>Agent Overview</p>
                            <h2>15</h2>
                        </section>
                    </section>


                </section>
            </section>
            < Footer />
        </section>
    )
}

export default AdminDashboard;