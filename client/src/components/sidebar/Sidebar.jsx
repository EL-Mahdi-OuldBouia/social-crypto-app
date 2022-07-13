
import './sidebar.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    RssFeed,
    Chat, OndemandVideo, Group, Bookmark,
    HelpCenter, Work, EventNote, School
} from '@mui/icons-material';
import friendImg from '../../imgs/bitcoin.png';
import Friend from '../friend/Friend';

const Sidebar = ({ currentUser }) => {
    const [followers, setFollowers] = useState([]);
    useEffect(() => {

        const fetchFollowers = async () => {
            await axios.get('/users/' + currentUser._id)
                .then((res) => {
                    setFollowers(res.data.followers)
                    console.log('friends followrs from left bar', followers);
                })
                .catch((err) => {
                    console.log('an error occured in fetching friends', err)
                });
        }
        fetchFollowers();
    }, [currentUser._id])

    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className='sidebarIcon' />
                        <span className="sidebarListItemText">
                            Feed
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <Chat className='sidebarIcon' />
                        <span className="sidebarListItemText">
                            Chats
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <OndemandVideo className='sidebarIcon' />
                        <span className="sidebarListItemText">
                            Videos
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <Group className='sidebarIcon' />
                        <span className="sidebarListItemText">
                            Groups
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmark className='sidebarIcon' />
                        <span className="sidebarListItemText">
                            Bookmarks
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <HelpCenter className='sidebarIcon' />
                        <span className="sidebarListItemText">
                            Questions
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <Work className='sidebarIcon' />
                        <span className="sidebarListItemText">
                            Jobs
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <EventNote className='sidebarIcon' />
                        <span className="sidebarListItemText">
                            Events
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <School className='sidebarIcon' />
                        <span className="sidebarListItemText">
                            Courses
                        </span>
                    </li>
                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className='sidebarHr' />

                <ul className="sidebarFriendList">
                    {followers.map((followerId) => <Friend key={followerId} followerId={followerId} friendImg={friendImg} />)}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;