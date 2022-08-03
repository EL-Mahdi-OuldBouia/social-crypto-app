import React, { useEffect, useState } from 'react';
import './singleGroup.css';
import { Buffer } from 'buffer';
import GroupMember from '../groupMember/GroupMember';



const SingleGroup = ({ groupImage, groupId, showGroups }) => {
    const [group, setGroup] = useState({
        admin: '',
        groupName: '',
        groupPicture: '',
        members: []
    });
    useEffect(() => {
        const getGroup = async () => {
            await fetch('/groups/group/' + groupId, {
                method: 'GET'
            })
                .then((res) => {
                    res.json().then((data) => {
                        setGroup({
                            admin: data.admin,
                            groupName: data.groupName,
                            groupPicture: Buffer.from(data.groupPicture.data).toString('base64'),
                            members: data.members
                        });
                        console.log('group:', group);
                    })
                })
        }
        getGroup();
    }, [showGroups])

    return (
        <div className="sgrp">
            <li>
                <img src={group.groupPicture === "" ? groupImage : `data:image/png;base64,${group.groupPicture}`} className="grp-image" alt="" />
                <span className='groupName'>{group.groupName}</span>
                {/* <div className="group-members">
                    {group.members.map((member) => <GroupMember key={member}
                        member={member} />)}
                </div> */}
            </li>
        </div>
    )
}

export default SingleGroup;