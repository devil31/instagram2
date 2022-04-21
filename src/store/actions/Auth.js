import axios from "axios";
import { fetchPost } from "./Post";
export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const LOGOUT = 'LOGOUT';
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const GET_USERDATA = 'GET_USERDATA';



const key = 'AIzaSyC_cqI-a_-HO2tOPZ6uCAy-YFYDEMbqinQ';


export const signIn = (email, password, isSignup, username) => {

    return async dispatch => {
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`
        if (!isSignup) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`
        }

        dispatch(authStart())
        try {
            const data = await axios.post(url, {
                email,
                password,
                returnSecureToken: true,
            })
            if (isSignup) {
                await axios.post(`https://insta-c8df9-default-rtdb.europe-west1.firebasedatabase.app/user.json`, {
                    email,
                    username,
                    userId: data.data.localId,
                })
            }


            saveData(data.data.idToken, data.data.localId,)
           await dispatch(authSuccess(data.data))
        } catch (error) {
            dispatch(authFail(error))
            console.log(error)
        }
    }
}


export const getUserData = () => {
   
    return async dispatch => {
         
        try {
const responce = await axios.get(`https://insta-c8df9-default-rtdb.europe-west1.firebasedatabase.app/user.json`)

const responceList = [];
for(let key in responce.data){
    responceList.push({
        email:responce.data[key].email,
        userId:responce.data[key].userId,
        username:responce.data[key].username,
        saved:responce.data[key].saved,
        key
    })
}
     
dispatch({
            type:GET_USERDATA,
            userData:responceList,
        })   

} catch (error) {

        }
     
    }
}


export const authStart = () => {
    return {
        type: AUTH_START,
    }
}
export const authSuccess = (data) => {

    return {
        type: AUTH_SUCCESS,
        token: data.idToken,
        userId: data.localId,
    }
}

export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error,
    }
}

export const Logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    return {
        type: LOGOUT,
    }
}

export const authCheck = () => {
    return dispatch => {
        const token = localStorage.getItem('token');

        if (!token) {
            return
        }
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess({
            idToken: token,
            userId: userId,
        }))
    }
}
const saveData = (token, userId) => {
    localStorage.setItem('token', JSON.stringify({ token }))
    localStorage.setItem('userId', JSON.stringify({ userId }))
}