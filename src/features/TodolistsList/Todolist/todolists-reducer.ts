import {} from "../../../trash/App";

import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../../../api/todolists-api";
import {Dispatch} from "redux";




export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState: Array<TodolistDomainType> = []




export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionTypes): Array<TodolistDomainType> => {
    switch (action.type) {

        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id != action.id);
        }
        case  "ADD-TODOLIST": {
            const newTodoList: TodolistDomainType = {...action.todolist, filter: 'all'}
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
        case "SET-TODOLIST": {
            return action.todoList.map((tl: any) => {
                return {...tl, filter: "all"}
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

//thunks
export const fetchTodoListTC = () => {
    return (dispatch: Dispatch<ActionTypes>) => {
        todolistAPI.getTodolist()
            .then((res) => {
                dispatch(setTodilistAC(res.data))
            })
    }
}

export const removeTodoListTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionTypes>) => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(RemoveTodolistAC(todolistId))
            })
    }
}

export const addTodoListTC = (title: string) => {
    return (dispatch: Dispatch<ActionTypes>) => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                const todolist = res.data.data.item
                dispatch(addTodolistAC(todolist))
            })
    }
}

export const changeTodolistTC = (todolistId: string, title: string) => {
    debugger
    return (dispatch: Dispatch<ActionTypes>) => {
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
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}



