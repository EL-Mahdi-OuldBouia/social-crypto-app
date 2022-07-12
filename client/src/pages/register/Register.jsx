import './register.css';
import logo from '../../imgs/logot.png';
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/user-slice';
import axios from 'axios';


// const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


const Register = () => {
    const [nav, setNav] = useState(false);
    const [info, setInfo] = useState({});
    const [users, setUsers] = useState([]);
    const [condition, setCondition] = useState({});
    const [goToProfile, setGoToProfile] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        const getAllUsers = async () => {
            await axios.get('/users/')
                .then((res) => {
                    console.log('all the users', res.data);
                    setUsers([...res.data]);
                    setInfo({ ...info, userId: res.data.length });
                    const isUsername = users.filter((user) => user.username === info.username);
                    const isEmail = users.filter((user) => user.email === info.email);
                    setCondition({
                        email: (isEmail.length > 0),
                        username: (isUsername.length > 0),
                        passMatch: (info.password1 === info.password2)
                    });
                })
                .catch((err) =>
                    console.log('An error was occured', err))
        };
        getAllUsers();
    }, []);
    const registerHandler = async (e) => {
        e.preventDefault();
        console.log('isEmail', condition.email, 'isUsername', condition.username);
        var newUser = {};
        if (!condition.username && !(condition.email) && condition.passMatch) {
            const { userId, username, email, password } = info;
            newUser = { userId, username, email, password }

            await axios.post('/auth/register', newUser)
                .then((res) => {
                    console.log('response from register route', res);
                    dispatch(userActions.saveUser(res.data));
                    console.log('the status of the response', res.status)
                    if (res.status === 200) {
                        setGoToProfile(true);
                    }
                })
                .catch((err) => {
                    console.log('An error was occured', err);
                });
            console.log('the data you have entered is from if', newUser)

        } else {
            console.log('the info you have added are :', condition);
        }

    }
    const userId = useSelector(state => state.user.user);

    const printUserId = () => {
        console.log('the user id is :', userId);
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">
                        <img src={logo} width='75' alt="" className='loginLogoImg' />
                    </h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on <b>JSIt</b>.
                    </span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <form action="">
                            <input type='text' placeholder="Username"
                                className="loginInput" onChange={(e) => setInfo({ ...info, username: e.target.value })} />
                            <input type='email' placeholder="Email"
                                className="loginInput" onChange={(e) => setInfo({ ...info, email: e.target.value })} />
                            <input type='password' placeholder="Password"
                                className="loginInput" onChange={(e) => setInfo({ ...info, password: e.target.value })} />
                            <input type='password' placeholder="Password Again"
                                className="loginInput" onChange={(e) => setInfo({ ...info, password2: e.target.value })} />
                            <button className="loginButton" onClick={registerHandler}>Sign Up{(goToProfile && <Navigate to='/' />)}</button>
                            <button className="loginRegisterButton" onClick={() => setNav(true)}>
                                Log into Account{(nav && <Navigate to='/login' />)}
                            </button>
                        </form>
                        <button onClick={printUserId}>click me</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register