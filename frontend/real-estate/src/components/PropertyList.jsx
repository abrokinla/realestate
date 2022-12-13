import React from "react";
import NavBar from "./NavBar";
import Header from "./Header.jsx";
import CardLists from "./CardLists.jsx";
import Footer from "./Footer";

function PropertyList() {
  

    return (
        <section>
            <NavBar />
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