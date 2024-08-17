import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EditProduct.css';
import HomeDuplicate from './HomeDuplicate';

const EditProduct = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { product } = location.state;

    const [formData, setFormData] = useState({
        appurl: product.appurl,
        appname: product.appname,
        appicon: product.appicon,
        price: product.price,
        district: product.district,
        state: product.state,
        pincode: product.pincode,
        owner: product.owner,
        contact: product.contact,
        address: product.address,
    });

    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        
        // Append text fields
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        // Append file if selected
        if (file) {
            formDataToSend.append('image', file);
        }

        try {
            const response = await fetch(`http://localhost:8080/updatemyproduct/${product.id}`, {
                method: 'PUT',
                body: formDataToSend,
            });

            if (response.ok) {
                // Update localStorage
                const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                const updatedFavorites = favorites.map(fav =>
                    fav.id === product.id ? { ...fav, ...formData, appicon: formData.appicon || fav.appicon } : fav
                );
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

                navigate('/myproducts');
            } else {
                console.error('Failed to update the product');
            }
        } catch (error) {
            console.error('Error updating the product:', error);
        }
    };

    return (
        <div>
            <HomeDuplicate />
            <div className="edit-product-container">
                <h1>Edit Product</h1>
                <form onSubmit={handleSubmit} className="edit-product-form">
                    <label>
                        Product URL:
                        <input type="text" name="appurl" value={formData.appurl} onChange={handleChange} />
                    </label>
                    <label>
                        Product Image:
                        <input type="file" name="image" onChange={handleFileChange} />
                    </label>
                    <label>
                        Price:
                        <input type="text" name="price" value={formData.price} onChange={handleChange} />
                    </label>
                    <label>
                        Description:
                        <textarea name="appname" value={formData.appname} onChange={handleChange} />
                    </label>
                    <label>
                        District:
                        <input type="text" name="district" value={formData.district} onChange={handleChange} />
                    </label>
                    <label>
                        State:
                        <input type="text" name="state" value={formData.state} onChange={handleChange} />
                    </label>
                    <label>
                        Pincode:
                        <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} />
                    </label>
                    <label>
                        Owner:
                        <input type="text" name="owner" value={formData.owner} onChange={handleChange} />
                    </label>
                    <label>
                        Contact:
                        <input type="text" name="contact" value={formData.contact} onChange={handleChange} />
                    </label>
                    <label>
                        Address:
                        <textarea name="address" value={formData.address} onChange={handleChange} />
                    </label>
                    <button type="submit">Confirm</button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
