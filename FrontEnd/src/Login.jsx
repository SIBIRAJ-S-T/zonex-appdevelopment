import React, { useState, useEffect } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PreventInspect from './PreventInspect';
import OlxHeader from './OlxHeader';

const Login = ({ setAuthStatus }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [usernameExists, setUsernameExists] = useState(false);
    const [browserName, setBrowserName] = useState('');
    const [osName, setOSName] = useState('');
    const [deviceName, setDeviceName] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        getBrowserInfo();
        detectDeviceType();
    }, []);

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
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
            setDeviceName('Mobile');
        } else if (/iPad/i.test(userAgent)) {
            setDeviceName('Tablet');
        } else {
            setDeviceName('Desktop/Laptop');
        }
    };

    const saveHistory = async () => {
        const res = await axios.post('http://localhost:8080/loginhistory', { username, browserName, osName, deviceName });
        console.log(res);
    }

    const saveCurrentUser = async () => {
        try {
            const res = await axios.post('http://localhost:8080/currentuserinsert', {username});
            console.log(res);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                console.log('User already exists. Please choose a different username.');
            } else {
                console.error('Error saving current user:', error);
            }
        }
    }

    useEffect(() => {
        const storedAuth = localStorage.getItem('authenticated');
        if (storedAuth === 'true') {
            navigate('/home');
        }
    }, [navigate]);

    const Handle_Login = async (event) => {
        event.preventDefault();
        const res = await axios.get(`http://localhost:8080/get/${username}/${password}`);
        console.log(res.data)
        if (res.data === "ok") {
            localStorage.setItem('username', username);
            localStorage.setItem('loginTime', new Date().getTime().toString());
            saveHistory();
            saveCurrentUser();
            setLoginSuccess(true);
            setUsernameError('');
            setPasswordError('');

            setLoggedIn(true);
            setAuthStatus(true);

            setTimeout(() => {
                navigate('/home');
            }, 3000);
        } else if (res.data === "pass") {
            setPasswordError("Incorrect password.");
            setUsernameError('');
            setLoginSuccess(false);
        } else {
            setUsernameError("The provided username is not registered. Please sign up first.");
            setPasswordError('');
            setLoginSuccess(false);
        }
    }

    const handleCheckUsername = async (e) => {
        const value = e.target.value;
        setUsername(value);
    };

    const GoSignup1 = () => {
        navigate('/signup');
    }

    return (
        <div className='video-background'>
            <div className="content">
                <div className="lgcontainer">
                    <OlxHeader />
                    <h2>Login</h2>
                    <form className='lgform' onSubmit={Handle_Login}>
                        <input type="text" name="username" value={username} onChange={handleCheckUsername} onBlur={handleCheckUsername} placeholder="Username" required />
                        {usernameError && <p className="error">{usernameError}</p>}
                        {usernameExists && <p className="error">User already logged in</p>}
                        <input type="password" name="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                        {passwordError && <p className="error">{passwordError}</p>}
                        <input type="submit" value="Login" disabled={usernameExists} />
                    </form>
                    <p>Don't have an account? <a className='lganc' onClick={GoSignup1}>Sign up here</a>.</p>
                    {loginSuccess && <p className="success">Login successful! Redirecting...</p>}
                </div>
            </div>
        </div>
    );
}

export default Login;
