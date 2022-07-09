import './topbar.css';
import logo from '../../imgs/logot.png';
import App2 from '../../imgs/app2.png';
import { Search, Person, Chat, Notifications } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Topbar = () => {
    return (
        <div className='topbarContainer'>
            <div className="topbarLeft">
                <span className="logo">
                    <Link to='/'>
                        <img src={logo} width='75' alt="" className='logoImgTopbar'/>
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
                        Homepage
                    </span>
                    <span className="topbarLink">
                        Timeline
                    </span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
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