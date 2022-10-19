import React from "react"
import HeadShot from "./images/sillouhette.jpg"

export default function Testimonial() {
    return (
        <section className="testi--container">
            <h3 className="testi-subtitle">Testimonials</h3>
            <p>Hear from some of our clients</p>
            <section className="image--placeholder">
                <img src={HeadShot} className="customer--headshot" />
            </section>
            <article className="testi-article">
                I found, paid and moved into my house  
                in one week. Hassle free and excellent service.
            </article>
            <p className="client--name">John Ackerty</p>
            
        </section>
        
    )

}