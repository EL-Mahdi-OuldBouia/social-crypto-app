import React from 'react';
import './reqContainer.css';
import FriendshipRequests from '../friendshipRequests/FriendshipRequests';

const ReqContainer = () => {
    return (
        <div className='reqContainer'>
            <div className='title'>People who want to connect</div>
            <FriendshipRequests />
            <FriendshipRequests />
            <FriendshipRequests />
        </div>
    )
}

export default ReqContainer