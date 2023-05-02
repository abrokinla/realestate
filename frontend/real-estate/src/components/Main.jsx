import React, { useEffect, useState } from "react";
import AuthNavBar from "./AuthNavBar";
import Header from "./Header"
import CardList from "./CardList"
import Search from "./Search"
import Reason from "./Reason"
import Testimonial from "./Testimonial"
import Footer from "./Footer"
import { checkToken } from "../components/forms/LoginForm";


const Main = () => {
    const isLoggedIn = checkToken();

    return (
        <div>
            <main>
                <AuthNavBar loggedIn={isLoggedIn}/>
                <Header />
                <div id="subtitle">
                    <p> Featured Properties </p>                    
                </div> 
                <div id="card-container">
                    <CardList 
                   rating={1}/>
                   
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

export default Main;