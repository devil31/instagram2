import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getUserData } from '../store/actions/Auth';
import { fetchPost } from '../store/actions/Post';


function Saved() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData())
    dispatch(fetchPost())
    
  }, [])

const myUserId=(JSON.parse(localStorage.userId).userId)
const UserData = useSelector(state => state.Auth.userData)
const postData = useSelector(state => state.Post.fetchDataPost)
const filterUser = UserData.filter(obj => obj.userId == myUserId)

const username = filterUser && filterUser[0].username
const filterPost = postData.filter(obj => obj.username == username)

const postId = (filterUser && filterUser[0].saved)
const postList = [];


for(let key in postId ){
  postList.push({
    postId:postId[key].postId,
    loadImg:postId[key].loadImg,
  })
}
const renderSave = postList.map(i=><div  style={{cursor:'pointer'}}>{i.postId}</div>)

  return (
    <div style={{ marginTop: 50, width: '100%', height: '100vh', position: 'absolute' }}>

      {renderSave}
     
    </div>

  )
}

export default Saved