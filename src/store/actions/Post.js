import axios from "axios";
import { useSelector } from "react-redux";
import { getUserData } from "./Auth";
export const CREATE_POST = 'CREATE_POST';
export const CREATE_POSTSTART = 'CREATE_POSTSTART';
export const CREATE_POSTSUCCESS = 'CREATE_POSTSUCCESS';
export const CREATE_POSTFAIL = 'createPost_FAIL';
export const FETCH_POST = 'FETCH_POST';
export const FETCH_POSTSTART = 'FETCH_POSTSTART';
export const FETCH_POSTSUCCESS = 'FETCH_POSTSUCCESS';
export const FETCH_POSTFAIL = "FETCH_POSTFAIL";
export const COMMENT_POSTSTART = 'COMMENT_POSTSTART';
export const COMMENT_POSTSUCCESS = 'COMMENT_POSTSUCCESS';
export const COMMENT_POSTFAIL = 'COMMENT_POSTFAIL';
export const FETCH_COMMENTSPOST = 'FETCH_COMMENTSPOST';
export const DELETE_POSTSTART = 'DELETE_POSTSTART';
export const DELETE_POSTSUCCESS = 'DELETE_POSTsUCCESS';
export const DELETE_POSTFAIL = 'DELETE_POSTFAIL';
export const SAVE_POSTSTART = 'SAVE_POSTSTART';
export const SAVE_POSTSUCCESS = 'SAVE_POSTSUCCESS';
export const SAVE_POSTFAIL = 'SAVE_POSTFAIL';


export const createPost = (txtArea, loc, username, loadImg, date,profileimg) => {

    return async dispatch => {
        dispatch(createPostStart())
       

        try {

            const result = await axios.post('https://inst2-76a9c-default-rtdb.firebaseio.com/post.json', {
                text: txtArea,
                loc,
                username,
                loadImg,
                date,
                like: { users: '' },
                profileimg,


            })

            dispatch(createPostSuccess(result))
            dispatch(fetchPost())

        } catch (error) {
            dispatch(createPostFail(error))
        }
    }
}

export const fetchPost = () => {
    return async dispatch => {
        const fetchData = await axios.get(`https://inst2-76a9c-default-rtdb.firebaseio.com/post.json`)
        const fetchDataList = [];
        for (let key in fetchData.data) {
            fetchDataList.push({
                loadImg: fetchData.data[key].loadImg,
                loc: fetchData.data[key].loc,
                username: fetchData.data[key].username,
                date: fetchData.data[key].date,
                comments: fetchData.data[key].comments,
                profileimg:fetchData.data[key].profileimg,
                key,
            })
        }
        dispatch({
            type: FETCH_POST,
            fetchDataPost: fetchDataList,
        })
    }
}


export const postComment = (postId, username, inputComment, date,profileimg) => {

    return async dispatch => {
        dispatch(commentPostStart())        
        try {
            const commentResponce = await axios.post(`https://inst2-76a9c-default-rtdb.firebaseio.com/post/${postId}/comments.json`, {
                username,
                inputComment,
                date,
                profileimg,

            })

            dispatch(commentPostSuccess(commentResponce))
            dispatch(fetchPost())

        } catch (error) {
            dispatch(commentPostFail(error))
        }
    }
}


export const deletePost = (postId) => {

    return async dispatch => {
       dispatch(deletePostStart())
        try {
                 const responce = await axios.delete(`https://inst2-76a9c-default-rtdb.firebaseio.com/post/${postId}.json`)
              
            const getData = await axios.get(`https://inst2-76a9c-default-rtdb.firebaseio.com/user.json`);
            const Data = (Object.values(getData.data).map(x=>x.saved))
             
     
     
         await dispatch(deletePostSuccess(responce))
          
            dispatch(fetchPost())
        } catch (error) {
            dispatch(deletePostFail(error))
        }
    }
}

export const savePost = (UserKey, postId, loadImg) => {

    return async dispatch => {
        dispatch(savePostStart())
        dispatch(fetchPost())
        dispatch(getUserData())
        try {
            const check = await axios.get(`https://inst2-76a9c-default-rtdb.firebaseio.com/user/${UserKey}/saved.json`)
            const checkList = [];
            for (let key in check.data) {
                checkList.push({
                    postId: check.data[key].postId,
                    key,
                })
            }
            const idExist = checkList.map(i => i.postId).includes(postId)
            console.log(idExist)
            const findKey = checkList.find(i => i.postId == postId)
            const key = findKey && findKey.key

            if (idExist) {
                await axios.delete(`https://inst2-76a9c-default-rtdb.firebaseio.com/user/${UserKey}/saved/${key}.json`);
            } else {
                const responce = await axios.post(`https://inst2-76a9c-default-rtdb.firebaseio.com/user/${UserKey}/saved.json`, {
                    postId,
                    loadImg,
                })
                dispatch(getUserData())
                dispatch(savePostSuccess(responce))




            }

        } catch (error) {
            dispatch(savePostFail(error))
            console.log(error)
        }
    }
}



//create post

export const createPostStart = () => {
    return {
        type: CREATE_POSTSTART,
    }
}
export const createPostSuccess = (data) => {

    return {
        type: CREATE_POSTSUCCESS,
        dataPost: data.data
    }
}

export const createPostFail = (error) => {
    return {
        type: CREATE_POSTFAIL,
        errorCreatePost: error,
    }
}

//comment post 

export const commentPostStart = () => {
    return {
        type: COMMENT_POSTSTART,
    }
}
export const commentPostSuccess = (data) => {
    return {
        type: COMMENT_POSTSUCCESS,
        commentPost: data.data
    }
}
export const commentPostFail = () => {
    return {
        type: COMMENT_POSTFAIL,
    }
}

//delete post
export const deletePostStart = () => {
    return {
        type: DELETE_POSTSTART,
    }
}
export const deletePostSuccess = (data) => {

    return {
        type: DELETE_POSTSUCCESS,
        deletePost: data.data
    }
}
export const deletePostFail = (error) => {
    return {
        type: DELETE_POSTFAIL,
        errorDeletePost: error
    }
}

//save post
export const savePostStart = () => {
    return {
        type: SAVE_POSTSTART,
    }
}
export const savePostSuccess = (data) => {

    return {
        type: SAVE_POSTSUCCESS,
        dataSavePost: data.data
    }
}
export const savePostFail = (error) => {
    return {
        type: SAVE_POSTFAIL,
        errorSavePost: error
    }
}