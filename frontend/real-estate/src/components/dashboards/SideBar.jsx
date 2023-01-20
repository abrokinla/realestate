import React, { useState } from "react";
import RightPane from "./RightPane";
import "../../styles/sidebar.css";

const SideBar = () => {
    const [rightPane, setRightPane] = useState('');

    const handleAddProperty = () => {
        setRightPane('Add new property');
    }

    const handleViewProperty = () => {
        setRightPane('View property');
    }

    return (
        <section clasName="main-container">
            <section id="side-bar">
                <input type="submit" onClick={handleAddProperty} value="Add New Property" />            
                <input type="submit" onClick={handleViewProperty} value="View Properties" />            
            </section>
            <section id="rightPane">
                <RightPane rightPane={rightPane} />
            </section>
        </section>
    )
}
export default SideBar;
