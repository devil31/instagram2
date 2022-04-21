import * as actionTypes from '../actions/Auth';


const initialState = {
    userData: [],
    token: null,
    username: null,
    userId: null,
    loading: false,
    error: false,
}

const Auth = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
            }
            case actionTypes.AUTH_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    error:false,
                    token:action.token,
                    userId:action.userId,

                }
                case actionTypes.AUTH_FAIL:
                    return{
                        ...state,
                        error:true,
                        loading:false,

                    }
        case actionTypes.SIGN_IN:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                username: action.username,
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                token: null,
                loading:false,
                error:action.error,
            }
            case actionTypes.GET_USERDATA:
                return{
                    ...state,
                    userData:action.userData,
                }
        default:
            return state;

    }
}

export default Auth;