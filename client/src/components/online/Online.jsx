
import './online.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Online = ({ followingId, profileImg }) => {
    const [following, setFollowing] = useState({});
    useEffect(() => {
        const fetchFollowing = async () => {
            await axios.get('users/' + followingId)
                .then((response) => {
                    setFollowing(response.data);
                })
                .catch((err) => {
                    console.log('an error was occured in fetching Following', err);
                })
        };
        fetchFollowing();
    })

    return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <img src={profileImg} alt="" className="rightbarProfileImg" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{following.username}</span>
        </li>

    )
}

export default Online