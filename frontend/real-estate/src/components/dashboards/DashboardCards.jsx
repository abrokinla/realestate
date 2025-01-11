import React from "react";
import imgPropAppraisals from "../images/realEstIcons/appraisal.png";
import imgReportedProps from "../images/realEstIcons/reportedProps.png";
import imgTotalProps from "../images/realEstIcons/totalProps.png";
import imgAgentOverview from "../images/realEstIcons/agentOverview.png";
import imgRevenueManagement from "../images/realEstIcons/revenueMana.png";
import imgpropPerf from "../images/realEstIcons/propertyPerformance.png";
import imgPromoStatus from "../images/realEstIcons/PromotionStatus.png";
import imgsalesSummary from "../images/realEstIcons/SalesSummary.png";

const DashboardCards = () => {
    return (
        <section className="dashboard-card-container">
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
            </section>

            <section className="dash-cards"> 
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

            <section className="dash-cards"> 
                {/* Revenue Management card */}
                <section className="d-card">
                    <section className="icon-container">
                        <img
                            src={imgRevenueManagement}
                            alt="agent overview icon"                            
                        />
                    </section>
                    <section className="d-card-details">
                        <p>Revenue Management</p>
                        <h2>$10,000</h2>
                    </section>
                </section>

                {/* Property perfromance card */}
                <section className="d-card">
                    <section className="icon-container">
                        <img
                            src={imgpropPerf}
                            alt="agent overview icon"                            
                        />
                    </section>
                    <section className="d-card-details">
                        <p>Property Performance</p>
                        <h2>####</h2>
                    </section>
                </section>
            </section>

            <section className="dash-cards">                     
                {/* Property perfromance card */}
                <section className="d-card">
                    <section className="icon-container">
                        <img
                            src={imgPromoStatus}
                            alt="agent overview icon"                            
                        />
                    </section>
                    <section className="d-card-details">
                        <p>Promotion Status</p>
                        <h2>5</h2>
                    </section>
                </section>

                {/* Property perfromance card */}
                <section className="d-card">
                    <section className="icon-container">
                        <img
                            src={imgsalesSummary}
                            alt="agent overview icon"                            
                        />
                    </section>
                    <section className="d-card-details">
                        <p>Sales Summary</p>
                        <h2>$15000</h2>
                    </section>
                </section>
            </section>
        </section>
    )

}
export default DashboardCards;