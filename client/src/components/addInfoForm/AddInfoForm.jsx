import './addInfoForm.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';


const AddInfoForm = () => {
    const userId = useSelector(state => state.user.user);
    const [realname, setRealName] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [relationship, setRelationship] = useState('single');
    const seeUserId = () => {
        console.log('the userUd ', userId)
    };
    seeUserId();
    const handleInfo = async (e) => {
        e.preventDefault();
        axios.post('/profile', {
            userId: '62c5cdc71390184b6a11bfa8',
            userRealName: realname,
            city: city,
            country: country,
            relationship: relationship
        })
            .then((res) => {
                console.log('response from profile adding', res)
            })
            .catch((err) => {
                console.log('an error was occured in adding info', err);
            })
    }
    return (
        <form className='addInfoForm'>
            <label htmlFor="real-name">Real Name:</label>
            <input className='inputInfo' type="text" placeholder='John Wick' name='real-name'
                onChange={(e) => setRealName(e.target.value)} />
            <label htmlFor="city">City:</label>
            <input className='inputInfo' type="text" placeholder='New York' name='city'
                onChange={(e) => setCity(e.target.value)} />
            <label htmlFor="country">Country:</label>
            <input className='inputInfo' type="text" name="country"
                placeholder='USA'
                onChange={(e) => setCountry(e.target.value)} />
            <label htmlFor="relationship">Relationship:</label>
            <div>
                <div>
                    <input type="radio" id="single" name="relationship" value="single" checked />
                    <label className='formLabelradio' for="single">Single</label>
                </div>

                <div>
                    <input type="radio" id="married" name="relationship" value="married" />
                    <label className='formLabelradio' for="married">Married</label>
                </div>

                <div>
                    <input type="radio" id="divorced" name="relationship" value="divorced" />
                    <label className='formLabelradio' for="divorced">Divorced</label>
                </div>
            </div>
            <button className='addInfo' onClick={handleInfo}>Add</button>
        </form>
    )
}

export default AddInfoForm;