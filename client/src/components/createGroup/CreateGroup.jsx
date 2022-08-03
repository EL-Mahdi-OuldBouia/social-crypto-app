import React, { useState } from 'react';
import './createGroup.css';
import ChooseMembers from '../chooseMembers/ChooseMembers';
import groupLogo from '../../imgs/logo.png';
import { FaCamera } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import axios from 'axios';


const CreateGroup = ({ setIsCreateGroup }) => {
    const userId = useSelector(state => state.user.user);
    const [addedFriends, setAddedFriends] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [groupImage, setGroupImage] = useState([]);
    const [imageURL, setImageURL] = useState('');


    const createGroup = async (e) => {
        e.preventDefault();
        let dataFile = new FormData();
        if (groupName !== '') {
            setIsCreateGroup(true);
            dataFile.append('image', groupImage);
            dataFile.append('admin', userId.username);
            dataFile.append('userId', userId.userId)
            dataFile.append('groupName', groupName);
            dataFile.append('members', [...addedFriends,userId.userId]);
            await axios.post('/groups/group', dataFile)
                .then((res) => {
                    console.log('the group was successfully added members', addedFriends.length)
                    setAddedFriends([]);
                })
                .catch((err) => {

                    console.log('An error was occured during adding the group:', err)
                })
        }
    }

    return (
        <div className="create-group">
            <form action="">
                <span className='title-create-group'>Create New Group</span>
                <div className='input-group-image-container'>
                    <FaCamera id="camera" />
                    <img src={imageURL === "" ? groupLogo : imageURL}
                        width='42' style={{ borderRadius: '50%', placeSelf: "center" }}
                        alt="" />
                    <input type="file" onChange={e => {
                        setImageURL(URL.createObjectURL(e.target.files[0]))
                        setGroupImage(e.target.files[0])
                    }}
                        name="group-image" className='group-image' id="" />
                </div>
                <label htmlFor="group-name">
                    Group Name:
                </label>
                <input type="text" onChange={e => setGroupName(e.target.value)}
                    className='group-name'
                    name="group-name"
                    placeholder='group name..' />
                <label htmlFor="members" >Choose Members for the group:</label>
                <ChooseMembers addedFriends={addedFriends} setAddedFriends={setAddedFriends} />
                <button onClick={createGroup}
                    className="creategroup">
                    create
                </button>
            </form>
        </div>
    )
}

export default CreateGroup;