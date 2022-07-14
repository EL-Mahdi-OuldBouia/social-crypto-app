import React, { useState } from 'react';
import './recievedMessages.css';
import profileImage from '../../imgs/logo.png';

const RecievedMessages = () => {
    const [msgsCount, setMsgsCouns] = useState(false);
    return (
        <div className='reMessages'>
            <div className="img-title">
                <img src={profileImage} alt="" />
                <span className='username'>username</span>
            </div>
            {msgsCount && <span className='numberOfUnreadMsgs'>0</span>}
            <div className="msgPreview">
                message preview
            </div>
        </div>
    )
}

export default RecievedMessages