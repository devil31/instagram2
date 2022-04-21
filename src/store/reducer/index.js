import { combineReducers } from "redux";
import Auth from '../reducer/Auth';
import { Post } from "./Post";

const rootReducer = combineReducers({
 Auth,
 Post,
})

export default rootReducer;