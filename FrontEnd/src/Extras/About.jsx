import React from 'react';
import HomeDuplicate from "../HomeDuplicate";
import './About.css';

const About = () => {
  return (
    <div className='extrasbg'>
      <HomeDuplicate/>
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to our online exchange platform where buyers and sellers connect to trade products efficiently and safely. Our mission is to provide a seamless and user-friendly experience for all our users.
      </p>
      <p>
        We believe in the power of community and the benefits of a sustainable, circular economy. Our platform is designed to empower individuals to buy and sell items locally, reducing waste and promoting reuse.
      </p>
      <p>
        Founded in [Year], we have continuously worked to improve our services, offering innovative features that make transactions smoother and more secure. Our dedicated team is always here to assist you with any questions or concerns.
      </p>
      <p>
        Thank you for choosing our platform. We look forward to serving you and making your buying and selling experience as pleasant as possible.
      </p>
    </div>
    </div>
  );
};

export default About;
