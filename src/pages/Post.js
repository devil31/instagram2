import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../store/actions/Post';


function Post() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPost())
    }, [])

    const postData = useSelector(state => state.Post.fetchDataPost)

    const { username } = useParams()

    const filterPost = postData.filter(obj => obj.username == username)

    const renderPost = () => {
        return (
            filterPost.map((i) => {
                return (
                    <Link key={i.key} to={`/p/${i.key}`} style={{ backgroundImage: `url(${i.loadImg})`, width: 120, height: 100, border: '1px sold black', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center ', }}>

                    </Link>
                )
            })
        )
    }
    return (
        <div style={{

            position: 'absolute',
            width: '100%',
            height: '100px',
            marginTop: 50,
            display: 'flex',
        }}>

            {renderPost()}
        </div>
    )
}

export default Post

