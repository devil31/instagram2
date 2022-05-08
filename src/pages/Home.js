import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { fetchPost } from '../store/actions/Post'
import Post from '../components/Post'
import { getUserData } from '../store/actions/Auth'



function Home() {
  const dispatch = useDispatch()
 
  useEffect(()=>{
   dispatch(fetchPost())
   dispatch(getUserData())
},[])


 const userData = useSelector(state=>state.Auth.userData)
 
 
  const renderPost = useSelector(state=>state.Post.fetchDataPost)
 
 
  const render = renderPost.map(i=><Post key={i.key} loadImg={i.loadImg} username={i.username} fullDate={i.date} postId={i.key} comments={i.comments} profileImg={i.profileimg}/>)
 
  return (
<div style={{ marginTop: '200px', display: 'flex', alignItems: 'center', flexDirection: 'column' }} >
  <Header/>

 {render}
</div>
   
  )
}

export default Home