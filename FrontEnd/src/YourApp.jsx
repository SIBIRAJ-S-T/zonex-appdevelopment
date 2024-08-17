import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './YourApp.css';
import HomeDuplicate from './HomeDuplicate';
import Terms2 from './Extras/Terms2';

const YourApp = () => {
    const navigate = useNavigate();
    const [username] = useState(localStorage.getItem('username'));
    const [appurl, setAppurl] = useState('');
    const [appname, setAppname] = useState('');
    const [appicon, setAppicon] = useState(null);
    const [price, setPrice] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [owner, setOwner] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [usernameExists, setUsernameExists] = useState(false);
    const [appUrlExists, setAppUrlExists] = useState(false);
    const [checkBoxChecked, setCheckBoxChecked] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const saveYourApp = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        setIsSubmitting(true); // Disable the button when the form is being submitted

        const formData = new FormData();
        formData.append('yourapp', new Blob([JSON.stringify({
            username, appurl, appname, price, district, state, pincode, owner, contact, address
        })], { type: 'application/json' }));
        formData.append('appicon', appicon);

        try {
            const res = await axios.post('http://localhost:8080/api/yourapp', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(res);
            setRegistrationSuccess(true);

            // After 3 seconds, navigate to the home page
            setTimeout(() => {
                navigate('/home');
            }, 1000);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                console.log('User already exists. Please choose a different username.');
                setUsernameExists(true);
            } else {
                console.error('Error saving current user:', error);
            }
            setIsSubmitting(false); // Re-enable the button if there was an error
        }
    };

    const handleChangeAppUrl = (e) => {
        setAppurl(e.target.value);
    };

    const handleChangeAppName = (e) => {
        setAppname(e.target.value);
    };
    
    const handleChangeAppIcon = (e) => {
        setAppicon(e.target.files[0]);
    };

    const handleChangePrice = (e) => {
        setPrice(e.target.value);
    };

    const handleChangeDistrict = (e) => {
        setDistrict(e.target.value);
    };

    const handleChangeState = (e) => {
        setState(e.target.value);
    };

    const handleChangePincode = (e) => {
        setPincode(e.target.value);
    };

    const handleChangeOwner = (e) => {
        setOwner(e.target.value);
    };

    const handleChangeContact = (e) => {
        setContact(e.target.value);
    };

    const handleChangeAddress = (e) => {
        setAddress(e.target.value);
    };

    // Function to check if any field is empty
    const isAnyFieldEmpty = () => {
        return !appurl || !appname || !appicon || !checkBoxChecked;
    };

    // Function to handle checkbox change
    const handleCheckBoxChange = (e) => {
        setCheckBoxChecked(e.target.checked);
    };

    return (
        <div className='mainyourappmain'>
            <HomeDuplicate/>
            <div className="ypcontainer">
                <h2>Provide Product Details</h2>
                <form className='ypform' onSubmit={saveYourApp}>
                    <div>
                        <input type="text" name="app url" value={appurl} onChange={handleChangeAppUrl} placeholder="Product Name*" required />
                        {appUrlExists && <div className="error-message">App URL already exists</div>}
                        <input type="number" name="price" value={price} onChange={handleChangePrice} placeholder="Price*" required />
                        <input type="number" name="owner" value={owner} onChange={handleChangeOwner} placeholder="OwnerShip*" required />
                    </div>
                    <div className='linkandphone'>
                        <input type="file" name="app icon" onChange={handleChangeAppIcon} placeholder="Product Image*" required />
                        <input type="number" name="contact" value={contact} onChange={handleChangeContact} placeholder="Contact*" required />
                    </div>
                    <div>
                        <input type="text" name="district" value={district} onChange={handleChangeDistrict} placeholder="District*" required />
                        <input type="text" name="state" value={state} onChange={handleChangeState} placeholder="State*" required />
                        <input type="text" name="pincode" value={pincode} onChange={handleChangePincode} placeholder="Pincode*" required />
                    </div>
                    <textarea type="text" cols="40" rows="4" name="address" value={address} onChange={handleChangeAddress} placeholder="Address(Optional)"/><br/>
                    <textarea type="text" cols="40" rows="4" name="app name" value={appname} onChange={handleChangeAppName} placeholder="Product Description*" required /><br/>
                    <label>
                        <input type="checkbox" checked={checkBoxChecked} onChange={handleCheckBoxChange} required /> I accept the <Link to="/terms" target='_blank'>terms and conditions</Link>
                    </label>
                    <button type="submit" className='ypsubclick' disabled={isSubmitting || isAnyFieldEmpty()}>Submit</button>
                </form>
                {registrationSuccess && (
                    <div className="success-message">
                        Registration successful! Redirecting to home...
                    </div>
                )}
            </div>
        </div>
    );
};

export default YourApp;
