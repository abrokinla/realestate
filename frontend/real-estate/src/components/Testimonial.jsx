import React from "react";
import "../styles/rsn_testi.css";
import HeadShot from "./images/sillouhette.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Testimonial() {
  const testimonials = [
    {
      name: "John Ackerty",
      picture: HeadShot,
      content: "I found, paid and moved into my house in one week. Hassle free and excellent service.",
    },
    {
      name: "Mary Smith",
      picture: HeadShot,
      content: "I had a great experience working with Real Estate Inc. They made the process so easy and stress-free!",
    },
    {
      name: "Tom Jones",
      picture: HeadShot,
      content: "The agents at Real Estate Inc. were knowledgeable and friendly. They helped me find the perfect home for my family!",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="testi--container">
      <h3 className="testi-subtitle">Testimonials</h3>
      <p>Hear from some of our clients</p>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index}>
            <section className="image--placeholder">
              <img src={testimonial.picture} className="customer--headshot" />
            </section>
            <article className="testi-article">{testimonial.content}</article>
            <p className="client--name">{testimonial.name}</p>
          </div>
        ))}
      </Slider>
    </section>
  );
}

// import React from "react"
// import "../styles/rsn_testi.css"
// import HeadShot from "./images/sillouhette.jpg"

// export default function Testimonial() {
//     return (
//         <section className="testi--container">
//             <h3 className="testi-subtitle">Testimonials</h3>
//             <p>Hear from some of our clients</p>
//             <section className="image--placeholder">
//                 <img src={HeadShot} className="customer--headshot" />
//             </section>
//             <article className="testi-article">
//                 I found, paid and moved into my house  
//                 in one week. Hassle free and excellent service.
//             </article>
//             <p className="client--name">John Ackerty</p>
            
//         </section>
        
//     )

// }
