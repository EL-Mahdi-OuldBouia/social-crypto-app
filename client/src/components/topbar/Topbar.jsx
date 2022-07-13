import './topbar.css';
import { useState } from 'react';
import logo from '../../imgs/logot.png';
import App2 from '../../imgs/app2.png';
import ReqContainer from '../reqContainer/ReqContainer';
import { Search, Person, Chat, Notifications } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Topbar = () => {
    const userId = useSelector(state => state.user.user);
    const [requests, setRequests] = useState([]);
    const getRequests = async () => {
        await axios.get('/users/' + userId.userId)
            .then((res) => {
                console.log('the friendship requests are :', res.data);
                setRequests(res.data);
            })
            .catch((err) => {
                console.log('an error was occured in getting friendship requests', err)
            })
    }
    const [showReq, setShowReq] = useState(false);
    return (
        <div className='topbarContainer'>
            <div className="topbarLeft">
                <span className="logo">
                    <Link to='/'>
                        <img src={logo} width='75' alt="" className='logoImgTopbar' />
                    </Link>
                </span>
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
                        <Link to='/profile'>COVER</Link>
                    </span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem reqs">
                        <Person onClick={() => setShowReq(!showReq)} />
                        {!showReq &&<ReqContainer/>}
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <div className="topbarImg">
                    <img src={App2} width='40px' height='40px' alt="" />
                </div>
            </div>
        </div>
    )
}

export default Topbar