import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../store/action/authAction';
import { Link } from 'react-router-dom';
import { LOGOUT, SET_LOADER, SET_MESSAGE, CLOSE_LOADER, REMOVE_MESSAGE } from '../store/types/Types';
import { fetchParties } from '../store/action/partiesAction';
import './style.css'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();


    const { loading, user, users, message, token, redirect } = useSelector(state => state.authReducer);
    const { parties } = useSelector(state => state.PartiesReducer);

    const dispatch = useDispatch();

    // console.log(users)
    console.log(user)


    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchParties());
    }, []);

    const logOut = () => {
        localStorage.removeItem('myToken');
        dispatch({ type: LOGOUT })
    }

    const updateVoteas = async (id, vote) => {
        dispatch({ type: SET_LOADER });
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const {
                data: { msg },
            } = await axios.post(`/api/voteUpdate/${id}`, { vote: vote + 1 }, config);
            dispatch(fetchParties());
            dispatch({ type: SET_MESSAGE, payload: msg });
            //  window.location.reload('/users')
        } catch (error) {
            dispatch({ type: CLOSE_LOADER });
            console.log(error);
        }
    };

    const updateUser = async (id) => {
        dispatch({ type: SET_LOADER });
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const {
                data: { msg },
            } = await axios.post(`/api/votestatus/${id}`, { voteStatus: "true" }, config);
            dispatch(fetchParties());
            dispatch({ type: SET_MESSAGE, payload: msg });
            //  window.location.reload('/users')
        } catch (error) {
            dispatch({ type: CLOSE_LOADER });
            console.log(error);
        }
    };

    useEffect(() => {
        if (redirect) {
            navigate(`/dashboard`)
        }
        if (message) {
            toast.success(message);
            dispatch({ type: REMOVE_MESSAGE });
            window.location.reload(`/dashboard`)
        }
    }, [message]);


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
            <div className="col-md-8 offset-md-2 p-5">

                <div className="row">
                    <div className="col-md-3">
                        <div className="profile-card">
                            <img src="/images/user.jpg" alt="" />
                            <h5>{user.name}</h5>
                            <p>{user.email}</p>
                            <p>{user.address}</p>
                            <p>{user.dob}</p>
                            <p>{user.cno}</p>
                            <h6>
                                <Link to='/' id="alink" onClick={logOut} >Logout</Link>
                            </h6>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="partiescard">
                            {parties && parties.map(p => {
                                return users && users.map(u => {
                                    if (u.voteStatus === "false") {
                                        return <div key={p._id} className="pcard">
                                            <div >
                                                <img src={`/${p.image}`} alt="" />
                                                <h4>{p.title}</h4>
                                                <h5>Number of Vote: {p.vote}</h5>
                                                <button className='btn btn-primary'
                                                    onClick={() => {
                                                        updateVoteas(p._id, p.vote);
                                                        updateUser(user._id)
                                                    }}  >Vote</button>
                                            </div>
                                        </div>
                                    }
                                    else return <div key={p._id} className="pcard">
                                        <div >
                                            <img src={`/${p.image}`} alt="" />
                                            <h4>{p.title}</h4>
                                            <h5>Number of Vote: {p.vote}</h5>
                                            <button className='btn btn-primary'
                                                disabled  >Vote</button>
                                        </div>
                                    </div>
                                })
                            }
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
