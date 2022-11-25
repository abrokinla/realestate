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



const FeaturedProps = (props) => {     
        return (     
            <div className="card--content">
                {props.properties && props.properties.map(featuredProps =>{
                    return (
                        <>
                            <div className="card--image">
                                <img src={featuredProps.img_url} className="houseimages" alt="image of house for sale/rent" />
                            </div>
                            <p className="card--action">{action}</p>
                            <p className="card--amount"> NGN {featuredProps.amount}/yr </p>                            
                            
                            <div className="card--status">
                                <p className="status">{featuredProps.status}</p>                           
                                <p className="status--details"> posted on 12/02/2022 by User </p>
                                <img src={profilepic} className="profile--pic" />
                            </div>
                            <div className="card--house--details">
                                <section className="location">
                                    <img src={imgLoca} className="icon" />                        
                                    <p> {featuredProps.location} </p>                                                
                                </section>

                                <section className="description">
                                    <img src={imgDesc} className="icon"/>
                                    <p> {featuredProps.description} </p>
                                </section>

                                <section className="extra">
                                    <img src={imgExtra} className="icon" />
                                    <p> Steady power supply, supermarket, good road network, proximity to airport </p>                
                                </section>
                            </div>
                            <div className="facilities"> 
                                <section className="bed">
                                    <img src={imgBed} className="facilities-icon"/> 
                                    <p>{featuredProps.bed}</p>
                                </section>

                                <section className="bath"> 
                                    <img src={imgBath} className="facilities-icon"/> 
                                    <p>{featuredProps.bath}</p>
                                </section>

                                <section className="toilet">
                                    <img src={imgToilet} className="facilities-icon"/> 
                                    <p>{featuredProps.toilet}</p> 
                                </section>                   
                                
                            </div> 
                        </>
                    )
                })}
            </div> 
        )}
        
                    

export default Card;