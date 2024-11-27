import React from 'react';
import './About.css'; // Assuming you are using an external stylesheet

const About = ({ isDarkMode }) => {
  return (
    <div className={`about-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1 className="about-heading">About ResQ</h1>
      <p className="about-description">
        ResQ is a comprehensive safety alert application designed to provide users with instant assistance during emergencies. With ResQ, users can quickly send distress signals along with their real-time location to trusted contacts and emergency services. This ensures that help is always just a tap away, whether you're at home, on the road, or in unfamiliar surroundings.
      </p>
      <p className="about-description">
        The app is built with user safety and ease of use in mind, offering features such as quick access to emergency contacts, silent alerts, and a streamlined interface. Whether you're in a vulnerable situation or simply want to stay prepared, ResQ is here to give you peace of mind and ensure you're never alone in an emergency.
      </p>
    </div>
  );
};

export default About;
