import React, { useState } from 'react';
import './UpdatePass.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PreventInspect from './PreventInspect';
import HomeDuplicate from './HomeDuplicate';

const UpdatePassword = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleUpdatePassword = async (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }
        try {
            const res = await axios.put(`http://localhost:8080/updatePassword/${username}/${oldPassword}/${newPassword}`);
            setMessage(res.data);
            if (res.data.includes("successfully")) {
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (error) {
            console.error("Error updating password:", error);
            setMessage("Error updating password. Please try again later.");
        }
    }

    return (
        <div className='mainup'>
        <HomeDuplicate/>
        <div className="upcontainer">
            <h2>Update Password</h2>
            <form className='upform' onSubmit={handleUpdatePassword}>
                <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" name="oldPassword" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
                <input type="password" name="newPassword" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <input type="submit" value="Update Password"/>
            </form>
            {message && (
                <div className={message.includes('successfully') ? 'upsuccess' : 'uperror'}>
                    {message} {message.includes('successfully') && 'Redirecting...'}
                </div>
            )}

            {/*To prevent user to right click or use ctrl+shift+I or etc*/}
            <PreventInspect/>

        </div>
        </div>
    );
}

export default UpdatePassword;
