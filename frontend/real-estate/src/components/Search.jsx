import React from "react"
import house from "./images/house1.jpg"


export default function Search() {
    return (
        <section className="search--area">
            <section className="card">                
                <img src={house} className="search-house" />                
                <section id="search--title">
                    <p>SHOP</p> 
                </section>               
            </section>

            <section className="card">            
                <img src={house} className="search-house" />
                <section id="search--title">
                    <p>APARTMENTS</p> 
                </section>     
            </section>

            <section className="card">            
                <img src={house} className="search-house" />            
                <section id="search--title">
                    <p>LAND</p> 
                </section>                             
            </section>
        </section>
    )
}