import React from "react";
import NavBar from "./NavBar";
import Header from "./Header.jsx";
import SearchList from "./SearchList.jsx";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

const SearchResult = () => {
  const location = useLocation();
  const properties = JSON.parse(new URLSearchParams(location.search).get("properties"));

  return (
    <section>
      <NavBar />
      <Header />
      <section id="subtitle">
        <p>PROPERTIES</p>
      </section>
      <section id="card-container">
        <SearchList properties={properties} />
      </section>
      <Footer />
    </section>
  );
};

export default SearchResult;
