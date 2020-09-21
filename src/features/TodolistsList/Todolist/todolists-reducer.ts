

import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusActionType, setAppErrorAC, setAppStatusAC} from "../../../app/app-reducer";




export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState: Array<TodolistDomainType> = []




export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionTypes): Array<TodolistDomainType> => {
    switch (action.type) {

        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id != action.id);
        }
        case  "ADD-TODOLIST": {
            const newTodoList: TodolistDomainType = {...action.todolist, filter: 'all', entityStatus:'idle'}
            return [newTodoList, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            // return state.map(tl=> tl.id === action.id ? {...tl, title:action.title}: tl)
            // код до рефакторинга
            debugger
            let todolistTasks = state.find(tl => tl.id === action.id)
            if (todolistTasks) {
                todolistTasks.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl=> tl.id === action.id ? {...tl, filter:action.filter}: tl)
            // код до рефакторинга
            // let todolist = state.find(tl => tl.id === action.id);
            // if (todolist) {
            //     todolist.filter = action.filter;
            //
            // }
            // return [...state]
        }
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl=> tl.id === action.id ? {...tl, entityStatus:action.entityStatus}: tl)

        case "SET-TODOLIST": {
            return action.todoList.map((tl: any) => {
                return {...tl, filter: "all", entityStatus:'idle'}
            })
        }


        default:
            return state
    }
}

// actions

export const RemoveTodolistAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', id: id} as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: "ADD-TODOLIST", todolist} as const
}
export const changeTodolistAC = (id: string, title: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title} as const
}
export const changeTodolistFilterAC = (value: FilterValuesType, id: string) => {
    return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: value} as const
}
export const setTodilistAC = (todoList: Array<TodolistType>) => {
    return {type: "SET-TODOLIST", todoList} as const
}
export const changeTodilistEntitiyStatusAC = (id: string, entityStatus:RequestStatusType) => {
    return {type: "CHANGE-TODOLIST-ENTITY-STATUS", id,entityStatus} as const
}



//thunks
export const fetchTodoListTC = () => {
    return (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatusAC("loading"))
        todolistAPI.getTodolist()
            .then((res) => {
                debugger
                dispatch(setTodilistAC(res.data))
                dispatch(setAppStatusAC("succeeded"))

            })
            .catch((error)=>{
                dispatch(setAppErrorAC(error.message))
                dispatch(setAppStatusAC('failed'))
            })
    }
}

export const removeTodoListTC = (todolistId: string) => {
    return (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatusAC("loading"))
        dispatch(changeTodilistEntitiyStatusAC(todolistId, 'loading'))

        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(RemoveTodolistAC(todolistId))
                dispatch(setAppStatusAC("succeeded"))
            })
    }
}

export const addTodoListTC = (title: string) => {
    return (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.createTodolist(title)
            .then((res) => {
                debugger
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const changeTodolistTC = (todolistId: string, title: string) => {
    debugger
    return (dispatch: ThunkDispatchType) => {
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                dispatch(changeTodolistAC(todolistId, title))
            })
    }
}

// types

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistActionType = ReturnType<typeof setTodilistAC>
type ActionTypes =
    ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodilistAC>
    |   ReturnType<typeof setAppStatusAC>
    |   ReturnType<typeof setAppErrorAC>
    |   ReturnType<typeof changeTodilistEntitiyStatusAC>


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus:RequestStatusType
}
type ThunkDispatchType = Dispatch<ActionTypes | setAppStatusActionType>


