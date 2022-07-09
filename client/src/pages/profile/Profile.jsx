import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import coverImg from '../../imgs/logo.png'

const Profile = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
        const fetchUserProfile = async () => {
            console.log('hello from profile');
            await axios.get('/users/62c5cdc71390184b6a11bfa8')
                .then((response) => {
                    console.log('response from user profile', response.data);
                    setUser(response.data);
                })
                .catch((error) => {
                    console.log('An error was occured in fetching profile info', error);
                })
        };
        fetchUserProfile();
    }, [])
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={coverImg}
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={coverImg}
                                alt=""
                            />
                            <div className="profileInfo">
                                <h4 className="profileInfoName">{user.username}</h4>
                                <span className="profileInfoDesc">What a Good Day!</span>
                            </div>
                        </div>
                    </div>
                    <div className='space'></div>
                    <div className="profileRightBottom">
                        <Feed />
                        <Rightbar user={user} profile />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile