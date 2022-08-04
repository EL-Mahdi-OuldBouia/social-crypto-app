import './topbar.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Person, Chat, Notifications } from '@mui/icons-material';
import { FaCamera } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ReqContainer from '../reqContainer/ReqContainer';
import MessagesContainer from '../messagesContainer/MessagesContainer';
import logo from '../../imgs/logot.png';
// import App2 from '../../imgs/app2.png';
import FriendshipRequests from '../friendshipRequests/FriendshipRequests'
import RecievedMessages from '../recievedMessages/RecievedMessages';
import ChatC from '../chat/Chat';
import axios from 'axios';
import { getMessagesActions } from '../../store/getMessages-slice';
import { currentCoverPageActions } from '../../store/currentCoverPage-slice';


const Topbar = () => {
    const userId = useSelector(state => state.user.user);
    const [previewProfileImageURL, setPreviewProfileImageURL] = useState("");
    const [showProfileImagePreview, setShowProfileImagePreview] = useState(userId.userImage !== '');
    const getMessages = useSelector(state => state.getMessages.getMessages);
    const showHideChat = useSelector(state => state.showHideChat.showHide)
    const dispatch = useDispatch();
    const [friendsRequests, setFriendsRequests] = useState([]);
    const [showReq, setShowReq] = useState(false);
    const [showMsg, setshowMsg] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [getRequestMessages, setGetRequestMessages] = useState(false)





    const [allMessages, setAllMessages] = useState([]);
    // Getting all the messages from a single user
    useEffect(() => {
        const gettingAllMessages = () => {
            axios.get('/message/' + userId.userId)
                .then((res) => {
                    setAllMessages(res.data);
                })
                .catch((err) => {
                    console.log('error was occured while getting all messages: ', err);
                })
        }
        gettingAllMessages();
    }, [getMessages])

    useEffect(() => {
        const getFriendshipRequests = async () => {
            await axios.get('/users/' + userId.userId)
                .then((res) => {
                    setFriendsRequests(res.body.friendshipRequests);
                })
                .catch((err) => {
                    console.log('an error was occured in getting friendship requests', err)
                })
        }
        getFriendshipRequests();
    }, []);


    /////// Scroll position

    // const [scrollPosition, setScrollPosition] = useState(0);
    // const style = {
    //     filter: 'blur(0px)',
    // }
    // const handleScroll = () => {
    //     const position = window.pageYOffset;
    //     setScrollPosition(position);
    // };

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll, { passive: true });

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    // console.log('the scroll position is :', scrollPosition);



    // window Size

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


    const addProfileImage = async (e) => {

        console.log('there was a change in the file');
        e.preventDefault();
        setPreviewProfileImageURL(URL.createObjectURL(e.target.files[0]));
        setShowProfileImagePreview(true);
        const dataFile = new FormData();
        dataFile.append('userImage', e.target.files[0]);
        dataFile.append('change', 'profileImage')
        await axios.patch('/users/' + userId.userId, dataFile)
            .then((res) => {
                console.log("Image was uploaded successfully", res);
            })
            .catch((err) => {
                console.log('failed to upload profile image', err);
            })
    }



    return (
        <div className='topbarContainer' >
            <div className="topbarLeft">
                <span className="logo">
                    <Link to='/'>
                        <img src={logo} width='75' alt="" className='logoImgTopbar' />
                    </Link>
                </span>
                <span className='username'>Welcome <b>{userId?.username}</b></span>
            </div>

            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className='searchIcon' />
                    <input type="text"
                        placeholder='Seach for...'
                        className='searchInput' />
                </div>
            </div>

            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">
                        <Link to='/'>HOME</Link>
                    </span>
                    <span className="topbarLink">
                        <Link to='/profile' onClick={e => dispatch(currentCoverPageActions.setCurrentCoverPage(userId.userId))}>COVER</Link>
                    </span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem reqs">
                        <Person onClick={() => setShowReq(!showReq)} />
                        {!showReq &&
                            <ReqContainer Req={FriendshipRequests}
                                title={"New Connecting Requests"}
                            />}
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat onClick={() => {
                            setshowMsg(!showMsg);
                            dispatch(getMessagesActions.getMessagesFun())
                        }} />
                        {showHideChat && <div className="chatComponent"
                            style={{
                                bottom: "-" + (windowSize.height - 39) + "px",
                                right: "10px"
                            }}><ChatC setShowChat={setShowChat} /></div>}
                        {showMsg && <MessagesContainer Req={RecievedMessages}
                            setShowChat={setShowChat}
                            title={"New Messages"}
                            allMessages={allMessages}
                            getRequestMessages={getRequestMessages}
                        />}
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <div className="topbarImg">
                    {
                        !showProfileImagePreview ?
                            <div className="uploadProfileImage">
                                <div className="relativeInput">
                                    <FaCamera id="faCamera" />
                                    <input className="inputAbsolute"
                                        onChange={addProfileImage} type="file"
                                        name="profileImage" id="profileImage" />
                                </div>
                            </div> :
                            (userId.userImage === '' ?
                                <img src={previewProfileImageURL} alt="" width='40px' height='40px' />
                                :
                                <img src={`data:image/png;base64,${userId.userImage}`} width='40px' height='40px' alt="" />)
                    }
                </div>
            </div>
        </div>
    )
}

export default Topbar