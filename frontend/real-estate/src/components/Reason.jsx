import React from "react"
import "../styles/rsn_testi.css"
import experience from "./images/experience.png"
import houseIcon from "./images/house-icon.png"
import money from "./images/money.png"


export default function Reason() {
    return (
        <section id="a-container">
            <section className="rsn--container--1">
                <img src={experience} className="rsn--container--icon" />
                <h3>We have the experience.</h3>
                <article>                
                    With over 5 years in the business we 
                    have successfully helped hundreds 
                    fulfill their needs whether it relates 
                    to purchase or rentage of a property..
                </article>
            </section>
            
            <section className="rsn--container--2">
                <img src={houseIcon} className="rsn--container--icon" />                
                <h3>Multiple properties in different regions.</h3>
                <article>                
                    We have access to mutiple properties located
                    in different regions of the country. 
                    All properties have undergone all necessary 
                    checks in order to provide excellent service 
                    to our clients...
                </article>
            </section>
            
            <section className="rsn--container--3">
                <img src={money} className="rsn--container--icon" />
                <h3>We offer so much at affordable prices.</h3>
                <article>                    
                    We provide oustanding services at market 
                    friendly prices. We also provide 
                    housing needs for all income types....
                </article>
            </section>
            
            
        </section>
    )
}