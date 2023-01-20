import React from "react";
import SideBar from "./SideBar"
import "../../styles/dashboard.css"
const AdminDashbord = () => {
    return (
        <section id="dashboard-casing">
            <section className="sidebar">
                <SideBar />
            </section>
        </section>
    )
}

export default AdminDashbord;