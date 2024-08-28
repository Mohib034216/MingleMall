import React from 'react';
import './Hero.css';
import Image from "../../assets/hero-img1.png";
// import products from "../../assets/hero";

function Hero() {
  return (
    <div className='hero'>
      <div style={{backgroundImage: "url(" + Image + ")"}} className="hero-content">

          <div  className="hero-left">
            {/* <img src={Image} alt="" /> */}
          <div className="hero-text">
              <h1>I am John Doe</h1>
              <p>And I'm a Photographer</p>
              <button>Hire me</button>
          </div>

          </div>
          <div className="hero-right">    
              <img src="" alt="" />
          </div>
      </div>
     
    </div>
  )
}


export default Hero
