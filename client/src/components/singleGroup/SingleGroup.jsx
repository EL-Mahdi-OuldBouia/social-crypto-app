import React, { useEffect, useState } from 'react';
import './singleGroup.css';
import { Buffer } from 'buffer';
import { useDispatch } from 'react-redux';
import { currentGroupActions } from '../../store/currentGroup-slice';
import { showGroupActions } from '../../store/showGroup-slice';



const SingleGroup = ({ groupImage, groupId, showGroups }) => {
    const dispatch = useDispatch();
    const [group, setGroup] = useState({
        admin: '',
        groupName: '',
        groupPicture: '',
        members: []
    });

    const setCurrentGroup = () => {
        dispatch(currentGroupActions.setCurrentGroup(group));
        dispatch(showGroupActions.setShowGroup());
    }

    useEffect(() => {
        const getGroup = async () => {
            await fetch('/groups/group/' + groupId, {
                method: 'GET'
            })
                .then((res) => {
                    res.json().then((data) => {
                        setGroup({
                            groupId: groupId,
                            admin: data.admin,
                            groupName: data.groupName,
                            groupPicture: (data.groupPicture.data ? Buffer.from(data.groupPicture.data).toString('base64') : ""),
                            members: data.members,
                            messages: data.messages,
                        });
                        console.log('group:', group);
                    })
                })
        }
        getGroup();
    }, [showGroups])

    return (
        <div className="sgrp" onClick={setCurrentGroup}>
            <li>
                <img src={group.groupPicture === "" ? groupImage : `data:image/png;base64,${group.groupPicture}`} className="grp-image" alt="" />
                <span className='groupName'>{group.groupName}</span>
            </li>
        </div>
    )
}

export default SingleGroup;