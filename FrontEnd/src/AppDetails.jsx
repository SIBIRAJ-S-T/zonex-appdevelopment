import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HomeDuplicate from './HomeDuplicate';
import './AppDetails.css';

const AppDetails = () => {
    const location = useLocation();
    const { id, appurl, appname, appicon, price, district, state, pincode, owner, contact, address, username, registrationDate, registrationTime } = location.state;
    const [isFavorite, setIsFavorite] = useState(false);
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`http://localhost:8080/yourapp/${id}/appicon`);
                const imageBlob = await response.blob();
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setImageSrc(imageObjectURL);
            } catch (error) {
                console.error('Error fetching the image:', error);
            }
        };

        fetchImage();

        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isFav = favorites.some(fav => fav.id === id);
        setIsFavorite(isFav);
    }, [id]);

    const handleFavoriteToggle = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (isFavorite) {
            const newFavorites = favorites.filter(fav => fav.id !== id);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
        } else {
            const newFavorite = { id, appurl, appname, appicon, price, district, state, pincode, owner, contact, address, username, registrationDate, registrationTime };
            favorites.push(newFavorite);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <div>
            <HomeDuplicate />
            <div className="app-details">
                <div className='appdetailsflexx'>
                    <h1>Product Details</h1>
                    <button className={`fav-button ${isFavorite ? 'fav-on' : 'fav-off'}`} onClick={handleFavoriteToggle}>
                        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                </div>
                <br />
                <div className="detail-block">
                    {imageSrc ? (
                        <img src={imageSrc} alt="Product Icon" className="product-icon" />
                    ) : (
                        <p>Loading image...</p>
                    )}
                    <p className='named'>{appurl}</p>
                    <p className='named'><strong>Price:</strong> ₹{price}</p>
                </div>
                <div className="info-grid">
                    <div className="detail-block">
                        <h2>Contact Information</h2>
                        <p><strong>Ownership:</strong> {owner}</p>
                        <p><strong>Contact No:</strong> {contact}</p>
                    </div>
                    <div className="detail-block">
                        <p><strong>Posted on:</strong><br /><br /> {registrationDate}, {registrationTime}</p>
                    </div>
                    <div className="detail-block">
                        <h2>Location</h2>
                        <p><strong>District:</strong> {district}</p>
                        <p><strong>State:</strong> {state}</p>
                        <p><strong>Pincode:</strong> {pincode}</p>
                    </div>
                    <div className="detail-block">
                        <h2>Seller Information</h2>
                        <p><strong>Seller:</strong> {username}</p>
                    </div>
                    <div className="detail-block full-width">
                        <h2>Address</h2>
                        <pre>{address}</pre>
                    </div>
                    <div className="detail-block full-width">
                        <h2>Product Description</h2>
                        <p className='details-p'>{appname}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppDetails;
