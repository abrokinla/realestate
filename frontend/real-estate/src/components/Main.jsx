import React from "react"
import image from "./images/bckgrnd.jpg"
import searchimage from "./images/search-icon.png"



export default function Main() {
    return (
        <div className="container">
            <main>
                <div className="main--background--image">
                    <p className="main--intro">Get Your Dream Home From a Relaible Agency</p>
                    <p className="main--sub--intro">Low Cost Housing Also Available</p>
                    <img src={image} className="background" />                    
                    <div className="main--search--box">
                        <h3>Filter</h3>
                        <label className="search--box">
                            <input className="search-text" type="textbox" placeholder="What are you looking for?"></input>
                            <input className="search-text" type="textbox" placeholder="Location"></input>
                            <input className="search-text" type="textbox" placeholder="Price"></input>
                            <div className="search-text searchBtn">
                                <img src={searchimage} className="search--icon" />
                                <p>SEARCH</p>
                            </div>
                        </label>
                    </div>
                </div>
                

            </main>
        </div>
    )
}