import React from 'react';
import './messagesContainer.css';

const MessageContainer = ({ Req, title, allMessages }) => {


    return (
        <div className='messagesContainer'>
            <div className='title'>{title}</div>
            {allMessages?.map((el, index) => <Req key={index} el={el} />)}
        </div>
    )
}


export default MessageContainer;