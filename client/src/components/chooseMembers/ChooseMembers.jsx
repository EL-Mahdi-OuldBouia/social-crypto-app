import React, { useState } from 'react';
import './chooseMembers.css';
import GroupMember from '../groupMember/GroupMember';
import { useSelector } from 'react-redux';

const ChooseMembers = ({ addedFriends, setAddedFriends }) => {
    const [friends, setFriends] = useState(useSelector(state => state.user.user.friends));



    const addFriendToGroup = (e, friend) => {
        e.preventDefault();
        setFriends(list => list.filter(el => el !== friend))
        setAddedFriends(list => [...list, friend])
        console.log('addedFriends:', addedFriends)
    }

    const removeFriendFromGroup = (e, friend) => {
        e.preventDefault();
        setAddedFriends(list => list.filter((el) => el !== friend))
        setFriends(list => [...list, friend]);
    }

    return (
        <div className='choose-members-container'>
            {friends?.map((friend) => <div key={friend} className='add-remove-div'>
                <GroupMember member={friend} />
                <div className="add-remove-btn">
                    <button onClick={e => addFriendToGroup(e, friend)} className="add b-add">ADD</button>
                </div>
            </div>)}
            <div id='added-friends'>Added Friends:</div>
            {addedFriends?.map((addedFriend) => <div
                key={addedFriend} className='add-remove-div'>
                <GroupMember member={addedFriend} />
                <div className="add-remove-btn">
                    <button onClick={e => removeFriendFromGroup(e, addedFriend)}
                        className="remove b-remove" >REMOVE</button>
                </div>
            </div>)}

        </div>
    )
}

export default ChooseMembers