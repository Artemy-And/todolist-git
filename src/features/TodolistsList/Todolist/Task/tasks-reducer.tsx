import {AddTodolistActionType, setTodilistAC, SetTodolistActionType} from "../todolists-reducer";
import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskType} from "../../../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../../app/store";
import {setAppStatusActionType, setAppErrorAC, setAppStatusAC} from "../../../../app/app-reducer";
import {Simulate} from "react-dom/test-utils";
import {handleServerAppError, handleServerNetworkError} from "../../../../utils/error-utils";



let initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionTypes): TasksStateType => {
    let stateCopy = {...state}
    switch (action.type) {
        case "REMOVE-TASK":
            stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(task => task.id !== action.taskId)
            return stateCopy
        case  "ADD-TASK":
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        //
        // const newTask = action.task//копируем
        // const tasks = stateCopy[newTask.todoListId]//берем новую таску
        // const newTasks = [newTask, ...tasks]//делаем копию массива
        // stateCopy[newTask.todoListId] = newTasks
        // return stateCopy
        case 'UPDATE-TASK':
            debugger
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case"ADD-TODOLIST":
            return {
                ...state,
                [action.todolist.id]: []
            }
        case "REMOVE-TODOLIST":
            delete stateCopy[action.id]
            return stateCopy
        case "SET-TODOLIST": {
            const copyState = {...state}
            action.todoList.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASK": {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = action.tasks
            return stateCopy
            //короткаая запись
            // return {...state,[action.todoListId]:action.tasks}
        }
        default:
            return state
    }
}


export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: "REMOVE-TASK", taskId, todolistId} as const
}
export const addTaskAC = (todolistId: string, task: TaskType) => {
    return {type: "ADD-TASK", todolistId, task} as const
}

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: "CHANGE-TITLE-TASK", taskId: taskId, todolistId: todolistId, title: title} as const
}
export const RemoveTodolistAC = (id: string) => {
    return {type: "REMOVE-TODOLIST", id: id} as const
}
export const setTaskAC = (tasks: Array<TaskType>, todoListId: string) => {
    return {type: "SET-TASK", tasks, todoListId} as const
}


export const getTaskTC = (todoListId: string) => {
    return (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatusAC('loading'))
        taskAPI.getTask(todoListId)
            .then((res) => {
                dispatch(setTaskAC(res.data.items, todoListId))
                dispatch(setAppStatusAC("succeeded"))
            })
    }
}

export const deleteTaskTC = (taskId: string, todoListId: string) => {
    return (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatusAC('loading'))
        taskAPI.deleteTask(todoListId, taskId)
            .then((res) => {

                dispatch(removeTaskAC(taskId, todoListId))
                dispatch(setAppStatusAC("succeeded"))
            })
    }
}
export const createTaskTC = (title: string, todolistId: string) => {
    return (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatusAC('loading'))
        taskAPI.createTask(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    const tasks = res.data.data.item
                    const action = addTaskAC(todolistId, tasks)
                    dispatch(action)
                    dispatch(setAppStatusAC("succeeded"))
                } else {
                    if (res.data.messages.length) {
                        let message = res.data.messages[0]
                        dispatch(setAppErrorAC(message))
                    } else {
                        dispatch(setAppErrorAC('some error occured'))
                        dispatch(setAppStatusAC('failed'))
                    }
                }
            })
            .catch((error)=>{
                dispatch(setAppErrorAC(error.message))
                dispatch(setAppStatusAC('failed'))
            })
    }
}


export const changeTaskStatusTC = (title: string, todolistId: string) => {

    return (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatusAC('loading'))
        taskAPI.createTask(todolistId, title)

            .then((res) => {

                const tasks = res.data.data.item
                const action = addTaskAC(todolistId, tasks)
                dispatch(action)
                dispatch(setAppStatusAC("succeeded"))
            })
    }
}


export const updateTaskTC = (taskId: string, domainModelMy: UpdateDomainTaskModelType, todolistId: string) => {

    return (dispatch: ThunkDispatchType, getState: () => AppRootStateType) => {

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
                if (res.data.resultCode === 0){
                    const action = updateTaskAC(taskId, domainModelMy, todolistId)
                    dispatch(action)

                }else{
                    handleServerAppError(res.data,dispatch)

                }


            })
            .catch((error)=>{
                handleServerNetworkError(error,dispatch)

            })
    }
}


//types


type ActionTypes =
    ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof RemoveTodolistAC>
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
type ThunkDispatchType = Dispatch<ActionTypes | setAppStatusActionType>