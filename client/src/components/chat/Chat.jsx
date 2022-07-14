import React, { useState } from 'react';
import './chat.css';
import profileImage from '../../imgs/logo.png';
import MessageContainer from '../messageContainer/MessageContainer';
import {
    FaMinus, FaTimes,
    FaPaperPlane,
    FaExpandArrowsAlt
} from 'react-icons/fa';



const Chat = ({ user }) => {
    const [message, setMessage] = useState("");
    const handleSentMessage = (e) => {
        e.preventDefault();
    }
    return (
        <div className='chat'>
            <div className="chatInfo">
                <img src={profileImage} alt="" />
                <span className='username'>
                    user.username
                </span>
                <FaMinus className='remove minus' />
                <FaTimes className='remove' />
            </div>
            <div className="messages">
                message
                {false && <MessageContainer />}
            </div>
            <div className="writeMessage">
                <textarea type="text" cols="27" rows="3"
                    placeholder='send messages'
                    onChange={e => setMessage(e.target.value)}
                ></textarea>
                <FaPaperPlane className='sendBtn'/>
            </div>
        </div>
    )
}

export default Chat