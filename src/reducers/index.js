import {combineReducers} from 'redux';
import {credsReducer, flagReducer} from './LoginReducer';

export default combineReducers({
    userInfo: credsReducer,
    isLogged: flagReducer
})