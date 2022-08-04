
import './sidebar.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    RssFeed,
    Chat, OndemandVideo, Group, Bookmark,
    HelpCenter, Work, EventNote, School
} from '@mui/icons-material';
import friendImg from '../../imgs/bitcoin.png';
import Friend from '../friend/Friend';
import SingleGroup from '../singleGroup/SingleGroup';
import CreateGroup from '../createGroup/CreateGroup';

const Sidebar = () => {
    const userId = useSelector(state => state.user.user);
    const [isCreateGroup, setIsCreateGroup] = useState(userId.groups.length > 0);
    const [showGroups, setShowGroups] = useState(false);



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
                    <li className="sidebarListItem groups-container">
                        <span className="sidebarListItemText grp">
                            <Group className='sidebarIcon' onClick={e => setShowGroups(v=>!v)} />
                            Groups
                        </span>
                        <div className="groups">
                            <ul>
                                {showGroups && userId?.groups.map((groupId) => <SingleGroup  showGroups={showGroups} key={groupId} groupId={groupId} groupImage={friendImg} />)}
                                {!isCreateGroup && <CreateGroup setIsCreateGroup={setIsCreateGroup} />}
                                <button onClick={e => setIsCreateGroup(v => !v)} className='createGroup-btn'>Create a new group</button>
                            </ul>
                        </div>
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
                    {userId.friends?.map((friendId) => <Friend key={friendId}
                        friendId={friendId}
                        friendImage={friendImg} />)}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;