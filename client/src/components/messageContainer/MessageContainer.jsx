import React from 'react';
import './messageContainer.css';

const MessageConatiner = ({ message, username, date }) => {
    return (
        <div className='messageContainer'>
            <span className="username">
                {username}
            </span>
            <span className="message">
                {message}
            </span>
            <span className="date">
                {date}
            </span>
        </div>
    )
}

export default MessageConatiner