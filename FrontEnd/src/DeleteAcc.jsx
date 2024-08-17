import React, { useState } from 'react';
import './DeleteAcc.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PreventInspect from './PreventInspect';
import HomeDuplicate from './HomeDuplicate';


const Login = ({setAuthStatus}) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [accepted, setAccepted] = useState(false); // Track if the checkbox is checked
    const [loginSuccess, setLoginSuccess] = useState(false);


    const handleLogout2 = async () => {
        // Get the username from local storage
        const username = localStorage.getItem('username');
        
        // Call the logout endpoint to delete the user from the database
        try {
            await axios.delete(`http://localhost:8080/logout/${username}`);
            // Remove username from local storage upon successful logout
            localStorage.removeItem('username');
            setAuthStatus(false);
            // Optionally, clear any other user-related data from localStorage
            localStorage.removeItem('authenticated');

            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };


    const handleLogin = async (event) => {
        event.preventDefault();
        if (!accepted) { 
            setUsernameError('');
            setPasswordError('');
            setLoginSuccess(false);
            alert("You must accept");
            return;
        }
        try {
            const res = await axios.delete(`http://localhost:8080/deletename/${username}/${password}`);
            const res2 = await axios.delete(`http://localhost:8080/deletenameshowuser/${username}`);
            console.log(res.data);
            console.log(res2);
            if (res.data === "ok") {
                setLoginSuccess(true);
                setUsernameError('');
                setPasswordError('');
                handleLogout2();
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            } else {
                if (res.data === "Invalid username") {
                    setUsernameError("Invalid username");
                } else if (res.data === "Incorrect password") {
                    setPasswordError("Incorrect password");
                }
                setLoginSuccess(false);
            }
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    }
    

    return (
        <div className='maindl'>
        <HomeDuplicate/>
        <div className="dlcontainer">
            <h2>Delete Your Account</h2>
            <form className='dlform' onSubmit={handleLogin}>
                <input type="text" name="username" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
                {usernameError && <p className="dlerror">{usernameError}</p>}
                <input type="password" name="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                {passwordError && <p className="dlerror">{passwordError}</p>}
                <div className="dlcheckbox">
                    <input type="checkbox" id={username} name={username} value="accept" onChange={() => setAccepted(!accepted)} checked={accepted} />
                    <label htmlFor={username}>I accept that this action can't be undone</label><br />
                    {!accepted && <p className="dlerror">You must accept</p>} {/* Display error if checkbox is not checked */}
                </div>
                <input type="submit" value="DELETE YOUR ACCOUNT" />
            </form>
            {loginSuccess && <p className="dlsuccess">Your Account Deleted! Redirecting...</p>}

            {/*To prevent user to right click or use ctrl+shift+I or etc*/}
            <PreventInspect/>

        </div>
        </div>
    );
}

export default Login;
