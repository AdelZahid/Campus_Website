import React from 'react'
import './Hero.css'
import dark_arrow from '../../assets/dark-arrow.png'

const Hero = () => {
  return (
      <div className='hero container'>
        <div className='hero-text'>
            <h1>Lorem ipsum dolor sit amet consectetur adipisicing.</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis adipisci consectetur tenetur! Odio placeat dignissimos minima dolorem aliquid quos iure.</p>
            <button className='btn'>Learn More <img src={dark_arrow} /></button>
        </div>
      </div>
  )
}

export default Hero

