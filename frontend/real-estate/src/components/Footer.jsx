import React from "react"
import "../styles/footer.css"
import facebook from "./images/facebook.png"
import twitter from "./images/twitter.png"
import instagram from "./images/instagram.png"
import subButton from "./images/sub-button.png"

export default function Footer() {
    return (
        <section className="aa--container foota--container">
            <section className="first--section">
                <section id="about">
                    <p>About</p>
                    <article id="about--article">
                        We are reinventing how you buy, sell and rent properties in Nigeria.
                    </article>
                </section>
                
                <section id="quick--links">
                    <p>Quick Links</p>
                    <ul id="quick--links--link">
                        <li><a href="" id="quick--links--links">About Us</a></li>
                        <li><a href ="" id="quick--links--links">FAQ</a></li>
                        <li><a href ="" id="quick--links--links">Terms and Conditions</a></li>
                    </ul>
                    
                </section>
                    
                <section id="contact">
                    <p>Contact Us</p>
                    <section id="contact--container">
                        <section id="email">
                            <p>info@larryrealestate.com</p>
                        </section>
                        <section id="address">
                            <p>20 xyz street, off xyz, Uyo, Aks</p>
                        </section>
                        <section id="contact-number">
                            <p>+234 xxx xxx xxxx</p>
                            <p>+234 xxx xxx xxxx</p>
                        </section>
                    </section>
                </section>
                    
                <section id="social--media">
                    <p>Follow Us on Social Media</p>

                    <section id="social--media--container">
                        <section id="social--media--icons">
                            <img src={facebook} />
                            <img src={instagram} />
                            <img src={twitter} />
                        </section>
                        <section id="newsletter">
                            <p>Subscribe to our newsletter</p>
                            <section id="email--section">                                
                                {/* <label> */}
                                <input type="email" placeholder="Email Address"></input>
                                {/* <img src={subButton} id="sub--button"/> */}
                                {/* </label> */}
                            </section>                        
                        </section>
                    </section>
                </section>
            </section>
            
            <section className="second--section">
                <section id="footer--link--container">
                    <ul id="footer--nav">
                        <li><a href="" id="footer--navlink">Home</a></li>
                        <li><a href="" id="footer--navlink">About Us</a></li>
                        <li><a href="" id="footer--navlink">Contact</a></li>
                        <li><a href="" id="footer--navlink">Property</a></li>                        
                    </ul>
                    <p>&copy; 2022 GEEKCODE Designed by Araoye.py</p>
                </section>
                
            </section>

            <section className="last--section">
                
            </section>
            

        </section>        
    )
}