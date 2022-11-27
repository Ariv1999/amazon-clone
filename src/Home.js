import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt="bgimage"
        />

        <div className="home__row">
          <Product
            id="1"
            title="2022 Apple MacBook Pro Laptop 13-inch Retina Display, 8GB RAM, 256GB ​​​​​​​SSD ​​​​​, Backlit Keyboard, FaceTime HD Camera"
            price={250000}
            image="https://m.media-amazon.com/images/I/71cZWwc6ZOL._AC_SX679_.jpg"
            rating={5}
          />
          <Product
            id="2" 
          title="BlissLights Sky Lite 2.0 - RGB LED Laser Star Projector, Galaxy Lighting, Nebula Lamp (Blue Stars, Smart App)"
          price={12000}
          image="https://publish.purewow.net/wp-content/uploads/sites/2/2021/12/best-gifts-for-kids-2021-projector.jpg?fit=728%2C524"
          rating={4}
          />
        </div>
        <div className="home__row">
        <Product
          id="3" 
          title="Meta Quest 2-Advanced All-In-One Virtual Reality Headset-128 GB"
          price={19000}
          image="https://m.media-amazon.com/images/I/618PlE1DM8L._SX466_.jpg"
          rating={5}
          />
          <Product
            id="4" 
          title="Mini Smart Watch for Men Alexa Built-in, Fitness Tracker with GPS &Sports Modes"
          price={9050}
          image="https://m.media-amazon.com/images/I/61dHtJrlcOL._AC_SX679_.jpg"
          rating={3}
          />
          <Product
            id="5" 
          title="Keepsmile 100ft Led Strip Lights Music Sync Color Changing RGB LED"
          price={3500}
          image="https://m.media-amazon.com/images/I/71aJm0A4kBL._AC_SX679_.jpg"
          rating={5}
          />
        </div>
        <div className="home__row">
        <Product
          id="6" 
          title="Z-Edge U24C 24-inch Curved Gaming Monitor, Full HD 1080P 1920x1080 LED Backlight Monitor, with 75Hz Refresh Rate and Eye-Care Technology"
          price={153000}
          image="https://m.media-amazon.com/images/I/81dqkYh5JSL._AC_SX569_.jpg"
          rating={5}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
