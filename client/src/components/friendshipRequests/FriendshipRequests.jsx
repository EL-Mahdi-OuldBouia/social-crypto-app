import './friendshipRequests.css';
import React from 'react';
import profileImage from '../../imgs/logo.png';
const FriendshipRequests = ({ request }) => {
    return (
        <div className='friends-req'>
            <div className="req-container">
                <img src={profileImage} width='45' alt="" />
                <div className="username">username</div>
                <button className='btn b1' variant='contained'>Accept</button>
                <button className='btn b2' variant='outlined' color="error">Decline</button>
            </div>
        </div>
    )
}

export default FriendshipRequests;