import './home.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import axios from 'axios';


const Home = () => {
  const [currentUser, setCurrentUser] = useState({});
  const userId = useSelector(state => state.user.user);
  console.log('the userId from Home', userId.data.userId);
  useEffect(() => {
    const getUser = async () => {
      await axios.get('/users/' + userId.data.userId)
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.log('An error was occured in gettig user in home', err);
        })
    };
    getUser();
  }, [userId.data.userId])
  return (
    <div>
      <Topbar currentUser={currentUser} />
      <div className="container">
        <Sidebar currentUser={currentUser} />
        <Feed currentUser={currentUser} />
        <Rightbar currentUser={currentUser} />
      </div>
    </div>
  )
}
export default Home;