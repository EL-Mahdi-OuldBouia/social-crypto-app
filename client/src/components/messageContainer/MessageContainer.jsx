import React from 'react';
import './messageContainer.css';

const MessageContainer = ({ message }) => {
    return (
        <div className={'messageContainer' +
            ((message.sender === 'you') ? '' : ' other')}>
            <span className="username">
                {message.sender}
            </span>
            
            <span className="message">
                {message.message}
            </span>
            <span className="date">
                {message.date}
            </span>
        </div>
    )
}

export default MessageContainer;