import {setAppErrorAC, setAppStatusAC, setInitializedAC} from "../../app/app-reducer";
import {Dispatch} from "redux";
import {auth, loginType, todolistAPI} from "../../api/todolists-api";
import {setTodilistAC} from "../TodolistsList/Todolist/todolists-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state:InitialStateType=initialState,action:ActionsType):InitialStateType=>{
    switch (action.type){
        case "login/SET-IS-LOGGED-IN":
            return {...state,isLoggedIn:action.value}
        default:
            return state
    }
}


//actions
const setIsLoggedAC = (value:boolean)=>({type:'login/SET-IS-LOGGED-IN',value}as const)

//thunk

export const initializedAppTC = ()=>(dispatch:ThunkDispatchType)=>{
    auth.authMe().then((res)=>{
        if (res.data.resultCode === 0){
            dispatch(setIsLoggedAC(true))

        } else {

        }
        dispatch(setInitializedAC(true))
    })
}
export const loginTC = (data: loginType) => (dispatch: ThunkDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    auth.login(data)
        .then((res)=>{
            if (res.data.resultCode === 0 ){
                dispatch(setIsLoggedAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data,dispatch)
            }

        })
        .catch((error)=>{
            handleServerNetworkError(error,dispatch)
        })
}

export const logoutTC = ()=>(dispatch:ThunkDispatchType)=>{
    dispatch(setAppStatusAC('loading'))
    auth.logOut()
        .then(res=>{
            if (res.data.resultCode === 0){
                dispatch(setIsLoggedAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data,dispatch)
            }
        })
        .catch((error)=>{
            handleServerNetworkError(error,dispatch)
        })
}

// export const fetchTodoListTC = () => {
//     return (dispatch: ThunkDispatchType) => {
//         dispatch(setAppStatusAC("loading"))
//         todolistAPI.getTodolist()
//             .then((res) => {
//                 dispatch(setTodilistAC(res.data))
//                 dispatch(setAppStatusAC("succeeded"))
//             })
//     }
// }


//types


type InitialStateType={
    isLoggedIn:boolean
}
export type ActionsType = ReturnType<typeof setIsLoggedAC>|ReturnType<typeof setAppErrorAC>
type InitializedType = ReturnType<typeof setInitializedAC>

export type setAppStatusActionType = ReturnType<typeof setAppStatusAC>
type ThunkDispatchType = Dispatch<ActionsType | setAppStatusActionType|InitializedType>