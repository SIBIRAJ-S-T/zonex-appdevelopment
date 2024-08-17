import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Phone.css';

const Phone = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const username = localStorage.getItem('username'); // Retrieve username from localStorage

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend
      const response = await axios.post('http://localhost:8080/api/phone', {
        phoneNumber,
        username // Include the username in the request
      });
      navigate("/auction")
      // Handle success
      setResponseMessage('Phone number submitted successfully!');
      console.log('Response:', response.data);
    } catch (error) {
      // Handle error
      setResponseMessage('Failed to submit phone number.');
      console.error('Error:', error);
    }
  };

  return (
    <div className='mainphone'>
    <div className="phone-container">
  <h1>Phone Number</h1>
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="phoneNumber">Phone Number:</label>
      <input
        type="text"
        id="phoneNumber"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter your phone number"
        required
      />
    </div>
    <button className="submit-button" type="submit">Submit</button>
  </form>
  {responseMessage && <p className="response-message">{responseMessage}</p>}
</div>
</div>

  );
};

export default Phone;
