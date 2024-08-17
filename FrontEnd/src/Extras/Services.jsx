import React from 'react';
import HomeDuplicate from '../HomeDuplicate';
import './Services.css';
import Home from '../Home';

const Services = () => {
  return (
    <div className='extrasbg'>
    <HomeDuplicate/>
    <div className="services-container">
      <h1>Our Services</h1>
      <p>
        We offer a variety of services to ensure a smooth and enjoyable experience for our users. Our key services include:
      </p>
      <ul>
        <li>Secure Transactions: All transactions on our platform are protected to ensure your safety and privacy.</li>
        <li>User-Friendly Interface: Our platform is designed to be easy to navigate, making it simple for you to list, search, and buy products.</li>
        <li>24/7 Customer Support: Our support team is available around the clock to assist you with any issues or questions.</li>
        <li>Wide Range of Products: From electronics to furniture, you can find a diverse range of products on our platform.</li>
        <li>Local Focus: We prioritize local transactions to promote community engagement and reduce environmental impact.</li>
      </ul>
      <p>
        We are committed to continuously improving our services based on user feedback and technological advancements. Your satisfaction is our top priority.
      </p>
    </div>
    </div>
  );
};

export default Services;
