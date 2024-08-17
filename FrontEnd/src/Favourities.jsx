import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Favourities.css';
import HomeDuplicate from './HomeDuplicate';

const Favourites = () => {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchAndUpdateFavorites = async () => {
            try {
                // Fetch all products from the backend
                const response = await fetch('http://localhost:8080/api/yourapp');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const allProducts = await response.json();

                // Get stored favorites
                const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

                // Update favorites with latest details from the backend
                const updatedFavorites = storedFavorites.map(fav => {
                    const updatedProduct = allProducts.find(product => product.id === fav.id);
                    return updatedProduct ? { ...fav, ...updatedProduct } : null;
                }).filter(fav => fav !== null);

                // Update localStorage with the updated favorites
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

                // Update state to display the updated favorites
                setFavorites(updatedFavorites);
            } catch (error) {
                console.error('Error fetching or updating favorites:', error);
            }
        };

        fetchAndUpdateFavorites();
    }, []);

    const handleClick = (favorite) => {
        navigate('/app-details', { state: { ...favorite } });
    };

    return (
        <div className='maincontainerbuyfavor'>
            <HomeDuplicate />
            <div className='maincontainerfav'>
                <h1 align='center' className='headingss'>Favorites</h1>
                <div className="containerfav">
                    {favorites.map((fav, index) => (
                        <div key={index}>
                            <div className='boxfav' onClick={() => handleClick(fav)}>
                                <img src={`http://localhost:8080/yourapp/${fav.id}/appicon`} alt={`App Icon ${index}`} className='homegamesimagefav'/>
                            </div>
                            <div className='nameproratepro'>
                                <p className='namepro'>{fav.appurl}</p>
                                <p className='ratepro'>₹{fav.price}</p>
                            </div>
                            <br/>
                            <br/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Favourites;
