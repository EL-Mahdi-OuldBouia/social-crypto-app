import React, { useState, useEffect } from 'react';
import './recievedMessages.css';
import profileImage from '../../imgs/logo.png';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { currentChatActions } from '../../store/currentChat-slice';
import { showHideChatActions } from '../../store/showHideChat-slice';


const RecievedMessages = ({ el }) => {
    const dispatch = useDispatch();
    const [friendObject, setFriendObject] = useState({});
    const getMessages = useSelector(state => state.getMessages.getMessages)

    useEffect(() => {
        const getFriendObject = () => {
            axios.get('/users/' + el.friendId)
                .then((res) => {
                    setFriendObject(res.data);
                })
                .catch((err) => {
                    console.log('An Error was ocured in getting friendObject', err);
                })
        }
        getFriendObject();

    }, [getMessages, el.friendId])

    const changeCurrentChat = () => {
        dispatch(currentChatActions.setCurrentChat({
            currentChatId: el.friendId,
            currentChatFriend: friendObject.username
        }))

        dispatch(showHideChatActions.setShowChat());
    }





    return (
        <div className='reMessages' onClick={changeCurrentChat} >
            <div className="img-title">
                <img src={profileImage} alt="" />
                <span className='username'>{friendObject?.username}</span>
                {true && <span className='numberOfUnreadMsgs'>,{0}</span>}
            </div>
            <div className="msgPreview">
                {el.messages[el.messages.length - 1].message}
            </div>
        </div>
    )
}

export default RecievedMessages;