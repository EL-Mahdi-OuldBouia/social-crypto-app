import React from 'react';
import './chatAreaGroup.css';
import { useSelector } from 'react-redux';

const ChatAreaGroup = ({ messages }) => {
    const userId = useSelector(state => state.user.user)
    return (
        <div className='chat-area-group'>
            {messages?.map((message, index) => <span key={message.date + index}>
                <span id={(userId.username === message.sender ? 'message' : 'other') + '-sender'} >
                    {message.sender}
                </span>
                <span id={(userId.username === message.sender ? 'text' : 'other') + '-message'} >{message.message}</span>
                <span id={(userId.username === message.sender ? 'message' : 'other') + '-date'} >{message.date}</span>
            </span>)}
        </div>
    )
}

export default ChatAreaGroup