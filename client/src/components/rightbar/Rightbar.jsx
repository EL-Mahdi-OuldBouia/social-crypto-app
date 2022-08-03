import './rightbar.css';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import image from '../../imgs/bitcoin.png';
import addImage from '../../imgs/crypto10.jpg';
import profileImg from '../../imgs/logo.png';
import Online from '../online/Online';
import UserInfo from '../userInfo/UserInfo';
import AddInfoForm from '../addInfoForm/AddInfoForm';
import Friend from '../friend/Friend';


const Rightbar = ({ profile, cover }) => {
    const userId = useSelector(state => state.user.user);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            await axios.get('/users/' + userId.userId)
                .then((response) => {
                    setFriends(response.data.friends);
                })
                .catch((err) => {
                    console.log('an error was occured in fetching Followings', err);
                })
        };
        fetchFriends();
    }, [userId])
    const HomeRightbar = () => {
        return (
            <div className='rightbar'>
                <div className="rightbarWrapper">
                    <div className="birthdayContainer">
                        <img src={image} width='100' alt="" className='birthdayImg' />
                        <span className="birthdayText">
                            <b>Pola</b> & <b>3 other Friends</b> have birthday Today
                        </span>
                    </div>
                    <img src={addImage} alt="" className='rightbarAdd' />
                    <h4 className="rightbarTitle">Online Friends</h4>
                    <ul className="rightbarFriendList">
                        {friends?.map((friendId, index) => <Online key={index.toString()+friendId} friendId={friendId} profileImg={profileImg} />)}
                    </ul>
                </div>
            </div>
        );
    }
    const ProfileRightbar = () => {
        const [addInfoState, setAddInfoState] = useState(false);
        const userId = useSelector(state => state.user.user);
        const [userInfo, setUserInfo] = useState({
            userRealName: "",
            description: "",
            city: "",
            country: "",
            relationship: "",
            isAdded: false
        });

        useEffect(() => {
            const fetchUserInfo = async () => {
                await axios.get('/profile/' + userId.userId)
                    .then((res) => {
                        if (res.data.length > 0) {
                            setAddInfoState(true)
                            setUserInfo(res.data[0]);
                        } else {
                            setAddInfoState(false);
                        }
                    })
                    .catch((err) => {
                        console.log('an error was occured while getting the user info', err)
                    })
            }
            fetchUserInfo();
        }, [addInfoState, userId])



        return (
            <>
                <h4 className="rightbarTitle">User information</h4>
                {
                    addInfoState ? <UserInfo userInfo={userInfo} /> :
                        <AddInfoForm setAddInfoState={setAddInfoState} />

                }
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                    {userId.friends.map((friend,index) => <Friend key={friend+index.toString()} friendImage={addImage} friendId={friend} />)}

                </div>
            </>
        );
    };

    const ProfileRightbarCover = () => {
        const [addInfoStateCover, setAddInfoStateCover] = useState(false);
        const userId = useSelector(state => state.user.user);
        const currentCoverPageUserId = useSelector(state => state.currentCoverPage.currentCoverPage);
        const [currentCoverPageUserFriends, setCurrentCoverPageUserFriends] = useState([]);
        const [userCoverPageInfo, setUserCoverPageInfo] = useState({
            userRealName: "",
            description: "",
            city: "",
            country: "",
            relationship: "",
            isAdded: false
        });

        useEffect(() => {
            const fetchUserInfo = async () => {
                await axios.get('/profile/' + currentCoverPageUserId)
                    .then((res) => {
                        if (res.data.length > 0) {
                            setAddInfoStateCover(true)
                            setUserCoverPageInfo(res.data[0]);
                        } else {
                            setAddInfoStateCover(false);
                        }
                    })
                    .catch((err) => {
                        console.log('an error was occured while getting the user info', err)
                    })
            }
            fetchUserInfo();
            
        }, [userId, currentCoverPageUserId])

        useEffect(() => {
            const getFriendsOfCurrentCoverPageUser = async () => {
                await fetch('/users/' + currentCoverPageUserId, {
                    method: 'GET'
                })
                    .then((res) => {
                        res.json().then((data) => {
                            setCurrentCoverPageUserFriends(data.friends);
                        })
                    })
            }
            if (currentCoverPageUserId !== userId.userId) {
                getFriendsOfCurrentCoverPageUser();
            }
        }, [currentCoverPageUserId, userId]);

        return (
            <>
                <h4 className="rightbarTitle">User information</h4>
                {
                    addInfoStateCover ? <UserInfo userInfo={userCoverPageInfo} /> : <div>Not added yet</div>
                }
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                    {currentCoverPageUserFriends.map((friend) => <Online key={friend} cover
                        profileImg={addImage}
                        friendId={friend} />)}

                </div>
            </>
        );
    };

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {profile ? (cover ? <ProfileRightbarCover /> : <ProfileRightbar />) : <HomeRightbar />}
            </div>
        </div>
    );
}

export default Rightbar;