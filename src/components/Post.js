import React, { useState,useEffect } from 'react';
import { BsHeart, BsEmojiSmile } from 'react-icons/bs';
import { IoPaperPlaneOutline, IoBookmarkOutline, IoChatbubbleOutline } from 'react-icons/io5'
import ModalComment from './ModalComments';
import ModalOptions from './ModalOptions'
import { fetchPost, postComment, savePost, savePostStart } from '../store/actions/Post';
import { useDispatch,useSelector } from 'react-redux';
import { deletePost } from '../store/actions/Post';

import '../Styles/Post.css'
import { getUserData } from '../store/actions/Auth';
import { Spinner } from 'react-bootstrap';


function Post({ username, loadImg, postId, fullDate, comments, text, }) {
  const [modalShow, setModalShow] = useState(false);
  const [inputComment, setInputComment] = useState('') 
  const [modalShowOptions, setModalShowOptions] = useState(false);
  const loadingDeletePost = useSelector(state=>state.Post.loadingDeletePost)
 const[color,setColor] = useState('')
  const date = new Date().getTime();
  const dispatch = useDispatch()
  const m = new Array(12)
  const myUserData = useSelector(state => state.Auth.userData)
  const loadingsavedPost = useSelector(state=>state.Post.loadingSavePost)
  const myId = JSON.parse(localStorage.getItem('userId')).userId
  const findUser = myUserData.find(e => e.userId == myId)  
  const myUsername = findUser && findUser.username
  const UserKey = findUser && findUser.key;
  

useEffect(()=>{
dispatch(getUserData())
 const a = []
for(let key in findUser.saved){
  a.push({
    postId:findUser.saved[key].postId,
  })
}
console.log(a)
setColor( a.map(i=>i.postId).includes(postId))
return
},[loadingsavedPost])


 

   




console.log(color)

  const handleComment = (e) => {
    e.preventDefault()
    setInputComment(e.target.value)
  }


  const comment = () => {
    if(inputComment==''){
      return
    }
    dispatch(postComment(postId, myUsername, inputComment, date, comments))
    setInputComment('')
  }

  const optionPost = () => {
    username === myUsername ? setModalShowOptions(true) : console.log('no')
  }

  const removepost = ()=>{
    dispatch(deletePost(postId))
  }
  const listComments = [];
  for (let key in comments) {
    listComments.push({
      date: comments[key].date,
      inputComment: comments[key].inputComment,
      username: comments[key].username,
      key
    })
  }
const save = ()=>{  
  dispatch(savePost(UserKey,postId)) 
}
  const renderComments = listComments.map((i) => {
    const time = (Math.floor((new Date().getTime() - i.date) / 60000))
    let Time = ''
    if (time < 60) {
      Time = `${(time).toFixed(0)} min`
    }
    if (time > 59) {
      Time = `${(time / 60).toFixed(0)} ${date > 89 ? 'ore' : 'ora'}`
    }
    if (time > 1440) {
      Time = `${(time / 1440).toFixed(0)} giorn`
    }
    if (time > 8640) {
      Time = `${(time / 8640).toFixed(0)} sett`
    }
    return (
      <div key={i.key} className='post_renderComments'>

        <p> <strong>{i.username}</strong> {i.inputComment}</p>


        <div className='renderComment_Time'>
          {Time}
        </div>
      </div>
    )
  })

  m[0] = 'DICEMBRE';
  m[1] = 'GENNAIO';
  m[2] = 'FEBBRAIO';
  m[3] = 'MARZO';
  m[4] = 'APRILE';
  m[5] = 'MAGGIO';
  m[6] = 'GIUGNO';
  m[7] = 'LUGLIO';
  m[8] = 'AGOSTO';
  m[9] = 'SETTEMBRE';
  m[10] = 'OTTOBRE';
  m[11] = 'NOVEMBRE';
  return (
    <div className='post_container'>
      <div className="postHeader">
        <div>
          {username}

        </div>
        <div>
          <p  onClick={optionPost} style={{ cursor: 'pointer', fontSize: '25px' }} >...</p>
        </div>

      </div>

      <div className="postImage">
        <img width={'100%'} height={'200px'} src={`${loadImg}`} />
      </div>

      <div className='postIcon'>
        <div>
          <BsHeart size={'25px'} />
          <IoChatbubbleOutline size={'25px'} />
          <IoPaperPlaneOutline size={'25px'} />
        </div>
        <div className="postIconSave">
        {loadingsavedPost ? 
        <Spinner animation='border' size='sm' style={{marginRight:5}}/>:
        <IoBookmarkOutline size={'25px'} onClick={save} color={color ? 'green':'black'}/>          
        }
          
     
        </div>
      </div>

      <div className="post_like">
        like
      </div>
      <div className='post_text'>
        <strong></strong>
      </div>
      <div className="post_listComments">
        <span onClick={() => setModalShow(true)} > Mostra tutti e {renderComments.length}  i commenti</span>

      </div>
      <div className="post_date">
        {fullDate.day} {m[fullDate.Month]} {fullDate.Year}
      </div>
      <div className="addComments">
        <BsEmojiSmile size={25} style={{ cursor: 'pointer' }} />
        <input placeholder='Aggiungi un commento...' onChange={handleComment} value={inputComment} />
        <div>
          <button onClick={comment} >Pubblica</button>
        </div>

      </div>
      <ModalComment
        show={modalShow}
        onHide={() => setModalShow(false)}
        loadimg={loadImg}
        username={username}
        postid={postId}
        date={date}
        rendercomments={renderComments}
        fulldate={fullDate}
        m={m}
        myusername = {myUsername}

      />
    <ModalOptions
        show={modalShowOptions}
        onHide={() => setModalShowOptions(false)}
        deletePost={removepost}
        spinner={loadingDeletePost}
      />

    </div>

  )
}

export default Post