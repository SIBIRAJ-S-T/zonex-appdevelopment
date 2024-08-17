import React from 'react';
import HomeDuplicate from '../HomeDuplicate';
import './Contact.css';

const Contact = () => {
  return (
    <div className='extrasbg'>
    <HomeDuplicate/>
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>
        We value your feedback and are here to assist you with any questions or concerns. Please fill out the form below to get in touch with us.
      </p>
      <form>
        <label>Name</label>
        <input type="text" placeholder="Your Name" required />
        <label>Email</label>
        <input type="email" placeholder="Your Email" required />
        <label>Message</label>
        <textarea placeholder="Your Message" required></textarea>
        <button type="submit">Send</button>
      </form>
      <p>
        Alternatively, you can reach us at:
      </p>
      <p>
        <strong>Email:</strong> support@onlineexchange.com
      </p>
      <p>
        <strong>Phone:</strong> +123 456 7890
      </p>
      <p>
        <strong>Address:</strong> 123 Online Exchange St., E-commerce City, Webland
      </p>
    </div>
    </div>
  );
};

export default Contact;
