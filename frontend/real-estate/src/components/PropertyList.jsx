import React from "react";
import AuthNavBar from "./AuthNavBar";
import Header from "./Header.jsx";
import CardLists from "./CardLists.jsx";
import Footer from "./Footer";
import { checkToken } from "./forms/LoginForm";

const PropertyList = () => {
    const isLoggedIn = checkToken()  ;

    return (
        <section>
            <AuthNavBar loggedIn={isLoggedIn}/>
            <Header />
            <section id="subtitle">
                <p>PROPERTIES</p>
            </section>
            <section id="card-container">  
                <CardLists />
            </section>
            <Footer />

        </section>
    )
}
export default PropertyList;