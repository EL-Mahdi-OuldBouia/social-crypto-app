import React, { useEffect, useState } from 'react';
import { FaPaperPlane, FaTimes, FaMinus, FaSquare } from 'react-icons/fa';
import './groupContainer.css';
import ChatAreaGroup from '../chatAreaGroup/ChatAreaGroup';
import { useSelector, useDispatch } from 'react-redux';
import { showGroupActions } from '../../store/showGroup-slice';
import GroupMember from '../groupMember/GroupMember';
import axios from 'axios';
import image from '../../imgs/logo.png';

const GroupContainer = () => {
    const userId = useSelector(state => state.user.user);
    const group = useSelector(state => state.currentGroup.currentGroup);
    const dispatch = useDispatch();
    const [messages, setMessages] = useState(group.messages);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setMessages(group.messages)
    }, [group])

    console.log('the group messages are :', group)
    const sendMessage = async () => {
        const seconds = new Date().getSeconds();
        const minutes = new Date().getMinutes();
        const date = new Date().getHours() + ':' + (minutes > 10 ? minutes : '0' + minutes) + ':' + (seconds > 10 ? seconds : '0' + seconds)
        if (message.trim() !== "" && group.groupId) {
            setMessages(messages => [...messages, {
                sender: userId.username,
                message: message,
                date: date
            }])
            console.log(`the group is: ${group}`);
            await axios.patch('/groups/group/' + group.groupId, {
                change: "messages",
                sender: userId.username,
                senderId: userId.userId,
                message: message,
                date: date,

            })
                .then((res) => {
                    console.log('the message was sent successfully', res);
                    setMessage('');
                })
                .catch((err) => {
                    console.log('there was an error while sending the message', err)
                })
        }
    }

    const removeGroupChat = () => {
        dispatch(showGroupActions.setShowGroup());
    }

    const getWindowSize = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);


    return (
        <div className='group-c-container'
            style={{ top: windowSize.height - 475 + 'px' }}>
            <div className="group-name">
                <div className='gn1'>
                    <img width='30' src={group.groupPicture ? `data:image/png;base64,${group.groupPicture}` : image} alt="" />
                    {group.groupName}
                </div>
                <div className="gn2">
                    <FaMinus className='icon' />
                    <FaSquare className='icon' />
                    <FaTimes className='icon' onClick={removeGroupChat} />
                </div>
            </div>
            <div className="members-chat">
                <div className="group-members">
                    <h4>Group Members</h4>
                    <div className='gm'>
                        {
                            group.members.map((member) =>
                                <GroupMember key={member} member={member} />)
                        }
                    </div>

                </div>
                <div className="chat-container">
                    <ChatAreaGroup messages={messages} />
                </div>
            </div>
            <div className="text-message">
                <textarea name="textarea" id="groupchat"
                    onChange={e => setMessage(e.target.value)}
                    value={message}
                    cols="80" rows="5"
                    placeholder='tell your friends whats on you mind'>
                </textarea>
                <div
                    className="send-message-group">
                    <FaPaperPlane onClick={sendMessage} />
                </div>

            </div>
        </div>
    )
}

export default GroupContainer;