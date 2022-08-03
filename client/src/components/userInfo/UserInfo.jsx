import React from 'react';
import './userInfo.css'

const UserInfo = ({ userInfo }) => {
    return (
        <div className="rightbarInfo">
            <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Real Name:</span>
                <span className="rightbarInfoValue">{userInfo.userRealName}.</span>
            </div>
            <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">City:</span>
                <span className="rightbarInfoValue">{userInfo.city}.</span>
            </div>
            <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">From:</span>
                <span className="rightbarInfoValue">{userInfo.country}.</span>
            </div>
            <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Relationship:</span>
                <span className="rightbarInfoValue">{userInfo.relationship}.</span>
            </div>
            <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Description:</span>
                <span className="rightbarInfoValue">{userInfo.description}.</span>
            </div>
        </div>
    )
}

export default UserInfo;