import React from "react"
import house from "./images/house1.jpg"
import profilepic from "./images/sillouhette.jpg"
import description from "./images/description.png"
import location from "./images/location.png"
import extra from "./images/extra.png"
import bed from "./images/bed.png"
import bath from "./images/bath.png"
import toilet from "./images/toilet.png"


export default function Main() {
    return ( 
        <div classNme="card">
            <div className="card--content">
                <div className="card--image">
                    <img src={house} className="houseimages" alt="image of house for sale/rent" />
                </div>
                <p className="card--action">RENT</p>
                <p className="card--amount"> NGN 600,000/yr </p>                            
                
                <div className="card--status">
                    <p className="status">RENOVATED</p>                           
                    <p className="status--details"> posted on 12/02/2022 by User </p>
                    <img src={profilepic} className="profile--pic" />
                </div>
                <div className="card--house--details">
                    <section className="location">
                        <img src={location} className="icon" />                        
                        <p> 12 Ewet Housing Estate, Uyo, Akwa Ibom </p>                                                
                    </section>

                    <section className="description">
                        <img src={description} className="icon"/>
                        <p> 5 bedroom apartment ensuite in good condition </p>
                    </section>

                    <section className="extra">
                        <img src={location} className="icon" />
                        <p> Steady power supply, supermarket, good road network, proximity to airport </p>                
                    </section>
                </div>
                <div className="facilities"> 
                   <section className="bed">
                        <img src={bed} className="facilities-icon"/> 
                        <p>2</p>
                    </section>

                    <section className="bath"> 
                        <img src={bath} className="facilities-icon"/> 
                        <p>2</p>
                    </section>

                    <section className="toilet">
                        <img src={toilet} className="facilities-icon"/> 
                        <p>2</p> 
                    </section>                   
                    
                </div>

            </div>
        </div>

    )
}
