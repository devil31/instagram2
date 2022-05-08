import axios from "axios";
import { useDispatch } from "react-redux";
import { getUserData } from "./Auth";
import { fetchPost } from "./Post";
export const UPDATE_USERDATASTART = 'UPDATE_USERDATASTART';
export const UPDATE_USERDATASUCCESS = 'UPDATE_USERDATASUCCESS';
export const UPDATE_USERDATAFAIL = 'UPDATE_USERDATAFAIL';
export const CHANGE_IMAGEPROFILE = 'CHANGE_IMAGEPROFILE';
export const CHANGE_IMAGEPROFILESTART = 'CHANGE_IMAGEPROFILESTART';
export const CHANGE_IMAGEFAILE = 'CHANGE_IMAGEFAILE';

export const updateUserData = (name, email, numb, selectedOption,myUserKey,loadImg,) => {
    return async dispatch => {
        await console.log(myUserKey)
        dispatch(updateUserDataStart())
        try {
            const result = await axios.patch(`https://inst-4237b-default-rtdb.firebaseio.com/user/${myUserKey}/.json`, {
                username: name,
                email: email,
                numb: numb,
                gender: selectedOption,
                profileImg: loadImg,
            })
         
            console.log(result)
            await dispatch(updateUserDataSuccess(result))
        } catch (error) {
            console.log(error)
        }
    }
}

export const changeImageProfile = (myUserKey,loadImg)=>{
  return async dispatch =>{

  dispatch(changeImageProfileStart())
      try {
      const result =  await axios.patch(`https://inst-4237b-default-rtdb.firebaseio.com/user/${myUserKey}/.json`,{
              profileImg:loadImg,
          })

          dispatch({
              type:CHANGE_IMAGEPROFILE,
              changeImg : result,
          })
          dispatch(fetchPost())
          dispatch(getUserData())
      } catch (error) {
          dispatch(changeImageFaile(error))
      }
  }
}


export const updateUserDataStart = () => {
    return {
        type: UPDATE_USERDATASTART,
    }
}
export const updateUserDataSuccess = (data) => {
    return {
        type: UPDATE_USERDATASUCCESS,
        updated: data
    }
}

export const changeImageProfileStart = ()=>{
    return{
        type:CHANGE_IMAGEPROFILESTART,
    }
}
export const changeImageFaile = (error)=>{
    return{
        type:CHANGE_IMAGEFAILE,
        error:error
    }
}