import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loading.css'; // Import the CSS file for styling
import HomeDuplicate from './HomeDuplicate';

const Loading = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 2000); // 3 seconds loading time

        return () => clearTimeout(timer); // Cleanup timer
    }, [navigate]);

    return (
        <div>
        <HomeDuplicate/>
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        </div>
    );
};

export default Loading;
