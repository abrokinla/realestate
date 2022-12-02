import React from "react"
import "../Card.css"
import house from "./images/house1.jpg"
import profilepic from "./images/sillouhette.jpg"
import imgDesc from "./images/description.png"
import imgLoca from "./images/location.png"
import imgExtra from "./images/extra.png"
import imgBed from "./images/bed.png"
import imgBath from "./images/bath.png"
import imgToilet from "./images/toilet.png"



const Card = (props) => {     
    return (     
        <section className="card--content">                
            <section>
                <section id="card--action--amount">
                    <p className="card--action">{props.action}</p>
                    <p className="card--amount"> NGN {props.amount}/yr </p>                            
                </section>

                <section className="card--image">
                    <img src={props.img_url} className="houseimages" alt="image of house for sale/rent" />
                </section>
                <section className="card--status">
                    <p className="status">{props.status}</p>                           
                    <p className="status--details"> posted on 12/02/2022 by User </p>
                    <img src={profilepic} className="profile--pic" />
                </section>
                <section className="card--house--details">
                    <section className="location">
                        <img src={imgLoca} className="icon" />                        
                        <p> {props.location} </p>                                                
                    </section>

                    <section className="description">
                        <img src={imgDesc} className="icon"/>
                        <p> {props.description} </p>
                    </section>

                    <section className="extra">
                        <img src={imgExtra} className="icon" />
                        <p> Steady power supply, supermarket, good road network, proximity to airport </p>                
                    </section>
                </section>
                <section className="facilities"> 
                    <section className="bed">
                        <img src={imgBed} className="facilities-icon"/> 
                        <p>{props.bed}</p>
                    </section>

                    <section className="bath"> 
                        <img src={imgBath} className="facilities-icon"/> 
                        <p>{props.bath}</p>
                    </section>

                    <section className="toilet">
                        <img src={imgToilet} className="facilities-icon"/> 
                        <p>{props.toilet}</p> 
                    </section>                   
                    
                </section> 
            </section>
                
        </section> 
    )}
        
        

export default Card;