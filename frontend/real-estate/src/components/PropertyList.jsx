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
                {/* <CardList rating = {1}  /> */}
                <CardList rating = {2} />
                {/* <CardList rating = {3}  /> */}
            </section>
            <Pagination />
            <Footer />

        </section>
    )
}
export default PropertyList;