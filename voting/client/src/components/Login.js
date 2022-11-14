import { useState, useEffect } from 'react';
import './style.css';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { REMOVE_MESSAGE } from './store/types/Types';
import { postLogin } from './store/action/authAction';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loginErrors, message, user } = useSelector(state => state.authReducer)

    const [state, setState] = useState({
        email: '',
        password: '',
    });


    const handleInputs = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const userLogin = (e) => {
        e.preventDefault();
        dispatch(postLogin(state))
    }

    useEffect(() => {
        if (loginErrors.length > 0) {
            toast.error("Login faild !");
        }
        if (message) {
            toast.success(message);
            dispatch({ type: REMOVE_MESSAGE });
            setState(
                {
                    email: '',
                    password: '',
                }
            );
        }
        if (user.userType === "user") {
            navigate('/dashboard')
        }
        // console.log(user.userType)
    }, [loginErrors, dispatch, message]);

    return (
        <div>
            <Toaster
                position='top-right'
                reverseOrder={false}
                toastOptions={{
                    style: {
                        fontSize: '14px',
                    },
                }}
            />
            <form id="login-form" onSubmit={userLogin}>
                <p className='pb-3'>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email Address"
                        value={state.email}
                        onChange={handleInputs}
                        required
                    />
                </p>
                <p className='pb-3'>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={handleInputs}
                        required
                    />
                    <span style={{ color: '#ccc', fontSize: '14px' }}>Enter the password between 6 to 14 character long</span>
                </p>
                <p className='pb-3'>
                    <input type="submit" id="login" defaultValue="Login" />
                </p>
            </form>
        </div>
    )
}

export default Login
