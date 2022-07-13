import './rightbar.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image from '../../imgs/bitcoin.png';
import addImage from '../../imgs/crypto10.jpg';
import profileImg from '../../imgs/logo.png';
import Online from '../online/Online';
import UserInfo from '../userInfo/UserInfo';
import AddInfoForm from '../addInfoForm/AddInfoForm';


const Rightbar = ({ profile, currentUser }) => {
    const [followings, setFollowings] = useState([]);

    useEffect(() => {
        const fetchFollowings = async () => {
            await axios.get('/users/' + currentUser._id)
                .then((response) => {
                    setFollowings(response.data.followings);
                })
                .catch((err) => {
                    console.log('an error was occured in fetching Followings', err);
                })
        };
        fetchFollowings();
    }, [currentUser._id])

    const HomeRightbar = () => {
        return (
            <div className='rightbar'>
                <div className="rightbarWrapper">
                    <div className="birthdayContainer">
                        <img src={image} width='100' alt="" className='birthdayImg' />
                        <span className="birthdayText">
                            <b>Pola</b> & <b>3 other Friends</b> have a birthday Today
                        </span>
                    </div>
                    <img src={addImage} alt="" className='rightbarAdd' />
                    <h4 className="rightbarTitle">Online Friends</h4>
                    <ul className="rightbarFriendList">
                        {followings.map((followingId) => <Online key={followingId} followingId={followingId} profileImg={profileImg} />)}
                    </ul>
                </div>
            </div>
        );
    }
    const ProfileRightbar = ({ user }) => {
        const [addInfoState, setAddInfoState] = useState(false);
        const addStateHandler = () => {
            setAddInfoState(true);
        }
        return (
            <>
                <h4 className="rightbarTitle">User information</h4>
                {!addInfoState ? (false ? <UserInfo /> : <AddInfoForm />) :
                    <button className='add-info' onClick={addStateHandler}>Add Info</button>}
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                    <div className="rightbarFollowing">
                        <img
                            src={addImage}
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">John Carter</span>
                    </div>

                    <div className="rightbarFollowing">
                        <img
                            src={addImage}
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">John Carter</span>
                    </div>

                    <div className="rightbarFollowing">
                        <img
                            src={addImage}
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">John Carter</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src={addImage}
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">John Carter</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src={addImage}
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">John Carter</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img
                            src={addImage}
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">John Carter</span>
                    </div>
                </div>
            </>
        );
    };
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {profile ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    );
}

export default Rightbar 