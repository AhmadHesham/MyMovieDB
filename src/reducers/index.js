import {combineReducers} from 'redux';
import {credsReducer, flagReducer} from './LoginReducer';
import {favoritesReducer} from './UserReducer'

export default combineReducers({
    userInfo: credsReducer,
    isLogged: flagReducer,
    favorites: favoritesReducer
})