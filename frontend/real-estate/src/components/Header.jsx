import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/header.css";
import image from "./images/bckgrnd.jpg";

const Header = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [amount, setAmount] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const body = {
      description: description,
      location: location,
      amount: amount,
    };

    fetch("http://localhost:5000/search", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate({
          pathname: "/search",
          search:
            "?properties=" +
            encodeURIComponent(JSON.stringify(data.properties)),
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <section id="header-container">
        <img src={image} />
        <section id="header--sub--con">
          <h3>Get Your Dream Home From a Reliable Agency</h3>
          <p>Low Cost Housing Also Available</p>

          <form
            name="filter--form"
            onSubmit={handleSearch}
            id="main--search--box"
          >
            <section id="search-box">
              <select
                id="search-select"
                className="search-text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              >
                <option value="">What are you looking for?</option>
                <option value="apartment for sale">apartment for sale</option>
                <option value="apartment for rent">apartment for rent</option>
                <option value="shop for sale">shop for sale</option>
                <option value="shop for rent">shop for rent</option>
                <option value="landed property for sale">
                  landed property for sale
                </option>
                <option value="landed property for rent">
                  landed property for rent
                </option>
              </select>

              <input
                id="location-input"
                className="search-text"
                type="text"
                placeholder="Location(State)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <input
                id="price-input"
                className="search-text"
                type="text"
                placeholder="Price"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </section>
            <section id="search-btn">
              <i className="fa fa-search"></i>
              <input type="submit" value="Search" />
            </section>
          </form>
        </section>
      </section>
    </>
  );
};

export default Header;
