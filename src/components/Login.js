import { useState } from 'react';
import './login.scss';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    return (
        <div className="login-container col-12 col-sm-12  col-md-8 col-lg-4 ">
            <div className="title">Login</div>
            <div className="text">Email or username</div>
            <input
                className="input"
                type="text"
                placeholder="Email or username..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div className="input-password">
                <input
                    type={isShowPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <i
                    className={isShowPassword ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                ></i>
            </div>
            <button className={email && password ? 'active' : null} disabled={email && password ? false : true}>
                Login
            </button>
            <div className="back">
                <i className="fa-solid fa-chevron-left"></i>Go back
            </div>
        </div>
    );
}

export default Login;
