import './register.css';
import logo from '../../imgs/logot.png';


const Register = () => {
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
                        <input type='text' placeholder="Username" className="loginInput" />
                        <input type='email' placeholder="Email" className="loginInput" />
                        <input type='password' placeholder="Password" className="loginInput" />
                        <input type='password' placeholder="Password Again" className="loginInput" />
                        <button className="loginButton">Sign Up</button>
                        <button className="loginRegisterButton">
                            Log into Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register