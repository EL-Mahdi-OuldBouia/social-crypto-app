import './friend.css';

import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Friend = ({ friendImg, followerId }) => {
  const [follower, setFollower] = useState({});
  useEffect(() => {
    const fetchFollower = async () => {
      await axios.get('/users/' + followerId)
        .then((res) => {
          setFollower(res.data);
        })
    }
    fetchFollower();
  }, [followerId])
  return (
    <li className="sidebarFriend">
      <img src={friendImg} width='40' height='40' alt="" className='sidebarFriendImg' />
      <span className='sidebarFriendName'>{follower.username}</span>
    </li>

  )
}

export default Friend