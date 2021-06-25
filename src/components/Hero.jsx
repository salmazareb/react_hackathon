import React from 'react'
import "./hero.css"

function Hero({setShowMap}) {
    return (
        <div className="hero">
            <video src="/videos/hero_vid3.mp4" autoPlay loop muted/>
            <h1 className="welcome">Welcome to Geeks map</h1>
            <button className="map_button" onClick={()=> setShowMap(true)}>Go to the Map!</button>
        </div>
    )
}

export default Hero
