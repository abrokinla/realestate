import React from "react";
import NavBar from "./NavBar"
import Footer from "./Footer"
import "../styles/userProfile.css"

const UserProfile = () => {

    return (
        <section id="main-profile-container">
            <NavBar/>
            <h1>User Profile</h1>
            <section id="banner-container">
                <section id="user-banner">
                    {/* <img src="https://firebasestorage.googleapis.com/v0/b/real-estate-app-d5537.appspot.com/o/images%2Fuser-profile-background.jpg?alt=media&token=ef8de520-aaea-4406-ae08-c82de012f7b8"></img> */}
                </section>                
                <section id="profile-picture">

                </section>

                <section id="user-info">
                    <p>whatsapp:</p>
                    <p>Agent Call Number:</p>
                    <p>Business web:</p>
                </section>
                
            </section>

            <section id="user-details">
                <h2>User Details </h2>
                <p>First Name:</p>
                <p>Last Name:</p>
                <p>E-mail Address:</p>
                <p>Business Name:</p>
            </section>

            <Footer/>
            
        </section>
    )
}

export default UserProfile;