import React from 'react'
import './About.css'
import about_img from '../../assets/about.png'
import play_icon from '../../assets/play-icon.png'

const About = () => {
  return (
    <div>
      <div className="about">
        <div className="about-left">
          <img src={about_img} alt="" className="about-img" />
          <img src={play_icon} alt="" className="play-icon" />
        </div>
        <div className="about-right">
          <h3>About Campus</h3>
          <h2>Lorem ipsum dolor sit amet.</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            ipsa, omnis et sequi maiores tenetur perferendis! Quo excepturi
            deserunt, iure repudiandae quod nisi asperiores aspernatur quidem
            exercitationem, nesciunt itaque quae magni aperiam. Saepe, dolore
            quidem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            ipsa, omnis et sequi maiores tenetur perferendis! Quo excepturi
            deserunt, iure repudiandae quod nisi asperiores aspernatur quidem
            exercitationem, nesciunt itaque quae magni aperiam. Saepe, dolore
            quidem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            ipsa, omnis et sequi maiores tenetur perferendis! Quo excepturi
            deserunt, iure repudiandae quod nisi asperiores aspernatur quidem
            exercitationem, nesciunt itaque quae magni aperiam. Saepe, dolore
            quidem.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About
