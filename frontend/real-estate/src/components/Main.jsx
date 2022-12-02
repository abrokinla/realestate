import React, { useEffect, useState } from "react";
import NavBar from "./NavBar"
import Header from "./Header.jsx"
import CardList from "./CardList.jsx"
import Search from "./Search"
import Reason from "./Reason"
import Testimonial from "./Testimonial"
import Footer from "./Footer"


function Main() {

    
    const [properties, setProperties] = useState([]);

    useEffect(()=>{
        fetch('http://127.0.0.1:5000/', {
            'methods': 'GET',
            headers : {
                'Content-Type':'application/json'   
            }
        })
        .then(response => response.json())
        .then(response => setProperties(response.properties))
        .catch(error => console.log(error))
    },[])



    return (
        <div>
            <main>
                <NavBar />
                <Header />
                <div id="subtitle">
                    <p> Featured Properties </p>                    
                </div> 
                <div id="card-container">
                    <CardList 
                    rating={1}/>
                    {/* {properties.map(data => 
                    <Card 
                    key = {data.id} {...data}/>)}                        */}
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