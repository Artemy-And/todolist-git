import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusActionType, setAppErrorAC, setAppStatusAC} from "../../../app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{id: string}>) {
            // state.filter(tl => tl.id != action.payload.id)
            //нашли индекс, а именно номер тудулиста
            const index = state.findIndex(tl => tl.id === action.payload.id)
            //если индекс минус один не равно минус один, т е нашелся элемент, то можем удалить из стейта сплайсом индекс 1
            if (index > -1){
                state.splice(index,1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{todolist: TodolistType}>) {

            //снгачала испольховдаи метот PUSH но как оказалось она добавляет в конец
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{id: string, title: string}>) {
            //нашли индекс, а именно номер тудулиста
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title=action.payload.title
            // let todolistTasks = state.find(tl => tl.id === action.payload.id)
            // if (todolistTasks){
            //     todolistTasks.title = action.payload.title
            // }
        },
        changeTodolistFilterAC(state, action: PayloadAction<{filter: FilterValuesType, id: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter=action.payload.filter
        },
        setTodilistAC(state, action: PayloadAction<{todoList: Array<TodolistType>}>) {
            return action.payload.todoList.map((tl: any) => {
                return {...tl, filter: "all", entityStatus: 'idle'}
            })
        },
        changeTodilistEntitiyStatusAC(state, action: PayloadAction<{id: string, entityStatus: RequestStatusType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus=action.payload.entityStatus
        },

    }
})


export const todolistsReducer = slice.reducer
// (state: Array<TodolistDomainType> = initialState, action: ActionTypes): Array<TodolistDomainType> => {
//     switch (action.type) {
//
//         case "REMOVE-TODOLIST": {
//             return state.filter(tl => tl.id != action.id);
//         }
//         case  "ADD-TODOLIST": {
//             const newTodoList: TodolistDomainType = {...action.todolist, filter: 'all', entityStatus: 'idle'}
//             return [newTodoList, ...state]
// //         }
//         case 'CHANGE-TODOLIST-TITLE': {
//             debugger
//             let todolistTasks = state.find(tl => tl.id === action.id)
//             if (todolistTasks) {
//                 todolistTasks.title = action.title;
//             }
//             return [...state]
//         }
//         case 'CHANGE-TODOLIST-FILTER': {
//             return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
//         }
//         case "CHANGE-TODOLIST-ENTITY-STATUS":
//             return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
//
//         case "SET-TODOLIST": {
//             return action.todoList.map((tl: any) => {
//                 return {...tl, filter: "all", entityStatus: 'idle'}
//             })
//         }
//
//
//         default:
//             return state
//     }
// }

// actions

export const removeTodolistAC = slice.actions.removeTodolistAC
export const addTodolistAC = slice.actions.addTodolistAC
export const changeTodolistTitleAC = slice.actions.changeTodolistTitleAC
export const changeTodolistFilterAC = slice.actions.changeTodolistFilterAC
export const setTodilistAC = slice.actions.setTodilistAC
export const changeTodilistEntitiyStatusAC = slice.actions.changeTodilistEntitiyStatusAC



//thunks
export const fetchTodoListTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        todolistAPI.getTodolist()
            .then((res) => {
                debugger
                dispatch(setTodilistAC({todoList:res.data}))
                dispatch(setAppStatusAC({status: "succeeded"}))

            })
            .catch((error) => {
                dispatch(setAppErrorAC(error.message))
                dispatch(setAppStatusAC({status: 'failed'}))
            })
    }
}

export const removeTodoListTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        dispatch(changeTodilistEntitiyStatusAC({id:todolistId, entityStatus:'loading'}))

        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC({id:todolistId}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            })
    }
}

export const addTodoListTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistAPI.createTodolist(title)
            .then((res) => {
                debugger
                dispatch(addTodolistAC({todolist:res.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
    }
}

export const changeTodolistTC = (todolistId: string, title: string) => {
    debugger
    return (dispatch: Dispatch) => {
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC({id:todolistId, title:title}))
            })
    }
}

// types

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistActionType = ReturnType<typeof setTodilistAC>
// type ActionTypes =
//     ReturnType<typeof RemoveTodolistAC>
//     | ReturnType<typeof addTodolistAC>
//     | ReturnType<typeof changeTodolistAC>
//     | ReturnType<typeof changeTodolistFilterAC>
//     | ReturnType<typeof setTodilistAC>
//     // |   ReturnType<typeof setAppStatusAC>
//     // |   ReturnType<typeof setAppErrorAC>
//     | ReturnType<typeof changeTodilistEntitiyStatusAC>


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
// type ThunkDispatchType = Dispatch<ActionTypes | setAppStatusActionType>


