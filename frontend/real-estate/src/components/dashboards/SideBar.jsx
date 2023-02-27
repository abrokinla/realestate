import React, { useState } from "react";
import RightPane from "./RightPane";
import jwtDecode from 'jwt-decode';
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
        const idToken = localStorage.getItem('idToken');
        const decodedToken = jwtDecode(idToken);
        const { user_id } = decodedToken;
        setRightPane(<AgentProperties agentId={user_id}/>)
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
