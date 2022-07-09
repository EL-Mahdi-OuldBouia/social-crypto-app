import React from 'react';
import './userInfo.css'

const UserInfo = () => {
    return (
        <div className="rightbarInfo">
            <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">City:</span>
                <span className="rightbarInfoValue">New York</span>
            </div>
            <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">From:</span>
                <span className="rightbarInfoValue">Madrid</span>
            </div>
            <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Relationship:</span>
                <span className="rightbarInfoValue">Single</span>
            </div>
        </div>
    )
}

export default UserInfo