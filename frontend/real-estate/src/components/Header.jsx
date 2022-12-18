import React from "react"
import "../styles/header.css"
import image from "./images/bckgrnd.jpg"
function Header() {
    return (
        <>       
        <section id="header-container">
            <img src={image}/>
            <section id="header--sub--con">
                <h3>Get Your Dream Home From a Relaible Agency</h3>
                <p>Low Cost Housing Also Available</p>

                <form name="filter--form" action="#" method="POST" id="main--search--box">
                    <label id="search-box">
                        <input id="search-text" type="text" placeholder="What are you looking for?"></input>
                        <input id="search-text" type="text" placeholder="Location"></input>
                        <input id="search-text" type="text" placeholder="Price"></input>                
                    </label>
                    <section id="search-btn">
                        <i className="fa fa-search"></i>
                        <input type="submit" value="Search"></input>                            
                    </section>
                </form>
            </section>
        </section>            
        </>
    )
}

export default Header;