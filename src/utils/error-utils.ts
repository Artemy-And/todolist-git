import {setAppErrorAC, setAppStatusAC, setAppStatusActionType} from '../app/app-reducer';
import { Dispatch } from 'redux';
import { ResponseType } from '../api/todolists-api';

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        let message = data.messages[0]
        dispatch(setAppErrorAC(message))
    } else {
        dispatch(setAppErrorAC('some error occured'))
        dispatch(setAppStatusAC('failed'))
    }
}

export const handleServerNetworkError = (error: {message: string}, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(error.message? error.message:'some error was occured'))
    dispatch(setAppStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<setAppStatusActionType>