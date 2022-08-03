import React from 'react';
import './messageContainer.css';
import { useSelector } from 'react-redux';



const MessageContainer = ({ message }) => {
    const userId = useSelector(state => state.user.user);
    const currentChatFriend = useSelector(state=>state.currentChat.currentChatId)
    

    return (
        <div className={'messageContainer' +
            ((message.sender !== userId?.userId) ? '' : ' other')
        }>

            <span className="username friend">
                {message?.sender === userId?.userId ? userId.username : currentChatFriend.currentChatFriend}
            </span>

            <span className="message friend">
                {message?.message}
            </span>
            <span className="date friend">
                {message?.date}
            </span>
        </div>
    )
}

export default MessageContainer;