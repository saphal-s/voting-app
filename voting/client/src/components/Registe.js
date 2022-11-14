import { useState, useEffect } from 'react';
import './style.css';
import { Tabs } from 'antd';
import toast, { Toaster } from 'react-hot-toast';
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';
import { postRegister } from './store/action/authAction';
import { REMOVE_MESSAGE } from './store/types/Types';


const Register = () => {

    const [state, setState] = useState({
        name: '',
        email: '',
        address: '',
        dob: '',
        cno: '',
        password: '',
        avatar: []
    });

    const [currentImage, setCurrentImage] = useState('Choose Image')
    const [imagePreview, setImagePreview] = useState()


    const { registerErrors, user, message } = useSelector(
        (state) => state.authReducer
    );

    const flieHandle = (e) => {
        if (e.target.files.length !== 0) {
            setCurrentImage(e.target.files[0].name)
            setState({
                ...state,
                [e.target.name]: e.target.files[0],
            })
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            }
            reader.readAsDataURL(e.target.files[0])
        }
    };

    const dispatch = useDispatch();

    const handleInputs = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };


    const createRegister = e => {
        e.preventDefault();
        const { name, email,
            password, dob, avatar, cno, address } = state;
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('dob', dob);
        formData.append('cno', cno);
        formData.append('address', address);
        formData.append('avatar', avatar);
        dispatch(postRegister(formData));
    }

    useEffect(() => {
        if (registerErrors.length > 0) {
            toast.error("Register faild !");
        }
        if (message) {
            toast.success(message);
            dispatch({ type: REMOVE_MESSAGE });
            setState(
                {
                    name: '',
                    email: '',
                    address: '',
                    password: '',
                    dob: '',
                    cno: '',
                    avatar: []
                }
            );
            setCurrentImage('Choose Image');
            setImagePreview();
        }
    }, [registerErrors, user, message, dispatch]);

    console.log(state.avatar)

    return (
        <div>
            <div className="register col-md-6 offset-md-3">
                <Toaster
                    position='top-right'
                    reverseOrder={false}
                    toastOptions={{
                        style: {
                            fontSize: '14px',
                        },
                    }}
                />
                <div className="login text-center pt-3 pb-5">
                    <div className="login-from">
                        <div id="login-form-wrap">

                            <Tabs defaultActiveKey="1">
                                <Tabs.TabPane tab="Register" key="1">
                                    <form id="login-form" onSubmit={createRegister} >
                                        <p className='pb-3 pt-3'>
                                            <input
                                                type="text"
                                                id="username"
                                                name="name"
                                                placeholder="Enter your full name"
                                                value={state.name}
                                                onChange={handleInputs}
                                                required
                                            />
                                        </p>
                                        <p className='pb-3'>
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                placeholder="Enter address"
                                                value={state.address}
                                                onChange={handleInputs}
                                                required
                                            />
                                        </p>
                                        <p className='pb-3'>
                                            <input
                                                type="date"
                                                id="dob"
                                                name="dob"
                                                placeholder="Enter Date of Birth"
                                                value={state.dob}
                                                onChange={handleInputs}
                                                required
                                            />
                                        </p>
                                        <p className='pb-3'>
                                            <input
                                                type="text"
                                                id="cno"
                                                name="cno"
                                                placeholder="National Identity Number"
                                                value={state.cno}
                                                onChange={handleInputs}
                                                required
                                            />
                                        </p>
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
                                        <div className="mb-3">
                                            <label className="form-label">Image (pp size photo): </label>
                                            <input type="file" className="form-control" aria-describedby="emailHelp"
                                                id="avatar"
                                                name="avatar"
                                                onChange={flieHandle}
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <div className="product-slug pt-2">
                                                <div className="mb-3">
                                                    {
                                                        imagePreview ? <img src={imagePreview} alt='logo' className="w-100" /> : (
                                                            <img src={currentImage} alt='logo' className="w-100" />
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                        <p className='pb-3'>
                                            <input type="submit" id="login" defaultValue="Login" />
                                        </p>
                                    </form>
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Login" key="2">
                                    <Login />
                                </Tabs.TabPane>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
