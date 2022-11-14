import axios from 'axios'

import {
    SET_LOADER,
    CLOSE_LOADER,
    SET_TOKEN,
    LOGIN_ERRORS,
    REGISTER_ERRORS,
    SET_MESSAGE,
    SET_USERS
} from '../types/Types'


export const postRegister = (postData) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        dispatch({ type: SET_LOADER });
        try {
            const { data } = await axios.post('/api/register', postData, config);
            dispatch({ type: CLOSE_LOADER });
            localStorage.setItem('myToken', data.token);
            dispatch({ type: SET_TOKEN, payload: data.token });
            dispatch({ type: SET_MESSAGE, payload: data.msg })
        } catch (error) {
            dispatch({ type: CLOSE_LOADER });
            dispatch({
                type: REGISTER_ERRORS,
                payload: error.response.data.errors,
            });
        }
    };
};

export const postLogin = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            dispatch({ type: SET_LOADER });
            const { data } = await axios.post('/api/login', state, config);
            dispatch({ type: CLOSE_LOADER })
            localStorage.setItem('myToken', data.token)
            dispatch({ type: SET_TOKEN, payload: data.token })
            dispatch({ type: SET_MESSAGE, payload: data.msg })
        } catch (error) {
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: LOGIN_ERRORS, payload: error.response.data.errors })
            console.log(error.response)
        }
    }
}


export const fetchUsers = () => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADER });
        try {
            const { data: { response } } = await axios.get('/api/users');
            // console.log(data)
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: SET_USERS, payload: { response } })
            // console.log(response)
        } catch (error) {
            dispatch({ type: CLOSE_LOADER });
        }
    }
}