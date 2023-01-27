import React, { useState } from "react";
import RightPane from "./RightPane";
import NewProperty from "../forms/NewProperty";
import AgentProperties from "../AgentProperties";
import "../../styles/sidebar.css";

const SideBar = () => {
    const [rightPane, setRightPane] = useState('');
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const handleHamburgerClick = () => {
        setIsSidebarVisible(!isSidebarVisible);
    }

    const handleAddProperty = () => {
        setRightPane(<NewProperty />);
        setIsSidebarVisible(false);
    }

    const handleViewProperty = () => {
        setRightPane(<AgentProperties agentId={agentId}/>)
        setIsSidebarVisible(false);
    }

    return (
        <section className="main-container">
            <div id="mobile-new-property">
                <i id="bar"
                className=
                {
                    isSidebarVisible ? "fas fa-times" : "fas fa-bars"
                }
                onClick={() => setIsSidebarVisible(!isSidebarVisible)}>
                </i>
            </div>            
            <section id={ isSidebarVisible ? "side-bar-clicked" : "side-bar"}>            
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
