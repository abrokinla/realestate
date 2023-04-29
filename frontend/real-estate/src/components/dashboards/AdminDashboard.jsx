import React, { useEffect } from "react";
import SideBar from "./SideBar"
import AuthNavBar from "../AuthNavBar"
import Footer from "../Footer"
import "../../styles/dashboard.css"


const AdminDashboard = () => {
  //   useEffect(() => {
  //   const checkToken = async () => {
  //     if (localStorage.getItem("idToken")) {
  //       const idToken = localStorage.getItem("idToken");
  //       try {
  //         const response = await fetch(
  //           "http://localhost:5000/verify-token",
  //           {
  //             method: "POST",
  //             headers: {
  //               Authorization: idToken,
  //             },
  //           }
  //         );
  //         if (!response.ok) {
  //           window.location.href = "/login";
  //         }
  //       } catch (error) {
  //         console.error(error);
  //         window.location.href = "/login";
  //       }
  //     } else {
  //       window.location.href = "/login";
  //     }
  //   };
  //   checkToken();
  // }, []);
    
    return (
        <section id="main-dashboard-container">
            <AuthNavBar />   
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