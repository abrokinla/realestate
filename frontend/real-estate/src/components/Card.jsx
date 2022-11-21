import React, { Component } from "react"
import "../Card.css"
import house from "./images/house1.jpg"
import profilepic from "./images/sillouhette.jpg"
import imgDesc from "./images/description.png"
import imgLoca from "./images/location.png"
import imgExtra from "./images/extra.png"
import imgBed from "./images/bed.png"
import imgBath from "./images/bath.png"
import imgToilet from "./images/toilet.png"


class Card extends Component {
    constructor() {
        super();
        this.state = {
            property:[],
        };
    }

    componentDidMount() {
        this.getFeaturedProperties();
    }

    getFeaturedProperties = () => {
        $.ajax({
            url: `/properties`,
            type: 'GET',

            success: (result) => {
                this.setState({
                    property: result.property,
                });
                return;
            },
            error: (error) => {
                alert('no featured properties, please try again');
                return;
            },
        });
    };
    render() {
        const { action, amount, status, location, description, bed, bath, toilet } = this.props;
        return (     
            <div className="card--content">
                
                <div className="card--image">
                    <img src={house} className="houseimages" alt="image of house for sale/rent" />
                </div>
                <p className="card--action">{action}</p>
                <p className="card--amount"> NGN {amount}/yr </p>                            
                
                <div className="card--status">
                    <p className="status">{status}</p>                           
                    <p className="status--details"> posted on 12/02/2022 by User </p>
                    <img src={profilepic} className="profile--pic" />
                </div>
                <div className="card--house--details">
                    <section className="location">
                        <img src={imgLoca} className="icon" />                        
                        <p> {location} </p>                                                
                    </section>

                    <section className="description">
                        <img src={imgDesc} className="icon"/>
                        <p> {description} </p>
                    </section>

                    <section className="extra">
                        <img src={imgExtra} className="icon" />
                        <p> Steady power supply, supermarket, good road network, proximity to airport </p>                
                    </section>
                </div>
                <div className="facilities"> 
                    <section className="bed">
                        <img src={imgBed} className="facilities-icon"/> 
                        <p>{bed}</p>
                    </section>

                    <section className="bath"> 
                        <img src={imgBath} className="facilities-icon"/> 
                        <p>{bath}</p>
                    </section>

                    <section className="toilet">
                        <img src={imgToilet} className="facilities-icon"/> 
                        <p>{toilet}</p> 
                    </section>                   
                    
                </div>

            </div> 
        )
    }
}
export default Card;