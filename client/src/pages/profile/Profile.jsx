import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './profile.css';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import coverImg from '../../imgs/logo.png';
import { Buffer } from 'buffer';


const Profile = () => {
    const userId = useSelector(state => state.user.user);
    const friendId = useSelector(state => state.currentCoverPage.currentCoverPage);
    const [coverPageCurrentUser, setCoverPageCurrentUser] = useState({});
    const [isFriend, setIsFriend] = useState(false);

    useEffect(() => {
        const getUserCoverPage = async () => {
            await fetch('/users/' + friendId, {
                method: 'GET'
            })
                .then((res) => {
                    res.json().then((data) => {
                        console.log('the data oc the current cover page user', data);
                        setCoverPageCurrentUser({
                            userId: data.userId,
                            username: data.username,
                            userImage: (Object.keys(data).includes('profilePicture') ? Buffer.from(data.profilePicture.data).toString("base64") : ""),
                            userCoverImage: (Object.keys(data).includes('coverPicture') ? Buffer.from(data.coverPicture.data).toString("base64") : ""),
                            friends:data.friends
                        });
                    })
                })

        }
        if (friendId !== userId.userId && friendId !== "") {
            getUserCoverPage();
            if (JSON.stringify(coverPageCurrentUser) !== "{}") {
                setIsFriend((coverPageCurrentUser.friends.filter((friend) => friend === userId.userId)).length > 0)
                console.log('the value of isFriend', isFriend);
            }
        }
    }, [friendId, userId]);
    if (friendId === userId.userId) {
        return (
            <>
                <Topbar />
                <div className="profile">
                    <Sidebar />
                    <div className="profileRight">
                        <div className="profileRightTop">
                            <div className="profileCover">
                                {(userId.userCoverImage === "") ?
                                    <img
                                        className="profileCoverImg"
                                        src={coverImg}
                                        alt=""
                                    /> :
                                    <img
                                        src={`data:image/png;base64,${userId.userImage}`}
                                        alt="" className="profileUserImg"
                                    />
                                }
                                {(userId.userImage) === "" ?
                                    <img
                                        className="profileUserImg"
                                        src={coverImg}
                                        alt=""
                                    /> :
                                    <img
                                        src={`data:image/png;base64,${userId.userImage}`}
                                        className="profileUserImg" alt=""
                                    />}
                                <div className="profileInfo">
                                    <h4 className="profileInfoName">{userId.username}</h4>
                                    <span className="profileInfoDesc">What a Good Day!</span>
                                </div>
                                {!isFriend && <div className="profileInfoLeft">
                                    <span>Add <b>{userId.username.toUpperCase()}</b> as a Friend</span>
                                    <button className="addFriendButton" >ADD</button>
                                </div>}
                            </div>
                        </div>
                        <div className='space'></div>
                        <div className="profileRightBottom">
                            <Feed />
                            <Rightbar profile />
                        </div>
                    </div>
                </div>
            </>
        )
    }


    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            {(coverPageCurrentUser?.userCoverImage === "") ?
                                <img
                                    className="profileCoverImg"
                                    src={coverImg}
                                    alt=""
                                /> :
                                <img
                                    src={`data:image/png;base64,${userId.userImage}`}
                                    alt="" className="profileUserImg"
                                />
                            }
                            {(coverPageCurrentUser?.userImage) === "" ?
                                <img
                                    className="profileUserImg"
                                    src={coverImg}
                                    alt=""
                                /> :
                                <img
                                    src={`data:image/png;base64,${coverPageCurrentUser.userImage}`}
                                    className="profileUserImg" alt=""
                                />}
                            <div className="profileInfo">
                                <h4 className="profileInfoName">{coverPageCurrentUser?.username}</h4>
                                <span className="profileInfoDesc">What a Good Day!</span>
                            </div>
                            {!isFriend && <div className="profileInfoLeft">
                                <span>Add <b>{ }</b> as a Friend</span>
                                <button className="addFriendButton" >ADD</button>
                            </div>}
                        </div>
                    </div>
                    <div className='space'></div>
                    <div className="profileRightBottom">
                        <Feed />
                        <Rightbar profile cover />
                    </div>
                </div>
            </div>
        </>
    )

}

export default Profile