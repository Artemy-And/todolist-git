import {
    addTodolistAC,
    AddTodolistActionType,
    setTodilistAC,
    SetTodolistActionType,
    removeTodolistAC,
    FilterValuesType
} from "../todolists-reducer";
import {
    taskAPI,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    TodolistType,
    UpdateTaskType
} from "../../../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../../app/store";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {action} from "@storybook/addon-actions";


let initialState: TasksStateType = {}


const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {

        removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{
            // todolistId: string,
            task: TaskType
        }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTaskAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todoListId: string }>) {
            state[action.payload.todoListId] = action.payload.tasks
        }
    },
    extraReducers: ((builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id];
        });
        builder.addCase(setTodilistAC, (state, action) => {
            action.payload.todoList.forEach((tl: any) => {
                state[tl.id] = []
            });
        })
    })
})


export const tasksReducer = slice.reducer
export const removeTaskAC = slice.actions.removeTaskAC
export const addTaskAC = slice.actions.addTaskAC
export const updateTaskAC = slice.actions.updateTaskAC
export const setTaskAC = slice.actions.setTaskAC


export const getTaskTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        taskAPI.getTask(todoListId)
            .then((res) => {
                dispatch(setTaskAC({tasks: res.data.items, todoListId: todoListId}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            })
    }
}

export const deleteTaskTC = (taskId: string, todoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        taskAPI.deleteTask(todoListId, taskId)
            .then((res) => {

                dispatch(removeTaskAC({taskId:taskId,todolistId: todoListId}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            })
    }
}
export const createTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        taskAPI.createTask(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    const tasks = res.data.data.item
                    const action = addTaskAC(   {
                        // todolistId:todolistId,
                        task:tasks})
                    dispatch(action)
                    dispatch(setAppStatusAC({status: "succeeded"}))
                } else {
                    if (res.data.messages.length) {
                        let message = res.data.messages[0]
                        dispatch(setAppErrorAC({error: message}))
                    } else {
                        dispatch(setAppErrorAC({error: 'some error occured'}))
                        dispatch(setAppStatusAC({status: 'failed'}))
                    }
                }
            })
            .catch((error) => {
                dispatch(setAppErrorAC(error.message))
                dispatch(setAppStatusAC({status: 'failed'}))
            })
    }
}


export const changeTaskStatusTC = (title: string, todolistId: string) => {

    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        taskAPI.createTask(todolistId, title)

            .then((res) => {

                const tasks = res.data.data.item
                const action = addTaskAC({
                    // todolistId:todolistId,
                    task:tasks})
                dispatch(action)
                dispatch(setAppStatusAC({status: "succeeded"}))
            })
    }
}


export const updateTaskTC = (taskId: string, domainModelMy: UpdateDomainTaskModelType, todolistId: string) => {

    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id);
        if (!task) {
            console.warn('таска не найдена')
            return;
        }
        const model: UpdateTaskType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModelMy
        }
        taskAPI.updateTask(todolistId, taskId, model)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    const action = updateTaskAC({taskId:taskId,model: domainModelMy,todolistId: todolistId})
                    dispatch(action)

                } else {
                    handleServerAppError(res.data, dispatch)

                }


            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)

            })
    }
}


//types


type ActionTypes =
    ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    // | ReturnType<typeof changeTaskTitleAC>
    // | ReturnType<typeof RemoveTodolistAC>
    | AddTodolistActionType
    | ReturnType<typeof setTaskAC>
    | SetTodolistActionType
    | ReturnType<typeof setTodilistAC>


export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}