
import { useSelector } from "react-redux"

export const myUserName = ()=>{
const myUserData = useSelector(state => state.Auth.userData)
const myId = JSON.parse(localStorage.getItem('userId')).userId
const findUser = myUserData.find(e => e.userId == myId)

const myUsername = findUser && findUser.username
}
 

