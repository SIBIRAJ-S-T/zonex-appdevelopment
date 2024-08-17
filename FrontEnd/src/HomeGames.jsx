import React from 'react';
import './HomeGames.css';
import Home from './Home';
import { useNavigate } from 'react-router-dom';

const HomeGames = () => {
    const navigate = useNavigate();
    const GoYourApp = () => {
        navigate('/yourapp');
    };

    const GoYourAppbuy = () => {
      navigate('/yourappbuy');
  }
  return (
    <div className='hgcontain'>
    <div className="containerins">
      <div className="box left-box" onClick={GoYourAppbuy}>
        Buy Products
      </div>
      <div className="box right-box" onClick={GoYourApp}>
        Sell Products
      </div>
      </div>
    </div>
  );
};

export default HomeGames;
