import React, { useState, useEffect } from 'react';
import './chat.css';
import profileImage from '../../imgs/logo.png';
import MessageContainer from '../messageContainer/MessageContainer';
import {
    FaMinus, FaTimes,
    FaPaperPlane,
    FaSquare
} from 'react-icons/fa';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { showHideChatActions } from '../../store/showHideChat-slice';



const Chat = () => {
    const userId = useSelector(state => state.user.user);
    const currentChatId = useSelector(state => state.currentChat.currentChatId);
    const dispatch = useDispatch();
    const [textMessage, setTextMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [minimize, setMinimize] = useState(true);
    const height = "50px"

    const [toBeSendMessage, setToBeSendMessage] = useState({});


    console.log('currentChatId', currentChatId.currentChatId);
    console.log('userId in Chat', userId);


    // Getting messages from database for a friend
    useEffect(() => {
        const getMessagesForSingleFriend = () => {
            axios.post('/message/' + userId.userId, {
                friendId: currentChatId.currentChatId
            })
                .then((res) => {
                    setMessages(res.data);
                })
                .catch((err) => {
                    console.log("An error was occured in Chat while getting messages", err);
                })
        }
        getMessagesForSingleFriend();
    }, [currentChatId, userId]);

    // Handel Sending and storing messages
    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (textMessage.trim() !== "" && Object.keys(toBeSendMessage).length > 0) {
            setMessages(messages => [...messages, toBeSendMessage])
            await axios.patch('/message/' + userId.userId, {
                userId: userId.userId,
                friendId: currentChatId.currentChatId,
                message: toBeSendMessage
            })
                .then((res) => {
                    setTextMessage('');
                    setToBeSendMessage({});
                    console.log("the res in chat", res.data)
                })
                .catch((err) => {
                    console.log('An error was occured in chat ', err)
                })
        }
    }

    useEffect(() => {
        const onChangeTextMessage = () => {
            let seconds = new Date().getSeconds();
            let minutes = new Date().getMinutes();
            let date = new Date().getUTCHours() + ':' + (minutes >= 10 ? minutes : '0' + minutes) + ':' + (seconds >= 10 ? seconds : '0' + seconds);
            console.log("date", date);
            console.log('textMessage in onChange', textMessage);
            setToBeSendMessage(obj => ({
                ...obj,
                message: textMessage.trim(),
                sender: userId.userId,
                date: date,
                isRead: false
            }))
        }
        onChangeTextMessage();
    }, [textMessage, userId])


    // chat body functions

    const showHideChat = () => {
        dispatch(showHideChatActions.setShowHideChat());
    }


    return (
        <div className='chat' style={{ height: (!minimize ? height : "270px") }}>
            <div className="chatInfo">
                <div id="imageAndUsername">
                    <img src={profileImage} alt="" />
                    <span className='username'>
                        {currentChatId.currentChatFriend}
                    </span>
                </div>
                <div className="sizeChat">
                    <FaMinus onClick={e => setMinimize(false)} className='remove minus' />
                    <FaSquare onClick={e => setMinimize(true)} className='minimize' />
                    <FaTimes onClick={showHideChat} className='remove' />
                </div>
            </div>
            {minimize && <><div className="messages">
                {true && messages.map((message) =>
                    <MessageContainer key={message.date} message={message} />
                )}
            </div>
                <div className="writeMessage">
                    <textarea type="text" cols="27" rows="3"
                        placeholder='send messages'
                        onChange={e => setTextMessage(e.target.value)}
                        value={textMessage}
                    ></textarea>
                    <FaPaperPlane className='sendBtn' onClick={handleSendMessage} />
                </div> </>}
        </div>
    )
}

export default Chat;