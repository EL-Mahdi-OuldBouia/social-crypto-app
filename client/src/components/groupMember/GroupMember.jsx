import './groupMember.css';
import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import image from '../../imgs/logo.png';

const GroupMember = ({ member }) => {
    const [memberInfo, setMemberInfo] = useState({})
    useEffect(() => {
        const getMember = async () => {
            await fetch('/users/' + member)
                .then((res) => {
                    res.json().then((data) => {
                        setMemberInfo({
                            username: data.username,
                            userImage: (Object.keys(data).includes('profilePicture') ? Buffer.from(data.profilePicture.data).toString("base64") : "")
                        })
                    })
                })
        }
        getMember();
    }, [member]);

    return (
        <div className='group-member'>
            <span className='group-memeber-image'>
                <img src={memberInfo.userImage !== "" ? `data:image/png;base64,${memberInfo.userImage}` : image} alt="" />
            </span>
            <span className="memberName">{memberInfo.username}</span>
        </div>
    )
}

export default GroupMember