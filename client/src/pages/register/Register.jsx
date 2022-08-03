import './register.css';
import logo from '../../imgs/logot.png';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/user-slice';
import axios from 'axios';


// const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


const Register = () => {
    const [nav, setNav] = useState(false);
    const [info, setInfo] = useState({});
    const [goToProfile, setGoToProfile] = useState(false);
    const [responseInfo, setResponseInfo] = useState({});
    const [focusValues, setFocusValues] = useState({
        username: "false",
        email: "false",
        password: "false",
        confirmPassword: "false"
    });
    const dispatch = useDispatch();

    const registerHandler = async (e) => {
        e.preventDefault();
        const usernameValidation = /^[a-zA-Z0-9]{3,20}$/.test(info.username);
        const emailValidation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(info.email);
        const passwordValidation = info.password === info.confirmPassword;
        const { username, email, password } = info;
        var newUser = { username, email, password };
        if (usernameValidation && emailValidation && passwordValidation) {

            await axios.post('/auth/register', newUser)
                .then((res) => {
                    dispatch(userActions.saveUser(res.data));
                    if (res.status === 200) {
                        setGoToProfile(true);
                    }
                })
                .catch((err) => {
                    setResponseInfo(err.response.data);
                    console.log('An error was occured', err.response.data);
                });
            console.log('the data you have entered is from if', newUser)

        } else {
            console.log('Please rectify your data, the info you have added are :', info);
        }

    }

    const changeResponseInfo = () => {
        setResponseInfo({});
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
                        <h2>Register:</h2>
                        <form action="">
                            <input required pattern="^[a-zA-Z0-9]{3,20}$" type='text'
                                placeholder="Username" name="username" className="loginInput" id="i1"
                                onBlur={e => setFocusValues(focusValues => ({ ...focusValues, [e.target.name]: "true" }))}
                                focus={focusValues.username}
                                onFocus={changeResponseInfo}
                                onChange={(e) => setInfo({ ...info, [e.target.name]: e.target.value })} />

                            {Object.keys(responseInfo).includes("usernameExists") && <p>{responseInfo?.usernameExists}</p>}
                            <span id="s1">username must be between 6-20 characters not containing special characters nor spaces</span>

                            <input required pattern="^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$"
                                type='email' placeholder="Email" name="email" className="loginInput" id="i2"
                                onBlur={e => setFocusValues(focusValues => ({ ...focusValues, [e.target.name]: "true" }))}
                                focus={focusValues.email}
                                onFocus={changeResponseInfo}
                                onChange={(e) => setInfo({ ...info, [e.target.name]: e.target.value })} />
                            {Object.keys(responseInfo).includes("emailExists") && <p>{responseInfo?.emailExists}</p>}

                            <span id="s2">please write valid email</span>

                            <input required pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                                type='text' placeholder="Password" name="password" className="loginInput" id="i3"
                                onBlur={e => setFocusValues(focusValues => ({ ...focusValues, [e.target.name]: "true" }))}
                                focus={focusValues.password}
                                onChange={(e) => setInfo({ ...info, [e.target.name]: e.target.value })} />

                            <span id="s3">password must be at least 8 characters, containing at least 1 number and 1 special character</span>

                            <input required pattern={`^${info.password}$`} className="loginInput" id="i4"
                                type='text' placeholder="Password Again" name="confirmPassword"
                                onBlur={e => setFocusValues(focusValues => ({ ...focusValues, [e.target.name]: "true" }))}
                                focus={focusValues.confirmPassword}
                                onChange={(e) => setInfo({ ...info, [e.target.name]: e.target.value })} />

                            <span id="s4">passwords must match</span>

                            <div className="btn-align">
                                <button type='submit' className="registerButton"
                                    onClick={registerHandler}>
                                    Sign Up{(goToProfile && <Navigate to='/' />)}
                                </button>
                                <button className="loginRegisterButton"
                                    onClick={() => setNav(true)}>
                                    Sign In{(nav && <Navigate to='/login' />)}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register