import { useContext, useEffect, useState } from 'react';
import { loginApi } from '../services/userService';
import './login.scss';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UsersContext';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loaddingApi, setLoaddingApi] = useState(false);

    const { loginContext } = useContext(UserContext);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('Email/Password is required!');
            return;
        }
        setLoaddingApi(true);
        let res = await loginApi(email, password);
        if (res && res.token) {
            loginContext(email, res.token);
            navigate('/');
        } else {
            // error
            if (res && res.status === 400) {
                toast.error(res.data.error);
            }
        }
        setLoaddingApi(false);
        console.log('>>> check login: ', res);
    };
    return (
        <div className="login-container col-12 col-sm-12  col-md-8 col-lg-4 ">
            <div className="title">Login</div>
            <div className="text">
                Email or username (<span>eve.holt@reqres.in</span>)
            </div>
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
            <button
                className={email && password ? 'active' : null}
                disabled={email && password ? false : true}
                onClick={() => handleLogin()}
            >
                Login &nbsp;
                {loaddingApi && <i className="fas fa-spinner fa-pulse"></i>}
            </button>
            <div
                className="back"
                onClick={() => {
                    navigate('/');
                }}
            >
                <i className="fa-solid fa-chevron-left"></i>Go back
            </div>
        </div>
    );
}

export default Login;
