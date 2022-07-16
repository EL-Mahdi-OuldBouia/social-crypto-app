import React, { useState } from 'react';
import './chat.css';
import profileImage from '../../imgs/logo.png';
import MessageContainer from '../messageContainer/MessageContainer';
import {
    FaMinus, FaTimes,
    FaPaperPlane,
} from 'react-icons/fa';
import axios from 'axios';
import { useSelector } from 'react-redux';



const Chat = ({ user }) => {
    const userId = useSelector(state => state.user.user)
    const date = new Date().getUTCHours() + ':' + new Date().getMinutes()

    const [message, setMessage] = useState({
        message: "my first message",
        sender: "you",
        date: date,
        isRead: false
    });
    const [toBeSentMessage, setToBeSentMessage] = useState({})
    const handleSentMessage = async (e) => {
        e.preventDefault();
        const date = new Date().getUTCHours() + ':' + new Date().getMinutes()
        if (e.target.value !== "") {
            setToBeSentMessage({
                message: e.target.value,
                sender: 'you',
                date: date,
                isRead: false
            })
            await axios.post('/')

        }

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
                {true && <MessageContainer message={message} />}
            </div>
            <div className="writeMessage">
                <textarea type="text" cols="27" rows="3"
                    placeholder='send messages'
                    onChange={e => setMessage(e.target.value)}
                ></textarea>
                <FaPaperPlane className='sendBtn' />
            </div>
        </div>
    )
}

export default Chat