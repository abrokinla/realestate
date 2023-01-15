import React from "react";
import SideBar from "./SideBar"
import RightPane from "./RightPane"
import "../../styles/dashboard.css"

const AdminDashbord = () => {
    return (
        <section id="dashboard-casing">
            <section className="sidebar">
                <SideBar />
            </section>
            <section className="right-pane">
                <RightPane />
            </section>
        </section>
    )
}

export default AdminDashbord;