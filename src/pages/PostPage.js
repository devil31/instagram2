import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { fetchPost } from '../store/actions/Post'
import PostPageCmp from '../components/PostPageCmp';
import Header from '../components/Header'

function PostPage() {
  const { postId } = useParams()
  const fetchDataPost = useSelector(state => state.Post.fetchDataPost)
  const filterPost = fetchDataPost.filter(obj => obj.key == postId)
  const renderPost = filterPost.map(i => <PostPageCmp key={i.key} loadImg={i.loadImg} username={i.username} fullDate={i.date} postId={i.key} comments={i.comments} />)
  let navigate = useNavigate()
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchPost())
  }, [])
  return (
    <div>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 120 }}>
        {filterPost == '' ? navigate("/") : renderPost}

      </div>
    </div>




  )
}

export default PostPage