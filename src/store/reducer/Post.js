import * as actionTypes from '../actions/Post';


const initialState = {
    loading: false,
    dataPost: [],
    errorCreatePost: [],
    fetchDataPost: [],
    commentPost: [],
    deletePost: [],
    errorDeletePost: [],
    loadingDeletePost: false,
    loadingSavePost: false,
    dataSavePost: [],
    errorSavePost: [],

}

export const Post = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_POSTSTART:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.CREATE_POSTSUCCESS:
            return {
                ...state,
                dataPost: action.dataPost,
                loading: false,
            }
        case actionTypes.CREATE_POSTFAIL:
            return {
                ...state,
                loading: false,
                errorCreatePost: action.errorCreatePost,
            }

        case actionTypes.FETCH_POST:
            return {
                ...state,
                fetchDataPost: action.fetchDataPost,
                loadingSavePost:false,
            }
        case actionTypes.COMMENT_POSTSTART:
            return {
                ...state,
                commentPost: action.commentPost,
                loading: true
            }
        case actionTypes.DELETE_POSTSTART:
            return {
                ...state,
                loadingDeletePost: true,
            }
        case actionTypes.DELETE_POSTSUCCESS:
            return {
                ...state,
                deletePost: action.deletePost,
                loadingDeletePost: false,
            }
        case actionTypes.DELETE_POSTFAIL:
            return {
                ...state,
                loadingDeletePost: false,
                errorDeletePost: action.errorDeletePost,
            }
        case actionTypes.SAVE_POSTSTART:
            return {
                ...state,
                loadingSavePost: true,
            }
        case actionTypes.SAVE_POSTSUCCESS:
            return{
                ...state,
                dataSavePost:action.dataSavePost,
                loadingSavePost:false,
            }
            case actionTypes.SAVE_POSTFAIL:
                return{
                    ...state,
                    errorSavePost:action.errorSavePost,
                    loadingSavePost:false
                }
           
    
        default:
            return state
    }

}