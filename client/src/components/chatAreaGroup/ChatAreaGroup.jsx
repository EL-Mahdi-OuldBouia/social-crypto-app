import React from 'react';
import './chatAreaGroup.css';

const ChatAreaGroup = ({ messages }) => {
    return (
        <div className='chat-area-group'>
            {messages?.map((messages) => <span>
                <span id='message-sender' className='other-sender'>
                    {messages.sender}
                </span>
                <span id='text-message' className='other-message'>{messages.message}</span>
                <span id='message-date' className='other-date'>{messages.date}</span>
            </span>)}
        </div>
    )
}

export default ChatAreaGroup