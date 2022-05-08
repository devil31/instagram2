import * as actionTypes from '../actions/ChangeUserData'


const initialState = {
    updated:[],
    loading:false,
    error:[],
    changeImg:[],
 }

 const Options = (state= initialState,action)=>{
    switch (action.type) {
        case actionTypes.UPDATE_USERDATASTART:
            return{
                ...state,
                loading: true,
            }
            case actionTypes.UPDATE_USERDATASUCCESS:
                return{
                    ...state,
                    updated: action.updated,
                    loading:false
                }
                case actionTypes.UPDATE_USERDATAFAIL:
                    return{
                        ...state,
                        error:action.error,
                        loading:false
                    }
                    case actionTypes.CHANGE_IMAGEPROFILE:
                        return{
                            ...state,
                            changeImg:action.changeImg,
                            loading:false,
                        }
                        case actionTypes.CHANGE_IMAGEPROFILESTART:
                            return{
                                  loading:true,
                            }
                      case actionTypes.CHANGE_IMAGEFAILE:
                          return{
                              error:action.error,
                              loading:false
                          }
               
           
    
        default:
           return state;
    }
  }
  
  export default Options