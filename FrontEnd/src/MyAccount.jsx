import React, { useState, useRef, useEffect } from 'react';
import './MyAccount.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ProfileSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null); // State to store user data
  const sidebarRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
        // navigate(`/home/${userData.username}`);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to fetch user data from the backend
  const fetchUserData = async () => {
    try {
      const username = localStorage.getItem('username'); // Get username from local storage
      const res = await axios.get(`http://localhost:8080/getuser/${username}`);
      setUserData(res.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (sidebarOpen) {
      fetchUserData(); // Fetch user data when the sidebar is opened
    }
  }, [sidebarOpen]);


  const goToProfile = () => {
    setSidebarOpen(!sidebarOpen)
    // navigate(`/home/${userData.username}/profile`);
};

  return (
    <div className='mya'>
      <a onClick={goToProfile}>Profile</a>
      <div id="sidebar" className={sidebarOpen ? 'open' : ''} ref={sidebarRef}>
        <div className="profile">
          <div className="profile-picture"></div>
          <div className="profile-info">
            {userData ? (
              <div>
                <h2>{userData.username}</h2>
                <p>{userData.email}</p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSidebar;
