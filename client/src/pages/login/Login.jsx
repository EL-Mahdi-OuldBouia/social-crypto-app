import './login.css';
import logo from '../../imgs/logot.png';

import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

// GET the user Id and send it 
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/user-slice';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nav, setNav] = useState(false);
    var userId = useSelector(state => state.user.user)
    const dispatch = useDispatch();

    const fetchUser = async () => {
        console.log('email', email, 'password', password);
        await axios.post('/auth/login', {
            email: email,
            password: password
        })
            .then((res) => {
                dispatch(userActions.saveUser(res))
                console.log("the body in response", res);
                console.log("the user Id afer dispatch", userId);
                if (JSON.stringify(res) !== '{}') {

                    setNav(true)
                }
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