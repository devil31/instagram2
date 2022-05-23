import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'


import { fetchPost } from '../store/actions/Post'

import Header from '../components/Header'
import Post from '../components/Post'
import { Spinner } from 'react-bootstrap'




function Home() {

  const dispatch = useDispatch()
 
  useEffect(()=>{
   dispatch(fetchPost())
  
},[])



 
  const renderPost = useSelector(state=>state.Post)
  const loading = renderPost.fetchPostLoading;
  const render = renderPost.fetchDataPost.map(i=><Post key={i.key} loadImg={i.loadImg} username={i.username} fullDate={i.date} postId={i.key} comments={i.comments} profileImg={i.profileimg}/>)

  return (
<div style={{ marginTop: '200px', display: 'flex', alignItems: 'center', flexDirection: 'column' }} >
<Header/>

 {
   loading ? 
   <div style={{position:'absolute',width:'100%',height:'100%',top:0,alignItems:'center',display:'flex',justifyContent:'center',opacity:0.5,flexDirection:'column'}}>
   <Spinner animation="border" variant='info' style={{width:'3em',height:'3em',marginBottom:10}} />
   <p>Attendi Caricamento...</p>
</div>
   :

    
   render
   }
</div>
   
  )
}

export default Home