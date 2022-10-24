import React from "react"
import Header from "./Header.jsx"
import Card from "./Card.jsx"
import Search from "./Search"
import Reason from "./Reason"
import Testimonial from "./Testimonial"
import Footer from "./Footer"



export default function Main() {
    return (
        <div>
            <main>
                <Header />
                <div id="subtitle">
                    <p> Featured Properties </p>                    
                </div> 
                <div id="card-container">
                    <Card />    
                    <Card />    
                    <Card />    
                </div>
                <div  id="subtitle">
                    <p> Found What You Need? </p>                    
                </div> 
                <div>
                    <Search />
                </div>
                <div  id="subtitle">
                    <p> Why Should You Choose Us? </p>                    
                </div> 
                <div id="rsn-container">
                    <Reason />
                </div>
                <div id="testimonial">
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