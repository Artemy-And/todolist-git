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


type TodolistsListType = {
    // todolists:Array<TodolistDomainType>
}

export const TodolistsList: React.FC<TodolistsListType> = (props) => {
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    useEffect(() => {
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
        dispatch(changeTodolistFilterAC(value, todolistId))
    }, [dispatch])
    const removeTodolist = useCallback((id: string) => {

        dispatch(removeTodoListTC(id))


    }, [dispatch])
    const addTodoList = useCallback((title: string) => {

        dispatch(addTodoListTC(title))


    }, [dispatch])


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
                                id={tl.id}
                                title={tl.title}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                ChangeTOD={ChangeTOD}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid></>
}
