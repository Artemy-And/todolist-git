import {TodolistType} from "../api/todolists-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{ status: 'idle' | 'loading' | 'succeeded' | 'failed' }>) {
            state.status = action.payload.status
        },
        setInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isInitialized = action.payload.value
        }
    }
})
export const setAppErrorAC = slice.actions.setAppErrorAC
export const setAppStatusAC = slice.actions.setAppStatusAC
export const setInitializedAC = slice.actions.setInitializedAC

export const appReducer = slice.reducer
//     (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case 'APP/SET-ERROR':
//             return {...state, error:action.error}
//         case "APP/SET-INITIALIZED":
//             return {...state,isInitialized:action.value}
//         default:
//             return {...state}
//     }
// }
// export const setAppErrorAC = (error: string | null) => {
//     return {type: 'APP/SET-ERROR', error} as const
// }
// export const setAppStatusAC = (status: RequestStatusType) => {
//     return {type: 'APP/SET-STATUS', status} as const
// }
// export const setInitializedAC = (value: boolean) => {
//     return {type: 'APP/SET-INITIALIZED', value} as const
// }
// type ActionsType = ReturnType<typeof setAppErrorAC> | ReturnType<typeof setAppStatusAC>
//     | ReturnType<typeof setInitializedAC>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType,
    //если глобальная произойдет мы запишем текст ошибки сюда
    error: string | null,
    //true когда приложение проинициализировалось(проверили юзера, настройки)
    isInitialized: boolean
}
export type setAppStatusActionType = ReturnType<typeof setAppErrorAC> | ReturnType<typeof setAppStatusAC>| ReturnType<typeof setInitializedAC>
