import React from "react"
import image from "./images/bckgrnd.jpg"
import searchimage from "./images/search-icon.png"
import Card from "./Card.jsx"
import Search from "./Search"
import Reason from "./Reason"
import Testimonial from "./Testimonial"
import Footer from "./Footer"



export default function Main() {
    return (
        <div>
            <main>
                <div className="main--background--image">
                    <p className="main--intro">Get Your Dream Home From a Relaible Agency</p>
                    <p className="main--sub--intro">Low Cost Housing Also Available</p>
                    <img src={image} className="background" />                    
                    <form name="filter--form" action="#" method="POST" className="main--search--box">
                        <h3>Filter</h3>
                        <label className="search--box">
                            <input className="search-text" type="text" placeholder="What are you looking for?"></input>
                            <input className="search-text" type="text" placeholder="Location"></input>
                            <input className="search-text" type="text" placeholder="Price"></input>
                            {/* <i className="fa fa-search icon-search" aria-hidden="true"></i> */}
                            <input type="submit" value="Search" className="search--icon"></input>                            
                        </label>                        
                    </form>
                    <div className="search--options">
                        <div className="rent--button">
                            <a href="" className="status--option">RENT</a>
                        </div>
                        <div className="buy--button">
                        <a href="" className="status--option">BUY</a>
                        </div>                        
                    </div>
                </div>
                <div  className="subtitle">
                    <p> Featured Properties </p>                    
                </div> 
                <div className="card--container">
                    <Card />    
                    <Card />    
                    <Card />    
                </div>
                <div  className="subtitle">
                    <p> Found What You Need? </p>                    
                </div> 
                <div>
                    <Search />
                </div>
                <div  className="subtitle">
                    <p> Why Should You Choose Us? </p>                    
                </div> 
                <div className="rsn--container">
                    <Reason />
                </div>
                <div className="testimonials">
                    <Testimonial />
                </div>
                <section className="become--agent">
                    <h2>Become a real estate agent</h2>
                    <p>Work with the best</p>
                    <button>Register Now</button>
                </section>
                <div className="foota--container">
                    <Footer />
                </div>
            </main>
        </div>
    )
}