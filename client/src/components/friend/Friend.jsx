import './friend.css';
import { useDispatch, useSelector } from 'react-redux';
import { currentCoverPageActions } from '../../store/currentCoverPage-slice';

import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Friend = ({ friendImage, friendId }) => {
  const currentCoverUserId = useSelector(state => state.currentCoverPage.currentCoverPage)
  const dispatch = useDispatch();
  const [follower, setFollower] = useState({});
  useEffect(() => {
    const fetchFollower = async () => {
      await axios.get('/users/' + friendId)
        .then((res) => {
          setFollower(res.data);
        })
        .catch((err) => {
          console.log("there was an error fetching friends in friends component", err)
        })
    }
    fetchFollower();
  }, [friendId])

  const changeCurrentCoverPage = (e) => {
    console.log('in the changeCurrentCoverPage function', currentCoverUserId)
    console.log('the value of cover:', );
    e.preventDefault();
    //  if (cover) {
    console.log('from inside cover friend Id', friendId)
    dispatch(currentCoverPageActions.setCurrentCoverPage(friendId));
    console.log('the value of cover id after dispatch', currentCoverUserId);
    //  }
  }

  return (
    <li className="sidebarFriend">
      <img src={friendImage} width='40' onClick={changeCurrentCoverPage}
        height='40' alt="" className='sidebarFriendImg' />
      <span className='sidebarFriendName'>{follower.username}</span>
    </li>
  )
}

export default Friend;