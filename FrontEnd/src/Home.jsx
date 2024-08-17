import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Home.css';
import PreventInspect from './PreventInspect';
import axios from 'axios'; // Import axios
import MyAccount from './MyAccount';
import HomeGames from './HomeGames';


const Home = ({setAuthStatus}) => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    
///////////for tab close log out
    const [browserName, setBrowserName] = useState('');
    const [osName, setOSName] = useState('');
    const [deviceName, setDeviceName] = useState('');


    // Function to get browser, OS, and device information
    const getBrowserInfo = () => {
        const userAgent = navigator.userAgent;
        const os = ['Mac OS', 'Linux', 'Android','Windows', 'iOS'];

        const detectedOS = os.find((os) => userAgent.indexOf(os) > -1) || 'Unknown OS';
        setOSName(detectedOS);
        
        const isEdge = window.navigator.userAgent.indexOf("Edg") !== -1;
        const isFirefox = typeof InstallTrigger !== 'undefined';
        const isBrave = !!window.navigator.brave;
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        const isOpera = navigator.userAgent.indexOf('OPR/') > -1 || navigator.userAgent.indexOf('Opera') > -1;
        const isVivaldi = navigator.userAgent.indexOf("Vivaldi") !== -1;
        const isUCBrowser = navigator.userAgent.indexOf("UCBrowser") !== -1;
        const isYandexBrowser = navigator.userAgent.indexOf("YaBrowser") !== -1;
        const isMaxthon = navigator.userAgent.indexOf("Maxthon") !== -1;
        const isSamsungInternet = navigator.userAgent.indexOf("SamsungBrowser") !== -1;

        if(isEdge){
            setBrowserName("Edge");
        }
        else if(isFirefox){
            setBrowserName("Firefox");
        }
        else if(isBrave){
            setBrowserName("Brave");
        }
        else if(isSafari){
            setBrowserName("Safari");
        }
        else if(isOpera || isVivaldi || isUCBrowser || isYandexBrowser || isMaxthon || isSamsungInternet){
            setBrowserName("others");
        }
        else{
            setBrowserName("Chrome");
        }
    };

    const detectDeviceType = () => {
        const userAgent = navigator.userAgent;

        // Check if the user agent string contains keywords indicating the device type
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        setDeviceName('Mobile');
        } else if (/iPad/i.test(userAgent)) {
        setDeviceName('Tablet');
        } else {
        setDeviceName('Desktop/Laptop');
        }
    };

    useEffect(() => {
        getBrowserInfo();
        detectDeviceType();
    }, []); // Run once on component mount

    const saveLogoutHistory = async () => {
        const username = localStorage.getItem('username');
        const res = await axios.post('http://localhost:8080/logouthistory', { username, browserName, osName, deviceName });
        console.log(res);
    }



    const logoutUser = async () => {
        const username = localStorage.getItem('username');
        if (username) {
            try {
                await axios.delete(`http://localhost:8080/logout/${username}`);
                saveLogoutHistory();
                localStorage.removeItem('username');
                setAuthStatus(false);
                // Optionally, clear any other user-related data from localStorage
                localStorage.removeItem('authenticated');
                navigate('/loading');
            } catch (error) {
                console.error('Error logging out:', error);
            }
        }
    };



    // useEffect(() => {
    //     let timerId;
    //     const loginTime = localStorage.getItem('loginTime');
    //     if (loginTime) {
    //         const currentTime = new Date().getTime();
    //         const elapsedTime = currentTime - parseInt(loginTime, 10);
    //         const fiveMinutes = 0.2 * 60 * 1000; // 5 minutes in milliseconds

    //         // If elapsed time exceeds 5 minutes, logout and redirect to login page
    //         if (elapsedTime >= fiveMinutes) {
    //             logoutUser();
    //         } else {
    //             // Otherwise, set up a timer to trigger logout after remaining time
    //             const remainingTime = fiveMinutes - elapsedTime;
    //             timerId = setTimeout(logoutUser, remainingTime);
    //         }
    //     }

    //     // Cleanup function to clear the timer on component unmount
    //     return () => clearTimeout(timerId);

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [navigate, setAuthStatus]);


    useEffect(() => {
        let logoutTimer;

        const handleUserActivity = () => {
            clearTimeout(logoutTimer); // Clear the previous timer
            logoutTimer = setTimeout(logoutUser, 10 * 60 * 1000); // Reset the timer for 5 minutes
        };

        // Event listeners for user activity
        window.addEventListener('mousemove', handleUserActivity);
        window.addEventListener('keydown', handleUserActivity);

        // Start the logout timer initially
        logoutTimer = setTimeout(logoutUser, 10 * 60 * 1000);

        // Cleanup function to remove event listeners and clear the timer on component unmount
        return () => {
            clearTimeout(logoutTimer);
            window.removeEventListener('mousemove', handleUserActivity);
            window.removeEventListener('keydown', handleUserActivity);
        };
    }, [navigate, setAuthStatus]);

  ////////////////////////////////////////

  const [userCount, setUserCount] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await axios.get('http://localhost:8080/liveusers/count');
        setUserCount(response.data);
        if(response.data===0){
            setAuthStatus(false);
            navigate("/login");
        }
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    }, 1000); // Fetch user count every 2 seconds

    // Cleanup function to clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run only once when the component mounts


  ////////////////for profile mounting

  const goAuction = async () => {
    const storedUsername = localStorage.getItem('username');

    if (storedUsername) {
        try {
            const response = await axios.get(`http://localhost:8080/api/check-username/${storedUsername}`);
            const usernameExists = response.data;

            if (usernameExists) {
                navigate("/auction");
            } else {
                navigate("/phone");
            }
        } catch (error) {
            console.error('Error checking username existence:', error);
            // Handle error (e.g., navigate to an error page or display a message)
        }
    } else {
        // If the username is not stored in localStorage, navigate to the phone page
        navigate("/phone");
    }
};




  ///////////////////////////////////////


    const GoDelete = () => {
        navigate('/deleteacc');
    };

    const GoUpdate = () => {
        navigate('/updatepass');
    };


    const goMyContest = () => {
        navigate("/mycontest");
    };
    const goMyproducts = () => {
        navigate("/myproducts");
    };
    const goMyFavourities = () => {
        navigate("/favourities");
    };
    
    const goHome = () => {
        navigate("/home");
    };
    const goAbout = () => {
        navigate("/about");
    };
    const goServices = () => {
        navigate("/services");
    };
    const goTerms = () => {
        navigate("/terms");
    };
    const goMyContact = () => {
        navigate("/contact");
    };
    const goChat = () => {
        navigate("/chat");
    };

    
    return (
        <div className='homeofmain'>
            <header className='hmhead'>
                <h1>ZoneX</h1>
                {/*<div>
                  {userCount !== null ? <h3>Live Users Now: {userCount}</h3> : <p>Loading...</p>}
    </div>*/}
            </header>
            <nav className='hmnav'>
                <div className="hmnav1">
                    <a onClick={goHome}>Home</a>
                    <a onClick={goAbout}>About</a>
                    <a onClick={goServices}>Services</a>
                    <a onClick={goTerms}>Terms and conditions</a>
                    <a onClick={goMyContact}>Contact</a>
                    <a onClick={goMyproducts}>My Products</a>
                    <a onClick={goMyFavourities}>Favourities</a>
                    <a onClick={goChat}>Chat</a>
                    <a onClick={goAuction}>Auction</a>
                    </div>
                    
                    <div className="hmnav2">
                    <MyAccount/>
                    <div className="dropdown">
                        <a className="dropbtn">Settings</a>
                        <div className="dropdown-content">
                            <section>
                                <option onClick={GoUpdate}><a >Edit Password</a></option>
                                <option onClick={GoDelete}><a >Delete Account</a></option>
                                <option onClick={logoutUser}><a >Logout</a></option> {/* Call handleLogout function */}
                            </section>
                        </div>
                    </div>
                </div>
            </nav>
            <main className='hmmain'>
            <HomeGames/>
            </main>
            {/*To prevent user to right click or use ctrl+shift+I or etc*/}

        </div>
    );
};

export default Home;