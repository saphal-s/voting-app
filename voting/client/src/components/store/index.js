import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from './reducer/authReducer';
import { PartiesReducer } from './reducer/partiesReducer';


const rootReducers = combineReducers({
    authReducer,
    PartiesReducer
})
const middlewares = [thunkMiddleware];
const Store = createStore(rootReducers, composeWithDevTools(applyMiddleware(...middlewares)))
export default Store