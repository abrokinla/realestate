import React from "react";
import NavBar from "./NavBar";
import Header from "./Header.jsx";
import CardList from "./CardList.jsx";
import Footer from "./Footer";
import Pagination from "./Pagination";

function PropertyList() {
  

    return (
        <section>
            <NavBar />
            <Header />
            <section id="subtitle">
                <p>PROPERTIES</p>
            </section>
            <section id="card-container">  
                <CardList rating = {2} />
            </section>
            <Footer />

        </section>
    )
}
export default PropertyList;