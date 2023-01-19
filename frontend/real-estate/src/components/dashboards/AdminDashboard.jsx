import React from "react";
import SideBar from "./SideBar"
import RightPane from "./RightPane"
import "../../styles/dashboard.css"
import { connect } from 'react-redux';
// import { updateRightPane } from './actions/index';

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