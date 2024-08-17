import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeDuplicate from './HomeDuplicate';
import './YourAppbuy.css';
import axios from 'axios';

const YourAppBuy = () => {
    const navigate = useNavigate();
    const [yourApps, setYourApps] = useState([]);
    const [appIcons, setAppIcons] = useState({});

    useEffect(() => {
        fetchYourApps();
    }, []);

    const fetchYourApps = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/yourapp');
            const data = await response.json();
            setYourApps(data);

            // Fetch app icons
            data.forEach(async (app) => {
                if (!app.appicon.startsWith('http')) {
                    const icon = await fetchAppIcon(app.id);
                    setAppIcons((prev) => ({ ...prev, [app.id]: icon }));
                }
            });
        } catch (error) {
            console.error('Error fetching your apps:', error);
        }
    };

    const fetchAppIcon = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/yourapp/${id}/appicon`, {
                responseType: 'arraybuffer'
            });
            const base64Image = btoa(
                new Uint8Array(response.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ''
                )
            );
            return `data:image/jpeg;base64,${base64Image}`;
        } catch (error) {
            console.error('Error fetching app icon:', error);
            return '';
        }
    };

    const handleClick = (yourApp) => {
        navigate('/app-details', { state: yourApp });
    };

    return (
        <div className='maincontainerbuy'>
            <HomeDuplicate />
            <h1 align='center' className='headingss'>Products</h1>
            <div className="containerbuy">
                {yourApps.map((yourApp, index) => (
                    <div key={index}>
                        <div
                            className='boxbuy'
                            onClick={() => handleClick(yourApp)}
                        >
                            <img
                                src={yourApp.appicon.startsWith('http') ? yourApp.appicon : appIcons[yourApp.id]}
                                alt={`App Icon ${index}`}
                                className='homegamesimagebuy'
                            />
                        </div>
                        <div className='nameproratepro'>
                            <p className='namepro'>{yourApp.appurl}</p>
                            <p className='ratepro'>₹{yourApp.price}</p>
                        </div>
                        <br />
                        <br />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default YourAppBuy;
