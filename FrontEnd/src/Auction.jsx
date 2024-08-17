import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auction.css';

const Auction = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/auctions');
      const productsWithStatus = response.data.map(product => {
        const endTime = new Date(`${product.auctionDate}T${product.endTime}`);
        const now = new Date();
        const auctionEnded = now > endTime;
        return { ...product, auctionEnded };
      });
      setProducts(productsWithStatus);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  const handleSellClick = () => {
    navigate('/auction-sell');
  };

  const handleImageClick = (productId) => {
    navigate(`/auction-details/${productId}`);
  };

  return (
    <div className="auction-container">
      <div className='subauccon'>AUCTION</div>
      <h1>Products in Auction</h1>
      <button className="auction-button" onClick={handleSellClick}>Sell</button>
      <div className="auction-products">
        {products.map(product => (
          <div className="auction-product" key={product.id} onClick={() => handleImageClick(product.id)}>
            <img
              src={`http://localhost:8080/api/auctions/${product.id}/image`}
              alt={product.name}
              className="auction-product-image"
            />
            <p>{product.name}</p>
            <p>{product.auctionDate} {product.startTime}</p>
            <p>Base Price: {product.basePrice}</p>
            {product.auctionEnded && (
              <p className="auction-ended-status">Auction Ended</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Auction;
