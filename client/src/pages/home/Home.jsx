import './home.css';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import GroupContainer from '../../components/groupContainer/GroupContainer';
import { useSelector } from 'react-redux';

const Home = () => {
  const showGroup = useSelector(state => state.showGroup.showGroup)




  return (
    <div className='home-container'>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
      {showGroup && <GroupContainer />}
    </div>

  )
}
export default Home;