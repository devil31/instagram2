import { combineReducers } from "redux";
import Auth from '../reducer/Auth';
import { Post } from "./Post";
import ChanUserData from './ChangeUserData'

const rootReducer = combineReducers({
 Auth,
 Post,
 ChanUserData,
 
})

export default rootReducer;