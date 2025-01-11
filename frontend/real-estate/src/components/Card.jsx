import React, { useState } from "react";
import "../styles/Card.css"
import house from "./images/house1.jpg"
import profilepic from "./images/sillouhette.jpg"
import imgDesc from "./images/description.png"
import imgLoca from "./images/location.png"
import imgExtra from "./images/extra.png"
import imgBed from "./images/bed.png"
import imgBath from "./images/bath.png"
import imgToilet from "./images/toilet.png"



const Card = (props) => {     
    const initialImage = props.img_urls && props.img_urls.length > 0 ? props.img_urls[0] : '';     
    const [mainImage, setMainImage] = useState(initialImage);
    // updates the state of the main image when you click the images in carousel
    const handleImageClick = (img_url) => {
        setMainImage(img_url);
    };

    return (     
        <section className="card--content">                
            <section>
                <section id="card--action--amount">
                    <p className="card--action">{props.action}</p>
                    <p className="card--amount"> NGN {props.amount.toLocaleString()} </p>                            
                </section>

                {/* Main image container */}
                <section className="card--image">
                    {mainImage ? (
                        <img src={mainImage} className="houseimages" alt={props.description} />
                    ) : (
                        <p>No Image Available</p> // Fallback message if no image is available
                    )}
                </section>
                {/* Carousel of images */}
                <section className="carousel">
                    {props.img_urls && props.img_urls.map((img_url, index) => (
                            <section key={index} className="carousel-image">
                                {/* On click, update the main image */}
                                <img
                                    src={img_url}
                                    alt={`Property Image ${index + 1}`}
                                    onClick={() => handleImageClick(img_url)} // Click handler
                                    style={{ cursor: 'pointer', width: '50px', marginRight: '10px' }} // Make images clickable
                                />
                            </section>
                        ))}
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