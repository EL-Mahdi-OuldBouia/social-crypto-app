import './login.css';
import logo from '../../imgs/logot.png';

import React, { useState } from 'react';
import { Buffer } from 'buffer';
import { Navigate } from 'react-router-dom';

// GET the user Id and send it 
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/user-slice';
import { currentCoverPageActions } from '../../store/currentCoverPage-slice';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nav, setNav] = useState(false);
    const dispatch = useDispatch();

    const fetchUser = async () => {
        await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then((res) => {

                res.json().then((data) => {
                    console.log('data in login after json() function', data);
                    dispatch(userActions.saveUser({
                        userId: data._id,
                        username: data.username,
                        userImage: (Object.keys(data).includes('profilePicture') ? Buffer.from(data.profilePicture.data).toString("base64") : ""),
                        userCoverImage: (Object.keys(data).includes('coverPicture') ? Buffer.from(data.coverPicture.data).toString("base64") : ""),
                        friends: data.friends,
                        friendshipRequests: data.friendshipRequests,
                        groups: data.groups
                    })
                    )
                    dispatch(currentCoverPageActions.setCurrentCoverPage(data._id))
                    if (JSON.stringify(data) !== '{}') {
                        setNav(true)
                    }
                })
            })
            .catch((err) => {
                console.log('An error occured in login', err.message);
            })
    }


    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">
                        <img src={logo} width='75' alt="" className='loginLogoImg' />
                    </h3>
                    <span className="loginDesc">
                        Connect with friends all over the world on <b>JSiT</b> .
                    </span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input type='email'
                            placeholder="Email"
                            className="loginInput"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input type='password'
                            placeholder="Password"
                            className="loginInput"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="loginButton" onClick={fetchUser}>Log In{(nav && <Navigate to='/' />)}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">
                            Create a New Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login