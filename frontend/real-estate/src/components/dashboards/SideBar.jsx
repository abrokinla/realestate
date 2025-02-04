import React, { useState } from "react";
import RightPane from "./RightPane";
import DashboardCards from "./DashboardCards";
import jwtDecode from 'jwt-decode';
import NewProperty from "../forms/NewProperty";
import AgentProperties from "../AgentProperties";
import "../../styles/sidebar.css";
import Cookies from 'js-cookie';

const SideBar = ({ setRightPane }) => {
  
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleHamburgerClick = () => {
      setIsSidebarVisible(!isSidebarVisible);
  }

  const handleAddProperty = () => {
      setRightPane(<NewProperty />);
      setIsSidebarVisible(false);
  }

  const handleViewProperty = () => {
      const idToken = Cookies.get('idToken');
      const decodedToken = jwtDecode(idToken);
      const { agent_id } = decodedToken;
      setRightPane(<AgentProperties agentId={agent_id}/>)
      setIsSidebarVisible(false);
  }

    const handleShowDashboard = () => {
      setRightPane(<DashboardCards />);
      setIsSidebarVisible(false);
    };

    return (
        <section className="main-container">
          <div id="mobile-new-property">
            <i
              id="bar"
              className={isSidebarVisible ? "fas fa-times" : "fas fa-bars"}
              onClick={() => setIsSidebarVisible(!isSidebarVisible)}
            />
          </div>
          {isSidebarVisible && (
            <section id="side-bar-clicked">
                <input type="submit" onClick={handleAddProperty} value="Add New Property" />
                <input type="submit" onClick={handleViewProperty} value="View Properties" />
                <input type="submit" onClick={handleShowDashboard} value="Dashboard" />
            </section>
          )}
        </section>
      )
}
export default SideBar;
