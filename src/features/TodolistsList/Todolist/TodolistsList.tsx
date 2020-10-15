import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import {
    addTodoListTC,
    changeTodolistFilterAC,
    changeTodolistTC,
    fetchTodoListTC,
    FilterValuesType, removeTodoListTC,
    TodolistDomainType
} from "./todolists-reducer";
import {createTaskTC, deleteTaskTC, TasksStateType, updateTaskTC} from "./Task/tasks-reducer";
import {TaskStatuses} from "../../../api/todolists-api";
import {Grid} from "@material-ui/core";
import AddItemForm from "../../../components/AddItemForm/AddItemForm";
import Paper from "@material-ui/core/Paper";
import {Todolist} from "./TodoList"
import { Redirect } from "react-router-dom";


type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)

    // useEffect(() => {
    //     if (demo||!isInitialized) {
    //         return
    //     }
    //     dispatch(fetchTodoListTC())
    // }, [])
    useEffect(() => {
        if (demo||!isLoggedIn) {
            return
        }
        dispatch(fetchTodoListTC())
    }, [])

    const removeTask = useCallback((id: string, todolistId: string) => {

        dispatch(deleteTaskTC(id, todolistId))
    }, [dispatch])
    const addTask = useCallback((title: string, todolistId: string) => {

        dispatch(createTaskTC(title, todolistId))
    }, [dispatch])
    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        const thunk = updateTaskTC(id, {status}, todolistId)
        dispatch(thunk)
    }, [dispatch])
    const changeTaskTitle = useCallback((id: string, title: string, todolistId: string) => {
        const action = updateTaskTC(id, {title}, todolistId)
        dispatch(action)


    }, [dispatch])
    const ChangeTOD = useCallback((newTitle: string, todolistID: string) => {

        const thunk = changeTodolistTC(todolistID, newTitle)
        dispatch(thunk)
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC({filter:value, id:todolistId}))
    }, [dispatch])
    const removeTodolist = useCallback((id: string) => {

        dispatch(removeTodoListTC(id))


    }, [dispatch])
    const addTodoList = useCallback((title: string) => {

        dispatch(addTodoListTC(title))


    }, [dispatch])

    if (!isLoggedIn){
        return <Redirect to={'/login'}/>
    }
    return <> <Grid container style={{padding: "10px"}}>
        <AddItemForm addItem={addTodoList}/>
    </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    return <Grid item>
                        <Paper style={{padding: "10px"}}>
                            <Todolist
                                key={tl.id}
                                todolist={tl}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                ChangeTOD={ChangeTOD}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid></>
}
