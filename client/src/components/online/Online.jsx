
import './online.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { currentChatActions } from '../../store/currentChat-slice';
import { showHideChatActions } from '../../store/showHideChat-slice';

const Online = ({ friendId, profileImg }) => {
    const [friend, setFollowing] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchFollowing = async () => {
            await axios.get('users/' + friendId)
                .then((response) => {
                    setFollowing(response.data);
                })
                .catch((err) => {
                    console.log('an error was occured in fetching Following', err);
                })
        };
        fetchFollowing();
    }, [])

    const chatWithFriend = () => {
        dispatch(currentChatActions.setCurrentChat({
            currentChatId: friendId,
            currentChatFriend: friend.username
        }))
        dispatch(showHideChatActions.setShowHideChat());
    }

    return (
        <li className="rightbarFriend" onClick={chatWithFriend}>
            <div className="rightbarProfileImgContainer">
                <img src={profileImg} alt="" className="rightbarProfileImg" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{friend.username}</span>
        </li>

    )
}

export default Online;