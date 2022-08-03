import './addInfoForm.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';


const AddInfoForm = ({ setAddInfoState }) => {
    const userId = useSelector(state => state.user.user);
    const [realname, setRealName] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [relationship, setRelationship] = useState('');
    const [description, setDescription] = useState("");

    console.log("values of relationship:", relationship);


    const handleInfo = async (e) => {
        e.preventDefault();
        if (realname !== '' && city !== '' &&
            country !== '' && relationship !== ''
            && description !== '') {
            setAddInfoState(true);
            await axios.post('/profile', {
                userId: userId.userId,
                userRealName: realname,
                city: city,
                country: country,
                relationship: relationship,
                description: description,
                isAdded: true
            })
                .then((res) => {
                    console.log('response from profile adding', res)
                    setCity('');
                    setRealName('');
                    setCountry('');
                    setDescription("");
                })
                .catch((err) => {
                    console.log('an error was occured in adding info', err);
                })
        }
    }

    console.log('description', description)

    return (
        <form className='addInfoForm'>
            <label htmlFor="real-name">Real Name:</label>
            <input className='inputInfo' type="text" placeholder='John Wick' name='real-name'
                onChange={(e) => setRealName(e.target.value)} value={realname} />
            <label htmlFor="city">City:</label>
            <input className='inputInfo' type="text" placeholder='New York' name='city'
                onChange={(e) => setCity(e.target.value)} value={city} />
            <label htmlFor="country">Country:</label>
            <input className='inputInfo' type="text" name="country"
                placeholder='USA'
                onChange={(e) => setCountry(e.target.value)} value={country} />
            <label htmlFor="relationship">Relationship:</label>
            <div>
                <div>
                    <input type="radio" id="single" onChange={e => setRelationship(e.target.value)} name="relationship" value="single" />
                    <label className='formLabelradio' htmlFor="single">Single</label>
                </div>

                <div>
                    <input type="radio" id="married" onChange={e => setRelationship(e.target.value)} name="relationship" value="married" />
                    <label className='formLabelradio' htmlFor="married">Married</label>
                </div>

                <div>
                    <input type="radio" id="divorced" onChange={e => setRelationship(e.target.value)} name="relationship" value="divorced" />
                    <label className='formLabelradio' htmlFor="divorced">Divorced</label>
                </div>
                <textarea placeholder="Tell us Ur Story.."
                    name="description" onChange={e => setDescription(e.target.value)}
                    id="desc" rows="5" value={description}
                    cols="33" style={{ resize: "none" }}>
                </textarea>
            </div>
            <button className='addInfo' onClick={handleInfo}>Add</button>
        </form>
    )
}

export default AddInfoForm;