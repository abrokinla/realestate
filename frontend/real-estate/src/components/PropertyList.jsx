import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Header from "./Header.jsx";
import Card from "./Card.jsx";
import Footer from "./Footer";

function PropertyList() {
        
    const [properties, setProperties] = useState([]);
    
    useEffect(()=>{
        fetch('http://127.0.0.1:5000/properties', {
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
        <section>
            <NavBar />
            <Header />
            <section id="subtitle">
                <p>PROPERTIES</p>
            </section>
            <section id="card-container">
                {properties.map(data => 
                    <Card 
                    key = {data.id} {...data}/>
                    )} 
            </section>
            <Footer />

        </section>
    )
}
export default PropertyList;