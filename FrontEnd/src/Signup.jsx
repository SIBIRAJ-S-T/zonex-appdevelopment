// Signup.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './Signup.css';
import PreventInspect from './PreventInspect';
import { useEffect } from 'react';
import OlxHeader from './OlxHeader';

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [isValidUsername, setIsValidUsername] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [registrationSuccess, setRegistrationSuccess] = useState(false); // State to control success message
    const [usernameExists, setUsernameExists] = useState(false); // State to control username exists message

     // State variables to store browser, OS, and device information
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
 
     const signUp = async () => {
        try{
         const res = await axios.post('http://localhost:8080/users', { username, email, password, browserName, osName, deviceName });
         console.log(res);
        }
        catch (error) {
            if (error.response && error.response.status === 409) {
                // If the username already exists, handle the error
                // Display a user-friendly error message
                console.log('User already exists. Please choose a different username.');
            } else {
                // Handle other types of errors, such as network errors
                console.error('Error saving current user:', error);
            }
        }
     }

     const showUser = async () => {
        try{
        const res = await axios.post('http://localhost:8080/showusers', { username, email});
        console.log(res);
        }
        catch (error) {
            if (error.response && error.response.status === 409) {
                // If the username already exists, handle the error
                // Display a user-friendly error message
                console.log('User already exists. Please choose a different username.');
            } else {
                // Handle other types of errors, such as network errors
                console.error('Error saving current user:', error);
            }
        }
    }


    useEffect(() => {
        // Check if the user is already logged in
        const storedAuth = localStorage.getItem('authenticated');
        if (storedAuth === 'true') {
            // If already logged in, redirect to the home page
            navigate('/home');
        }
    }, [navigate]);
    

    const handleChangeUsername = async (e) => {
        const value = e.target.value;
        const isValid = /^[a-z][a-z0-9_]*$/.test(value); 
        setUsername(value);
        setIsValidUsername(value === '' || isValid);
        try {
            const res = await axios.get(`http://localhost:8080/checkUsername/${value}`);
            setUsernameExists(res.data);
        } catch (error) {
            console.error('Error checking username:', error);
        }
    };

    const handleChangeEmail = (e) => {
        const value = e.target.value.toLowerCase(); 
        setEmail(value);
        setIsValidEmail(value === '' || /^[a-z0-9._%+-]+@gmail.com$/.test(value)); 
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
        setPasswordMatch(e.target.value === confirmPassword && e.target.value !== '');
    };

    const handleChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordMatch(e.target.value === password && e.target.value !== '');
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (passwordMatch && isValidUsername && isValidEmail && !usernameExists) {
            console.log('Signup successful');
            setRegistrationSuccess(true); // Set registration success message
            setTimeout(() => {
                setRegistrationSuccess(false); // Remove success message after 3 seconds
                signUp();
                showUser();
                // setAuthenticated(true);
                navigate('/login');
            }, 3000);
        } else {
            alert('Invalid username, email, or passwords do not match!');
        }
    };

    const GoLogin1 = () => {
        navigate('/login');
    };

    return (
        <div className='backgroundofsignup'>
        <div className="sgcontainer">
        <OlxHeader/>
            <h2>Sign Up</h2>
            <form className='sgform' onSubmit={handleSignup}>
                <input type="text" name="username" value={username} onChange={handleChangeUsername} onBlur={handleChangeUsername} placeholder="Username" required />
                {usernameExists && <p className="error">Username already exists</p>}
                {!isValidUsername && username !== '' && !usernameExists && <p className="error">Invalid username. Username must start with a lowercase letter, contain only lowercase letters, numbers, or underscores, and cannot contain uppercase letters, spaces, or special characters.</p>}
                <input type="email" name="email" value={email} onChange={handleChangeEmail} onBlur={handleChangeEmail} placeholder="Email" required />
                {!isValidEmail && email !== '' && <p className="error">Invalid email. Only Gmail addresses are allowed.</p>}
                <input type="password" name="password" value={password} onChange={handleChangePassword} placeholder="Password" required />
                <input type="password" name="confirm_password" value={confirmPassword} onChange={handleChangeConfirmPassword} placeholder="Confirm Password" required />
                {password !== '' && confirmPassword !== '' && (passwordMatch ? <span className="valid">✓</span> : <span className="invalid">✗ <span className='passinvalid'>password does not matched</span></span>)}
                <input type="submit" value="Sign Up" disabled={!passwordMatch || !isValidUsername || !isValidEmail || username === '' || email === '' || usernameExists} />
            </form>
            <p>Already have an account? <a className='sganc' onClick={GoLogin1}>Login here</a>.</p>
            {registrationSuccess && <div className="success-message">Registration successful! ✓ <br/>Please Login With Your Details</div>}


            {/*To prevent user to right click or use ctrl+shift+I or etc*/}
            

        </div>
        </div>
    );
};

export default Signup;
