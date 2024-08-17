import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './YourAppbuy.css';
import HomeDuplicate from './HomeDuplicate';

const MyProducts = () => {
    const navigate = useNavigate();
    const [myProducts, setMyProducts] = useState([]);
    const [imageSrcs, setImageSrcs] = useState({});
    const username = localStorage.getItem('username');

    useEffect(() => {
        fetchMyProducts();
    }, []);

    const fetchMyProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/yourapp');
            const data = await response.json();
            const filteredProducts = data.filter(product => product.username === username);
            setMyProducts(filteredProducts);
            console.log(filteredProducts);

            // Fetch images for the filtered products
            filteredProducts.forEach(product => fetchImage(product));
        } catch (error) {
            console.error('Error fetching my products:', error);
        }
    };

    const fetchImage = async (product) => {
        try {
            const response = await fetch(`http://localhost:8080/yourapp/${product.id}/appicon`); // Adjust the endpoint as needed
            const imageBlob = await response.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);

            // Update the imageSrcs state with the new image URL
            setImageSrcs(prevImageSrcs => ({
                ...prevImageSrcs,
                [product.id]: imageObjectURL
            }));
        } catch (error) {
            console.error('Error fetching the image:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/deletemyproduct/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setMyProducts(myProducts.filter(product => product.id !== id));
                
                // Update the localStorage
                const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                const updatedFavorites = favorites.filter(fav => fav.id !== id);
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            } else {
                console.error('Failed to delete the product');
            }
        } catch (error) {
            console.error('Error deleting the product:', error);
        }
    };

    const handleEdit = (product) => {
        navigate('/edit-product', { state: { product } });
    };

    const handleClick = (product) => {
        navigate('/app-details', { state: product });
    };

    return (
        <div className='maincontainerbuymyproducts'>
            <HomeDuplicate />
            <div className='maincontainerbuy1'>
                <h1 align='center' className='headingss'>My Products</h1>
                <div className="containerbuy">
                    {myProducts.map((product, index) => (
                        <div key={index}>
                            <div className='boxbuy' onClick={() => handleClick(product)}>
                                <img 
                                    src={imageSrcs[product.id] || product.appicon} 
                                    alt={`Product Icon ${index}`} 
                                    className='homegamesimagebuy' 
                                />
                            </div>
                            <div className='nameproratepro'>
                                <p className='namepro'>{product.appurl}</p>
                                <p className='ratepro'>₹{product.price}</p>
                            </div>
                            <div align='center'>
                                <button className='deletep' onClick={() => handleDelete(product.id)}>Delete</button>
                                <button className='editp' onClick={() => handleEdit(product)}>Edit</button>
                            </div>
                            <br />
                            <br />
                            <br />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyProducts;
