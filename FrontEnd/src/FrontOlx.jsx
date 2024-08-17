import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './FrontPage.css';
import PreventInspect from './PreventInspect';

const FrontOlx = () => {

  const navigate = useNavigate();

  const GoLogin = () => {
    navigate('/Login')
  }

  const GoSignup = () => {
    navigate('/Signup')
  }

  const goHome = () => {
    navigate("/")
  }

  const goAbout2 = () => {
    navigate("/about2");
};
const goServices2 = () => {
    navigate("/services2");
};
const goTerms2 = () => {
    navigate("/terms2");
};
const goMyContact2 = () => {
    navigate("/contact2");
};


  return (
    <div className='fpmaincontainer1'>
      <header className='fphead'>
        <h1>Mini OLX</h1>
      </header>
      <nav className='fpnav'>
        <div className="fpnav1">
          <a onClick={goHome}>Home</a>
          <a onClick={goAbout2}>About</a>
          <a onClick={goServices2}>Services</a>
          <a onClick={goTerms2}>Terms and conditions</a>
          <a onClick={goMyContact2}>Contact</a>
        </div>
        <div className="fpnav2">
          <a onClick={GoLogin}>Login</a>
          <a onClick={GoSignup}>SignUp</a>
        </div>
      </nav>
      {/*To prevent user to right click or use ctrl+shift+I or etc*/}
      <section>
          <h3></h3>
      </section>
    </div>
  );
}

export default FrontOlx;
